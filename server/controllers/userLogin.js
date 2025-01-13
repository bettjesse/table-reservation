import UserModel from "../models/User.model.js";
import dotenv from 'dotenv';
import otpGenerator from 'otp-generator';
import bcrypt from "bcrypt"
import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";
import { getGoogleOAuthTokens,getGoogleUser,findAndUpdateUser } from "../services/userServices.js";
import { createSession } from "../services/sessionServices.js";

dotenv.config();






// http://localhost:8080/api/register



export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Allow cross-origin cookies in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      createdAt:user.createdAt
      

    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Logout 

  // http://localhost:8080/api/login




  
   export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await UserModel.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
  
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Dynamically set based on environment
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-origin support in production, lax in development
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
  
    
    

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role:user.role,
        createdAt: user.createdAt,
        msg: "logged in succesfully"
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
  
  // http://localhost:8080/api/user

  export const getUser= asyncHandler(async(req,res)=> {

    const user = {
      _id: req.user._id,
    email: req.user.email,
      name: req.user.name,
      createdAt: req.user.createdAt,
      role:req.user.role
    }
res.status(200).json({user})
  })
  
  export const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };
 export const updateUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  
  // @desc    Get all users
// @route   GET /api/users
// @access  Admin (or any specific access control if required)

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await UserModel.find({}).select('-password'); // Exclude passwords for security

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  // http://localhost:8080/api/generate-otp
 

  export const generateOTP = async (req, res) => {
    try {
      // Generate a six-character OTP
      req.app.locals.OTP =  await otpGenerator.generate(6,{ lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
  
      return res.json({code:  req.app.locals.OTP});
    } catch (error) {
      console.error('Error generating OTP:', error);
      return res.status(500).json({ error: 'Failed to generate OTP' });
    }
  };
  
  // http://localhost:8080/api/verify-otp
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}
  
  // http://localhost:8080/api/create-reset-session

  export const createResetSession = async (req,res)=>{
    if(req.app.locals.resetSession){
         return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Session expired!"})
 }
 export async function resetPassword(req, res) {
  try {
      if (!req.app.locals.resetSession) {
          return res.status(440).send({ error: "Session expired!" });
      }

      const { identifier, password } = req.body;

      try {
          UserModel.findOne({ $or: [{ mobile: identifier }, { email: identifier }] })
              .then(user => {
                  if (!user) {
                      return res.status(404).send({ error: "Identifier not found" });
                  }

                  bcrypt.hash(password, 10)
                      .then(hashedPassword => {
                          UserModel.updateOne({ _id: user._id },
                              { password: hashedPassword }
                          )
                              .then(() => {
                                  req.app.locals.resetSession = false; // reset session
                                  return res.status(201).send({ msg: "Record Updated...!" });
                              })
                              .catch(e => {
                                  return res.status(500).send({ error: "Unable to update password" });
                              });
                      })
                      .catch(e => {
                          return res.status(500).send({ error: "Unable to hash password" });
                      });
              })
              .catch(error => {
                  return res.status(500).send({ error });
              });
      } catch (error) {
          return res.status(500).send({ error });
      }
  } catch (error) {
      return res.status(401).send({ error });
  }
}


// const accessTokenCookieOptions: CookieOptions = {
//   maxAge: 900000, // 15 mins
//   httpOnly: true,
//   domain: "localhost",
//   path: "/",
//   sameSite: "lax",
//   secure: false,
// };

// const refreshTokenCookieOptions: CookieOptions = {
//   ...accessTokenCookieOptions,
//   maxAge: 3.154e10, // 1 year
// };


export async function googleOauthHandler(req, res) {
  const code = req.query.code;

  try {
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    console.log({ id_token, access_token });

    const googleUser = await getGoogleUser({ id_token, access_token });
    console.log({ googleUser });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
      },
      {
        upsert: true,
        new: true,
      }
    );

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
console.log("token",token )
    // Set JWT token as a cookie
    // res.cookie("jwt", token, {
    //   maxAge: 900000, // 15 minutes
    //   httpOnly: true,
    //   domain: "localhost",
    //   path: "/",
    //   sameSite: "lax",
    //   secure: false,
    // });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  

  

res.redirect(process.env.ORIGIN);

  } catch (error) {
    console.log(error, "Failed to authorize Google user");
    return res.redirect(`${process.env.ORIGIN}/oauth/error`);
  }
}


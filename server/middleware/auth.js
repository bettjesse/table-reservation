import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import dotenv from "dotenv"
dotenv.config()

export const verifyUser = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // If the token has expired, you can send a user-friendly response.
        res.status(401).json({ error: 'Your session has expired. Please log in again.' });
      } else {
        // For other JWT verification errors, you can return a generic error message.
        console.error(error);
        res.status(401).json({ error: 'Not authorized, token failed' });
      }
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
});


// export const verifyAdmin = asyncHandler(async (req, res, next) => {
//   const userId = req.user._id;

//   try {
//     const user = await UserModel.findById(userId);

//     if (!user) {
//       return res.status(401).send({ error: 'Unauthorized: User not found' });
//     }

//     if (user.role !== 'admin') {
//       return res.status(403).send({ error: 'Forbidden: Access denied' });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ error: 'Internal server error' });
//   }
// });

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authorized, no user found' });
  }

  const userId = req.user._id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

   
  export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}
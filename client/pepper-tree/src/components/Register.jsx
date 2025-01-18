import { useState, useEffect } from 'react';
import { useRegisterMutation } from '../slices/userApiSlice';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import {  FaEye, FaEyeSlash } from 'react-icons/fa';
import loginWithGoogle from '../../utils/getGoogleUrl';
import { useDispatch , useSelector} from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';

const Register = () => {
  const [name, setName] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    value: '',
    isTouched: false,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const user = useSelector((state)=> state.auth.userInfo)

   const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    if (user && !isError && !error) {
      navigate('/');
    }
  }, [user, navigate, isError,error]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordValue = password.value.toString();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

    if (password.value !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    if (!passwordRegex.test(password.value)) {
      setPasswordError(true);
      return;
    }
  

    try {
      const res = await register({ name, email, password:passwordValue }).unwrap();
      
    dispatch(setCredentials({...res }));
    toast.success('Login successful!');

    navigate('/');
      console.log(res);

      setName('');
     
      setEmail('');
      setPassword({ value: '', isTouched: false });
      setConfirmPassword('');
      setPasswordMatchError(false);
      setPasswordError(false);

      // Additional actions after successful registration
    } catch (error) {

      toast.error(error.data.message || error.error);
      // Check if the error is due to email already existing
      
    }
  };



  const PasswordErrorMessage = () => {
    return (
      <p className="text-red-500 text-sm mb-2">
        Password should have at least 8 characters and contain at least one special character, one number, and one letter.
      </p>
    );
  };

  const PasswordMatchErrorMessage = () => {
    return (
      <p className="text-red-500 text-sm mb-2">
        Passwords do not match
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-red-900">Table Mate</h1>
        <p className="text-center text-gray-900 py-4">
        Have an account?{' '}
        <Link to="/login" className="text-blue-500">
          <span className='text-tale-300'>Log in now</span>
        </Link>
      </p>
   

        <div className="flex items-center justify-center mb-4">
  <hr className="w-1/4 border-gray-300 my-0" />
  <p className="text-center text-sm mx-2">or </p>
  <hr className="w-1/4 border-gray-300 my-0" />
</div>

        <form onSubmit={handleRegister} className="flex flex-col items-center p-6 bg-white rounded-lg">
  <div className="w-full max-w-sm">
    <div className="mb-4">
      <label htmlFor="name" className="text-sm font-semibold text-gray-900">
        Name <sup className="text-red-500">*</sup>
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="First name"
        className=" rounded px-3 py-2 w-full text-gray-900"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="text-sm font-semibold text-gray-900">
        Email address <sup className="text-red-500">*</sup>
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="border  rounded px-3 py-2 w-full text-gray-900"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="text-sm font-semibold text-gray-900">
        Password <sup className="text-red-500">*</sup>
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password.value}
          onChange={(e) =>
            setPassword({ ...password, value: e.target.value })
          }
          onBlur={() => setPassword({ ...password, isTouched: true })}
          placeholder="Password"
          className="border  rounded px-3 py-2 w-full pr-10 text-gray-900"
          
        />
        <div
          className="absolute right-0 top-0 mt-2 mr-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash className="text-blue-200" /> : <FaEye className="text-blue-200" />}
        </div>
      </div>
      {password.isTouched && password.value.length < 8 && (
        <PasswordErrorMessage />
      )}
      {passwordError && <PasswordErrorMessage />}
    </div>

    <div className="mb-4">
      <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-900">
        Confirm Password <sup className="text-red-500">*</sup>
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordMatchError(false);
          }}
          placeholder="Confirm Password"
          className={`border ${
            passwordMatchError ? 'border-red-900' : ''
          } rounded px-3 py-2 w-full pr-10 gray-900`}
        />
        <div
          className="absolute right-0 top-0 mt-2 mr-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash className="text-blue-200" /> : <FaEye className="text-blue-200" />}
        </div>
      </div>
      {passwordMatchError && <PasswordMatchErrorMessage />}
    </div>

    <button
  type="submit"
  disabled={isLoading}
  className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
>
  {isLoading ? "Signing up..." : "Sign up"}
</button>
    
  </div>
</form>
<hr className="my-6 w-full border-gray-200" />

      </div>
    </div>
  );
};

export default Register;

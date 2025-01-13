import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useGetUserProfileQuery } from '../slices/userApiSlice';
import { FcGoogle } from 'react-icons/fc';
import loginWithGoogle from '../../utils/getGoogleUrl';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading: isUserLoading } = useGetUserProfileQuery();

  let user = null;
  if (data && data.user) {
    user = data.user;
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...result }));
      toast.success('Login successful!');
      navigate('/');

      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  function handleGoogleLogin() {
    loginWithGoogle().then((user) => {
      dispatch(setCredentials(user));
      localStorage.setItem('userInfo', JSON.stringify(user)); // Set the user info in local storage
      navigate('/');
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-red-900">Table mate</h1>
      <div className="w-full md:w-1/2">
      <p className="text-center text-gray-900 py-4">
      Don't have an account?{' '}
        <Link to="/register" className="text-blue-500">
          <span className='text-tale-300'>Sign up</span>
        </Link>
      </p>
      {/* <div className="flex items-center justify-center mb-4">
  <button
    className="flex items-center text-gray-900 font-bold py-2 px-4 rounded space-x-2 sm:text-lg sm:py-3 sm:px-6"
    onClick={handleGoogleLogin}
  >
    <FcGoogle className="mr-6 bg bg-white text-xl" />
    <span className="ml-2 px-4">Google</span>
  </button>
</div> */}
        <div className="flex items-center justify-center my-4">
          <hr className="border-gray-300 border-1 w-2/5" />
          <p className="mx-4 text-sm">or </p>
          <hr className="border-gray-300 border-1 w-2/5" />
        </div>
        <div className="p-8 mt-4">
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className=" border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-200 focus:ring-3 focus:ring-blue-300"
                
                />
              </div>
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 ">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

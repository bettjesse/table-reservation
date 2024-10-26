import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserProfileQuery } from '../slices/userApiSlice';
import { FiUser, FiLogOut, FiSettings, FiHome } from 'react-icons/fi';
import { useLogoutMutation } from '../slices/userApiSlice';
import { clearCredentials } from '../slices/authSlice';
import { FiMenu } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import "../index.css"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      localStorage.removeItem('userInfo');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* <span className="text-xl font-bold text-white logo">Logo</span> */}
<Link to = "/">

            <span className="hidden lg:inline-block text-lg ml-2 text-white company-name">Table Mate</span>
</Link>
          </div>
          <div className="-mr-2 flex items-center lg:hidden">
       



          <span
  onClick={handleToggle}
  className="inline-flex items-center justify-center p-2  text-white hover:text-white transition duration-150 ease-in-out"
  aria-expanded={isOpen ? 'true' : 'false'}
>
  <FaUserCircle className="block h-6 w-6  ml-4" />
</span>


          </div>
          <div className="hidden lg:flex lg:items-center">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
            </div>
            {userInfo ? (
              <div className="ml-4 relative flex-shrink-0 z-50">
                <div
                  className="flex text-white items-center hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium focus:outline-none border-none"
                  onClick={handleToggle}
                  aria-expanded={isOpen ? 'true' : 'false'}
                >
                  <FiUser className="" />
                  <span className="ml-1">{userInfo.name}</span>
                  <svg
                    className="ml-1 h-5 w-5 transform -rotate-90 transition duration-150 ease-in-out"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {isOpen && (
  <div className="absolute right-0 mt-2 py-2 px-4 w-64 bg-white rounded-md shadow-lg z-50 user-dropdown">
    <div className="mb-4">
      <p className="text-sm text-gray-600">Welcome, {userInfo.name}!</p>
    </div>
    <Link to="/account" className="block py-6 text-sm text-gray-700">
      <p className="text">My Account</p>
    </Link>
    <hr></hr>
    {userInfo.role === 'admin' && (
      // Render the dashboard link only if the user role is "admin"
      <Link to="/admin/dashboard">
        <div className="w-full text-left block py-4 text-sm text-gray-700 hover:bg-gray-100">
          Dashboard
        </div>
      </Link>
    )}
    <Link to="/user/reservations-dashboard">
      <div className="w-full text-left block py-4 text-sm text-gray-700 hover:bg-gray-100">
        My Reservations
      </div>
    </Link>
    <div
      className="w-full text-left items-center flex py-4 text-sm text-gray-700 hover:bg-gray-100"
      onClick={logoutHandler}
    >
      <FiLogOut className="mr-2" />
      Sign out
    </div>
  </div>
)}

              </div>
            ) : (
              <div className="ml-4 flex items-center">
  <Link
    to="/login"
    className="flex items-center text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium"
  >
    <FiUser className="mr-1 text-xl" />
    <span>Login</span>
  </Link>
</div>

            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3">
          
            
            {userInfo ? (
              <>
                  <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="w-full max-w-md bg-white rounded-md shadow-lg mt-0">
          <div className="px-4 py-2 border-b flex justify-between items-center">
            <div className="py-10">
              <h3 className="text-lg font-semibold">My Account</h3>
              <p className="text-sm text-gray-600">Welcome, {userInfo.name}</p>
            </div>
            <div
              className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer bg-gray-100"
              onClick={handleToggle}
            >
              <AiOutlineClose/>
            </div>
          </div>
          <Link to = "/user/reservations-dashboard">
          <div className="p-4 mt-6">
            <h4 className="text-md font-semibold mb-2">My Reservations</h4>
            {/* Display reservation information */}
          </div>
          </Link>
          {userInfo.role==="admin" && (
            <Link to = "/dashboard">
  <div className="p-4">
  <h4 className="text-md font-semibold mb-2">Dashboard</h4>
  {/* Display review information */}
</div>
</Link>
          )
          
          }
          <div className="p-4">
            <h4 className="text-md font-semibold mb-2">My Reviews</h4>
            {/* Display review information */}
          </div>
          <div className="p-4">
            <h4 className="text-md font-semibold mb-2">Loyalty Space</h4>
            {/* Display loyalty information */}
          </div>
          <div 
          
          className="border-t px-4 py-2 flex  items-center"
          onClick={logoutHandler}
          >
            
          
            
            <FiLogOut className=" flex " />
            <h4 className="text-md font-semibold mb-2 text-red-900 ml-4 flex ">Sign out</h4>
          </div>
        </div>
      </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

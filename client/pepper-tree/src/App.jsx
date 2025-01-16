import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import CreateReservation from './components/CreateReservation';
import ConfirmReservation from './components/ConfirmReservation';
import { useEffect } from 'react';
import { setCredentials } from './slices/authSlice';

import { useSelector, useDispatch } from 'react-redux';
import { useGetUserProfileQuery } from './slices/userApiSlice';
import MyReservations from './components/reservations/MyReservations';

import Success from './components/Succes';
import FeedBack from './components/FeedBack';




const App = () => {
 
  const { data, isLoading: isUserLoading } = useGetUserProfileQuery();

  let user = null;
  if (data && data.user) {
    user = data.user;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // Do something with the loaded user data
      console.log('googleUser:', user);
      // Dispatch the setCredentials action to update the user information
      dispatch(setCredentials(user));
    }
  }, [user, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reservation" element={<CreateReservation />} />
            <Route path="/confirm" element={<ConfirmReservation />} />
            <Route path="/user/reservations-dashboard" element={<MyReservations />} />
            <Route path="/feedback" element={<FeedBack />} />
            <Route path="/success" element={<Success />} />
            <Route path="/dashboard" element={<Success />} />
            
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;

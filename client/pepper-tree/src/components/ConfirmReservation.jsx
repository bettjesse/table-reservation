
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useCreateReservationMutation } from '../slices/reservationApiSlice';
import "../index.css"
import { setReservationData,clearReservationData } from '../slices/reservationSlice';





const ConfirmReservation = ({onClose }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromotionalOffersEnabled, setIsPromotionalOffersEnabled] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [buttonText, setButtonText] =useState("CONFIRM YOUR BOOKING")


    const {userInfo} = useSelector((state)=> state.auth)
    const {reservationData} = useSelector((state)=> state.reservation)
    
    // const reservationData = JSON.parse(localStorage.getItem("reservationData"));
    const {date, time, numberOfGuests} = reservationData
    // console.log( reservationData)

 const dispatch= useDispatch()
 const navigate= useNavigate()



      // useEffect(()=> {
      //   if(reservationData) {
      //     dispatch(setReservationData(reservationData))
      //   }
    
      // }, [dispatch, reservationData])

        const [createReservation, { isLoading:isReservationLoading, isError, isSuccess }] = useCreateReservationMutation();
       

     const formatDate = (date) => {
          const options = { weekday: 'short', month: 'long', day: 'numeric' };
          return new Date(date).toLocaleDateString(undefined, options);
        };
      
        const formatTime = (time) => {
          const options = { hour: 'numeric', minute: 'numeric' };
          return new Date(time).toLocaleTimeString(undefined, options).replace(/(:\d{2})\s/, ' ').toLowerCase();
        };



  // Sample reservation details variables
 

  const handleTogglePromotionalOffers = () => {
    setIsPromotionalOffersEnabled(!isPromotionalOffersEnabled);
  };

  const handleSpecialRequestChange = (event) => {
    setSpecialRequests(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };







  

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const reservation = {
        date,
        time,
       numberOfGuests,
        phoneNumber,
        specialRequests,
      };
  
       try {
       const result = await createReservation(reservation);
        console.log(result.data);
  //       // Handle the success response
  
  //       // Empty the fields
        setPhoneNumber('');
        setSpecialRequests('');
       dispatch(clearReservationData())
        // Navigate to the success page
        navigate('/success'); // Replace '/success' with your desired success page URL
      } catch (error) {
         // Handle the error
      }

     };
   
  const handleNavigate = ()=> {
    navigate("/reservation")
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center">
       <div
      className="fixed inset-0 mt-14"
      style={{
        backgroundImage: 'url(/images/dish2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
      }}
    ></div>
    
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 mx-auto rounded-lg sm:w-3/4 md:w-1/2 lg:w-1/3 relative ">
          {/* Close Button */}
          <div
            className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            onClick={handleNavigate}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
  
          {/* Reservation Details */}
          <div
            className="bg-cover h-40 relative"
            style={{
              backgroundImage: 'url(/images/dish2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '10px 10px 0 0',
              position: 'relative',
            }}
          >
           
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px 10px 0 0' }} // Add dark overlay
            />
          
            <div className="absolute inset-0 flex items-center justify-center">
              {reservationData && (
                <span className="text-blue-900 text-sm bg-white rounded-lg p-2 border border-white">
                {numberOfGuests} people. {formatTime(time)}. {formatDate(date)}
              </span>
              )
              }
              
            </div>
          </div>
  
          {/* User Information */}
          <div className="mb-4 bg-gray-100">
            <div className="text-sm my-2 text-center p-4">Verify your information to finalize your booking</div>
            {
              userInfo && (
                <div className="flex flex-col space-y-2 px-6">
              <span className="">{userInfo.email}</span>
              
              <span className="">{userInfo.name}</span>
            </div>
              )
            }
            
          </div>
  
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="my-2">
              <div className="mb-4">
                <label htmlFor="specialRequest" className="block font-bold mb-2">
                  Special Requests (optional)
                </label>
                <input
  id="specialRequest"
  type="text"
  className="border border-gray-300 px-3 py-2 rounded-md w-full smaller-placeholder"
  placeholder="Special request Eg a table near the window"
  value={specialRequests}
  onChange={handleSpecialRequestChange}
/>

              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block font-bold mb-2">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
            </div>
  
            {/* Button */}
            <div className="flex justify-center mt-4">
            <button
  type="submit"
  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded  "
  disabled={isReservationLoading}
>
  { isReservationLoading ? "Loading" : "CONFIRM YOUR BOOKING" 
  }
</button>

            </div>
            <p className="text-center my-2 text-xs">Availability confirmed immediately</p>
          </form>
  
          {/* Terms and Conditions */}
          <div className="text-center text-sm mt-4">By clicking the button, you agree to our terms and conditions.</div>
        </div>
      </div>
    
  
    {/* Button to open the modal */}
    
  </div>
  
  );
};

export default ConfirmReservation;


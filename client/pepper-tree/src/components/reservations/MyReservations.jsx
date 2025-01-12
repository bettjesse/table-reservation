

import React, { useState } from 'react';
import { useGetMyReservationsQuery, useCancelReservationMutation } from '../../slices/reservationApiSlice';
import { useSelector } from 'react-redux';
import  {Link} from "react-router-dom";
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { RiEdit2Line } from 'react-icons/ri';
import EditReservationModal from '../modal/EditReservationModal';
import CancelConfirmationModal from '../modal/CancelConfirmationModal';
const MyReservations = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading,refetch } = useGetMyReservationsQuery();
  const [cancelReservation] = useCancelReservationMutation();
  const reservations = data?.reservations;
  const [activeTab, setActiveTab] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Cancel modal visibility

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleEditClick = (reservation) => {
    setSelectedReservation(reservation); // Pass reservation to modal
    setIsModalOpen(true); // Open modal
  };
  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation); // Pass reservation to cancel modal
    setIsCancelModalOpen(true); // Open cancel modal
  };
  const handleCancelReservation = async () => {
    try {
      await cancelReservation(selectedReservation._id).unwrap(); // Call API
      refetch(); // Refetch reservations
      setIsCancelModalOpen(false); // Close modal on success
    } catch (err) {
      console.error('Failed to cancel reservation:', err);
    }
  };
  const handleCloseModal = () => setIsModalOpen(false); // Close modal

  const upcomingReservations = reservations?.filter(
    (reservation) => reservation.status === 'confirmed'
  );
  const pastReservations = reservations?.filter(
    (reservation) => reservation.status === 'cancelled'
  );

  const memberSince = new Date(userInfo.createdAt);
  const memberSinceString = memberSince.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  
  
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

 
  function formatTime(time) {
    let date;
    
    // If time is in the "HH:MM" format, we need to treat it as a time-only string.
    if (typeof time === "string" && time.length <= 5) {
      // Manually add a dummy date so it can be parsed as a Date object
      date = new Date(`1970-01-01T${time}:00Z`);
    } else {
      // If the time is in ISO format (e.g., "2025-01-11T11:00:00.663Z"), we can directly use it.
      date = new Date(time);
    }
  
    // Convert time to local time
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString([], options).replace(/^0(\d+)/, "$1");
  }
  
  
  

  let displayedReservations = [];
  if (activeTab === 'all') displayedReservations = reservations;
  else if (activeTab === 'upcoming') displayedReservations = upcomingReservations;
  else if (activeTab === 'past') displayedReservations = pastReservations;

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  if (!reservations || reservations.length === 0) {
    return (
      <div className="text-center text-xl font-semibold">
        No reservations found.{' '}
        <Link to="/" className="text-blue-500 underline cursor-pointer">
      
        <span className="text-blue-500 underline cursor-pointer">Make a reservation now</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white py-6 border-b border-gray-300">
        <div className="flex items-center ml-6 pl-6">
          <div className="relative rounded-full bg-blue-500 text-white h-24 w-24 flex items-center justify-center">
            <span className="text-3xl font-semibold">{userInfo.name.charAt(0)}</span>
          </div>
          <div className="ml-4 text-black">
            <h2 className="text-2xl font-bold">{`Hi, ${userInfo.name}`}</h2>
            <p className="text-gray-600">Member since {memberSinceString}</p>
          </div>
        </div>
      </section>

      <section className="py-4 bg-gray-100">
        <div className="flex justify-center space-x-4">
          {['all', 'upcoming', 'past'].map((tab) => (
            <span
              key={tab}
              className={`${
                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
              } px-4 py-2 rounded-lg cursor-pointer`}
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} (
              {tab === 'all'
                ? reservations.length
                : tab === 'upcoming'
                ? upcomingReservations.length
                : pastReservations.length}
              )
            </span>
          ))}
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 bg-gray-50">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {displayedReservations.map((reservation) => (
      <div
        key={reservation.id}
        className="bg-white rounded-lg shadow-md overflow-hidden h-40 flex flex-col justify-between"
      >
        <div className="flex">
          <img
            src="../images/dish2.jpg"
            alt="Dish"
            className="w-1/3 h-full object-cover"
          />
          <div className="p-4 w-2/3 flex flex-col justify-between">
            <p className="text-sm text-gray-600">
              {formatDate(reservation.date)}, {formatTime(reservation.time)}
            </p>
            <div
              className={`mt-2 px-2 py-1 rounded-full text-center text-sm ${
                reservation.status === 'confirmed'
                  ? 'bg-green-300 text-green-800'
                  : 'bg-red-300 text-red-800'
              }`}
            >
              {reservation.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
            </div>
          </div>
        </div>
        {activeTab === 'upcoming' && (
          <div className="p-4 flex justify-between bg-gray-100">
            <div
              className="flex items-center space-x-2 text-gray-800 cursor-pointer hover:text-blue-600"
              onClick={() => handleEditClick(reservation)}
            >
              <FaPencilAlt />
              <span>Modify</span>
            </div>
            <div
              onClick={() => handleCancelClick(reservation)}
              className="flex items-center space-x-2 text-gray-800 cursor-pointer hover:text-red-600"
            >
              <FaTimes />
              <span>Cancel</span>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
</section>


      {isModalOpen && (
        <EditReservationModal
          reservation={selectedReservation}
          onClose={handleCloseModal}
          refetch={refetch}
        />
      )}
      <CancelConfirmationModal
        isOpen={isCancelModalOpen}
        onConfirm={handleCancelReservation}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </div>
  );
};

export default MyReservations;



// import React, { useState } from 'react';
// import { useGetMyReservationsQuery } from '../../slices/reservationApiSlice';
// import { useSelector } from 'react-redux';
// import { FaPencilAlt, FaTimes } from 'react-icons/fa';
// import { RiEdit2Line } from 'react-icons/ri';

// const MyReservations = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const { data, isLoading } = useGetMyReservationsQuery();
//   const reservations = data?.reservations;
//   const [activeTab, setActiveTab] = useState('all');

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const upcomingReservations = reservations?.filter(
//     (reservation) => reservation.status === 'confirmed'
//   );
//   const pastReservations = reservations?.filter(
//     (reservation) => reservation.status === 'cancelled'
//   );
//   const memberSince = new Date(userInfo.createdAt);
//   const memberSinceString = memberSince.toLocaleString('en-US', {
//     month: 'long',
//     year: 'numeric',
//   });

//   // Helper function to format date
//   const formatDate = (date) => {
//     const options = { weekday: 'short', month: 'short', day: 'numeric' };
//     return new Date(date).toLocaleDateString('en-US', options);
//   };

//   // Helper function to format time
//   const formatTime = (time) => {
//     return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   let displayedReservations = [];

//   if (activeTab === 'all') {
//     displayedReservations = reservations;
//   } else if (activeTab === 'upcoming') {
//     displayedReservations = upcomingReservations;
//   } else if (activeTab === 'past') {
//     displayedReservations = pastReservations;
//   }

//   // Show loading state when reservations are being fetched
//   if (isLoading) {
//     return <div className="text-center text-xl">Loading...</div>;
//   }

//   // Show a message when reservations are not available
//   if (!reservations || reservations.length === 0) {
//     return (
//       <div className="text-center text-xl font-semibold">
//         No reservations found.{' '}
//         <span className="text-blue-500 underline cursor-pointer">Make a reservation now</span>
//       </div>
//     );
//   }

//   const restaurantName = 'Pepper Tree';

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* User Info Section */}
//       <section className="bg-white py-6 border-b border-gray-300">
//         <div className="flex items-center ml-6 pl-6">
//           <div className="relative rounded-full bg-blue-500 text-white h-24 w-24 flex items-center justify-center">
//             <span className="text-3xl font-semibold">{userInfo.name.charAt(0)}</span>
//           </div>
//           <div className="ml-4 text-black">
//             <h2 className="text-2xl font-bold">{`Hi, ${userInfo.name}`}</h2>
//             <p className="text-gray-600">Member since {memberSinceString}</p>
//             <div className="flex items-center space-x-2 mt-2 text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-300">
//               <RiEdit2Line className="text-xl" />
//               <span className="text-sm">Update My Account</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Tabs for Viewing Reservations */}
//       <section className="py-4 bg-gray-100">
//         <div className="flex justify-center space-x-4">
//           {['all', 'upcoming', 'past'].map((tab) => (
//             <span
//               key={tab}
//               className={`${
//                 activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
//               } px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300`}
//               onClick={() => handleTabChange(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tab === 'all' ? reservations.length : tab === 'upcoming' ? upcomingReservations.length : pastReservations.length})
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* Reservations Display */}
//       <section className="py-6 px-4 sm:px-6 bg-gray-50">
//         {activeTab === 'all' && <h3 className="text-lg font-semibold text-center mb-6">All Reservations</h3>}
//         {activeTab === 'upcoming' && <h3 className="text-lg font-semibold text-center mb-6">Upcoming Reservations</h3>}
//         {activeTab === 'past' && <h3 className="text-lg font-semibold text-center mb-6">Past Reservations</h3>}

       
//   <div className="flex flex-col items-center justify-center space-y-4">
//           {displayedReservations.map((reservation) => (
//             <div key={reservation.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//               <div className="flex">
//                 {/* Image */}
//                 <img src="../images/dish2.jpg" alt="Dish" className="w-1/3 h-32 object-cover" />
//                 <div className="p-4 w-2/3 flex flex-col justify-between">
//                   {/* <h1 className="text-md font-semibold">{restaurantName}</h1> */}
//                   <p className="text-sm text-gray-600">{formatDate(reservation.date)}, {formatTime(reservation.time)}</p>

//                   {/* Reservation Status */}
//                   <div className={`mt-2 px-2 py-1 rounded-full ${reservation.status === 'confirmed' ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'}`}>
//                     <p clasName = "text-sm text-white"> {reservation.status === 'confirmed' ? 'Confirmed' : 'Cancelled'} </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons for Upcoming Reservations */}
//               {activeTab === 'upcoming' && (
//                 <div className="p-4 flex justify-between bg-gray-100">
//                   <div className="flex items-center space-x-2 text-gray-800 cursor-pointer hover:text-blue-600">
//                     <FaPencilAlt />
//                     <span>Modify</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-gray-800 cursor-pointer hover:text-red-600">
//                     <FaTimes />
//                     <span>Cancel</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MyReservations;

import React, { useState } from 'react';
import { useGetMyReservationsQuery } from '../../slices/reservationApiSlice';
import { useSelector } from 'react-redux';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { RiEdit2Line } from 'react-icons/ri';
import EditReservationModal from '../modal/EditReservationModal';
const MyReservations = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetMyReservationsQuery();
  const reservations = data?.reservations;
  const [activeTab, setActiveTab] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleEditClick = (reservation) => {
    setSelectedReservation(reservation); // Pass reservation to modal
    setIsModalOpen(true); // Open modal
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
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let displayedReservations = [];
  if (activeTab === 'all') displayedReservations = reservations;
  else if (activeTab === 'upcoming') displayedReservations = upcomingReservations;
  else if (activeTab === 'past') displayedReservations = pastReservations;

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  if (!reservations || reservations.length === 0) {
    return (
      <div className="text-center text-xl font-semibold">
        No reservations found.{' '}
        <span className="text-blue-500 underline cursor-pointer">Make a reservation now</span>
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
        <div className="flex flex-col items-center justify-center space-y-4">
          {displayedReservations.map((reservation) => (
            <div key={reservation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex">
                <img src="../images/dish2.jpg" alt="Dish" className="w-1/3 h-32 object-cover" />
                <div className="p-4 w-2/3 flex flex-col justify-between">
                  <p className="text-sm text-gray-600">
                    {formatDate(reservation.date)}, {formatTime(reservation.time)}
                  </p>
                  <div
                    className={`mt-2 px-2 py-1 rounded-full ${
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
                  <div className="flex items-center space-x-2 text-gray-800 cursor-pointer hover:text-red-600">
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
        />
      )}
    </div>
  );
};

export default MyReservations;

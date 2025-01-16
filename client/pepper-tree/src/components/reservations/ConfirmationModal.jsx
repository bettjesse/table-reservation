// import { useDispatch, useSelector } from 'react-redux';
// import { setReservationData } from '../../slices/reservationSlice';
// import { useState } from 'react';
// import { useCreateReservationMutation } from '../../slices/reservationApiSlice';
// import dayjs from 'dayjs';


// const ConfirmationModal = ({ isOpen, onClose }) => {
//     const dispatch = useDispatch();
//     const reservationData = useSelector((state) => state.reservation.reservationData);
  
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [specialRequest, setSpecialRequest] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
  
//     const [createReservation] = useCreateReservationMutation();
  
//     const handleSubmit = async () => {
//       if (!phoneNumber) {
//         alert("Phone number is required.");
//         return;
//       }
  
//       const formattedDate = dayjs(reservationData.date).format('YYYY-MM-DD');
//       const formattedTime = dayjs(reservationData.time).format('HH:mm');
  
//       const payload = {
//         date: formattedDate,
//         time: formattedTime,
//         partySize: reservationData.partySize,
//         tableId: reservationData.tableId,
//         phone: phoneNumber,
//         specialRequests: specialRequest,
//       };
  
//       try {
//         setIsSubmitting(true);
  
//         // API call with the correctly formatted payload
//         await createReservation(payload).unwrap();
  
//         alert("Reservation confirmed!");
//         onClose();
//       } catch (error) {
//         console.error("Failed to create reservation:", error);
//         alert("Failed to confirm reservation. Please try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     };
  
//     if (!isOpen) return null;
  
//     const formattedDateDisplay = dayjs(reservationData.date).format('MMMM D, YYYY');
//     const formattedTimeDisplay = dayjs(reservationData.time).format('h:mm A');
  
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white p-6 rounded shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3">
//           <h2 className="text-xl font-bold mb-4">Reservation Confirmation</h2>
//           <div className="mb-4">
//             <p><strong>Date:</strong> {formattedDateDisplay}</p>
//             <p><strong>Time:</strong> {formattedTimeDisplay}</p>
//             <p><strong>Party Size:</strong> {reservationData.partySize}</p>
//             <p><strong>Table Number:</strong> {reservationData.tableId}</p>
//           </div>
  
//           <div className="mb-4">
//             <label htmlFor="phoneNumber" className="block text-sm">Phone Number</label>
//             <input
//               id="phoneNumber"
//               type="text"
//               className="w-full p-2 border rounded"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//           </div>
  
//           <div className="mb-4">
//             <label htmlFor="specialRequest" className="block text-sm">Special Request</label>
//             <textarea
//               id="specialRequest"
//               className="w-full p-2 border rounded"
//               value={specialRequest}
//               onChange={(e) => setSpecialRequest(e.target.value)}
//             />
//           </div>
  
//           <div className="flex justify-between">
//             <button
//               onClick={onClose}
//               className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className={`bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 ${
//                 isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default ConfirmationModal;
  

import { useDispatch, useSelector } from 'react-redux';
import { setReservationData } from '../../slices/reservationSlice';
import { useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useCreateReservationMutation } from '../../slices/reservationApiSlice';

const ConfirmationModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const reservationData = useSelector((state) => state.reservation.reservationData);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [createReservation, { isLoading }] = useCreateReservationMutation();

  const handleSubmit = async () => {
         const formattedDate = dayjs(reservationData.date).format('YYYY-MM-DD');
   const formattedTime = dayjs(reservationData.time).format('HH:mm');
  
    const dataToSend = {
      date: formattedDate,
      time: formattedTime,
      partySize: reservationData.partySize,
      phone: phoneNumber,
      specialRequests: specialRequest,
      tableId: reservationData.tableId,
    };

    console.log('Data being sent:', dataToSend); // Log the data for debugging

    try {
      await createReservation(dataToSend).unwrap();
      toast.success('Reservation confirmed successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to confirm the reservation. Please try again.');
      console.error('Error:', error); // Log the error for debugging
    }
  };

  if (!isOpen) return null;

  // Format date and time using dayjs
  const formattedDate = dayjs(reservationData.date).format('MMMM D, YYYY'); // e.g., January 1, 2025
  const formattedTime = dayjs(reservationData.time).format('h:mm A'); // e.g., 12:30 PM

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      style={{ zIndex: '100' }}
    >
      <div className="bg-white p-6 rounded shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3">
        <h2 className="text-xl font-bold mb-4">Reservation Confirmation</h2>
        <div className="mb-4">
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Time:</strong> {formattedTime}</p>
          <p><strong>Party Size:</strong> {reservationData.partySize}</p>
          <p><strong>Table Number:</strong> {reservationData.tableId}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm">Phone Number</label>
          <input
            id="phoneNumber"
            type="text"
            className="w-full p-2 border rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="specialRequest" className="block text-sm">Special Request</label>
          <textarea
            id="specialRequest"
            className="w-full p-2 border rounded"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`py-2 px-4 rounded-lg text-white ${
              isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Confirming...' : 'Confirm Reservation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

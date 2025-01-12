
  
import { useState } from "react";
import { useUpdateReservationMutation } from "../../slices/reservationApiSlice";

const EditReservationModal = ({ reservation, onClose,refetch }) => {
  // Helper functions to format date and time
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Add 1 since months are 0-indexed
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
 
  const formatTime = (time) => {
    const parsedTime = new Date(time); // Assuming time is already in local time
    const hours = String(parsedTime.getHours()).padStart(2, '0');
    const minutes = String(parsedTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  
  
  
  // Local state to track updated values
  const [date, setDate] = useState(formatDate(reservation.date));
  const [time, setTime] = useState(formatTime(reservation.time));
  const [numberOfGuests, setNumberOfGuests] = useState(reservation.numberOfGuests || 1);
  const [error, setError] = useState("");

  const [updateReservation, { isLoading }] = useUpdateReservationMutation();

  const handleSave = async () => {
    if (!date || !time || !numberOfGuests) {
      setError("All fields are required.");
      return;
    }
  
    try {
      // Convert the selected local time to UTC
      const [hour, minute] = time.split(':');
      const updatedTime = new Date(date); // Use the selected date
      updatedTime.setHours(hour);
      updatedTime.setMinutes(minute);
      updatedTime.setSeconds(0);
  
      // Store the time in UTC
      const updatedReservation = {
        reservationId: reservation._id,
        date,
        time: updatedTime.toISOString(), // Store as ISO string in UTC
        numberOfGuests,
      };
  
      await updateReservation(updatedReservation).unwrap();
      refetch(); // Refetch reservations
      onClose();
    } catch (error) {
      console.error("Failed to update reservation:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Reservation</h2>
        <form>
          <label className="block mb-2 text-sm font-semibold">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="block mb-2 text-sm font-semibold mt-4">Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="block mb-2 text-sm font-semibold mt-4">Number of Guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReservationModal;

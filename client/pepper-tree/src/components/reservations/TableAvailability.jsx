

import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaClock, FaUserFriends } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

import { setReservationData, clearReservationData } from "../../slices/reservationSlice";
import { useCheckTableAvailabilityMutation } from "../../slices/reservationApiSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";
import { useState,useEffect } from "react";
import dayjs from "dayjs";
import { setAvailableTables } from "../../slices/tableSlice";

import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";

const TableAvailability = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [partySize, setPartySize] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { reservationData } = useSelector((state) => state.reservation);
const navigate= useNavigate()
  const user = useSelector((state) => state.auth.userInfo); // Assuming you have a user in your auth state

  const [checkTableAvailability, { data: availability, isLoading }] = useCheckTableAvailabilityMutation();

  // Redirect to login if no user is present
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));
  const handleTableSelect = () => {
    setIsModalOpen(false);
    setIsConfirmationModalOpen(true);
  };
  const handleSelect = (selection, value) => {
    if (selection === "date") {
      setDate(value);
      dispatch(setReservationData({
        date: value,  // Store the raw Date object
        time: reservationData?.time, // Preserve the current time
        partySize: reservationData?.partySize, // Preserve the current party size
      }));
      setStep(2);
    } else if (selection === "time") {
      if (value instanceof Date && !isNaN(value)) {
        setTime(value); // Store the full Date object
        dispatch(setReservationData({
          date: reservationData?.date, // Preserve the current date
          time: value, // Store raw time as Date object
          partySize: reservationData?.partySize, // Preserve the current party size
        }));
        setStep(3);
      }
    } else if (selection === "partySize") {
      const numericPartySize = parseInt(value, 10) || 1;
      setPartySize(numericPartySize);
      dispatch(setReservationData({
        date: reservationData?.date, // Preserve the current date
        time: reservationData?.time, // Preserve the current time
        partySize: numericPartySize,
      }));
    }
  };
  
  

  const handleConfirm = () => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const formattedTime = dayjs(time).format("HH:mm");
    const formattedPartySize = parseInt(partySize, 10);

    checkTableAvailability({ date: formattedDate, time: formattedTime, partySize: formattedPartySize });
    setIsModalOpen(true); 
    console.log("AVAILABILITY", availability?.availableTables);
    dispatch(setAvailableTables(availability?.availableTables));
    

  };

  return (
    <div className="reservation-form w-full lg:w-1/3 bg-white p-6 rounded shadow-md ">
      <div className="step-icons flex justify-between mb-6">
        <div onClick={() => step > 1 && setStep(1)} className={`step ${step >= 1 ? "font-bold text-red-500" : ""}`}>
          {date ? dayjs(date).format("MMM D") : <FaCalendarAlt size={24} />}
        </div>
        <div onClick={() => step > 2 && setStep(2)} className={`step ${step >= 2 ? "font-bold text-red-500" : ""}`}>
          {time ? dayjs(time).format("h:mm A") : <FaClock size={24} />}
        </div>
        <div onClick={() => step > 3 && setStep(3)} className={`step ${step >= 3 ? "font-bold text-red-500" : ""}`}>
        {`${partySize || <FaUserFriends size={24} />} ${partySize === 1 ? "guest" : "guests"}`}

        </div>
      </div>

      {step === 1 && (
        <div className="">
          <h2 className="text-xl font-bold mb-4">Pick a Date</h2>
          <DatePicker
            selected={date}
            onChange={(date) => handleSelect("date", date)}
            placeholderText="Select a date"
            className="w-full border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Pick a Time</h2>
          <DatePicker
            selected={time}
            onChange={(time) => handleSelect("time", time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            placeholderText="Select a time"
            className="w-full border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500"
          />
        </div>
      )}

{step === 3 && (
  <div className="">
    <h2 className="text-xl font-bold mb-4">Party Size</h2>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-4 gap-2">
      {Array.from({ length: 12 }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handleSelect("partySize", i + 1)}
          className={`flex items-center justify-center h-16 w-16 md:h-16 md:w-16 mx-auto border rounded text-lg font-semibold ${
            partySize === i + 1 ? "bg-red-500 text-white" : "bg-gray-200"
          } hover:bg-red-300 transition-colors`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>
)}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Confirm Your Reservation</h2>
          <p>Date: {dayjs(date).format("MMM D")}</p>
          <p>Time: {dayjs(time).format("h:mm A")}</p>
          <p>Party Size: {partySize}</p>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            {isLoading ? "Checking Availability..." : "Confirm Reservation"}
          </button>
        </div>
      )}

      <div className="flex justify-between mt-4">
        {step > 1 && <button onClick={handleBack} className="bg-gray-300 py-2  mr-2 px-4 rounded">Back</button>}
        {step === 3 && <button onClick={handleNext} className="bg-yellow-500 py-2 px-4 rounded">Book Table</button>}
      </div>
      <Modal
        isOpen={isModalOpen}
        availability={availability}
        onClose={() => setIsModalOpen(false)}
        onTableSelect={handleTableSelect} // Pass table select handler
      />
      <ConfirmationModal isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)} isLoading= {isLoading} />
    </div>
  );
};

export default TableAvailability;



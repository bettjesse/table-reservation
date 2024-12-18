import React, { useState } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';

import FeedBack from './FeedBack';
import { Link } from 'react-router-dom';

const Success = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleOpenFeedback = () => {
    setShowFeedbackModal(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedbackModal(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 mx-auto rounded-lg shadow-lg flex items-center">
        <div className="text-green-500 mr-4">
          <TiTick size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Reservation Successful!</h2>
          <p className="text-lg text-center">
            Thank you for your reservation. You will receive an email shortly to confirm your booking.
          </p>
          <div className="mt-4 space-x-2 flex">
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 text-sm rounded-lg shadow-lg flex items-center gap-2 hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition duration-300 ease-in-out"
              onClick={handleOpenFeedback}
            >
             
              We'd Love to Hear from You
            </button>
            <Link to="/">
              <p className="text-gray-900 px-4 mr-2 md:mr-0 md:text-xl underline py-2">
                Return to Home page
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white relative p-4 rounded-lg shadow-lg">
            <span
              className="absolute top-2 right-2 cursor-pointer text-gray-600"
              onClick={handleCloseFeedback}
            >
              <TiTimes size={40} />
            </span>
            <FeedBack />
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;

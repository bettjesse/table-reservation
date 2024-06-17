import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedBack = () => {
  const [score, setScore] = useState("10");
  const [feedback, setFeedback] = useState("");

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (score < 5 && feedback.length < 10) {
      toast.error("Please provide a comment explaining why the booking experience was unsatisfactory.");
      return;
    }

    // TODO: Handle form submission here

    // Clear form fields after submission
    setScore("10");
    setFeedback("");

    toast.success("Feedback submitted successfully!");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2 text-center">Booking Experience Feedback</h2>
      <p className="mb-4 text-gray-600 text-center">
        Please provide your feedback on the booking experience. Your insights will help us improve our reservation process.
      </p>
      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Score: {score} ☆</label>
        <input
          type="range"
          min="0"
          max="10"
          value={score}
          onChange={handleScoreChange}
          className="w-full"
        />
        <div className="mt-4">
          <label className="block mb-1">Feedback:</label>
          <textarea
            rows="4"
            value={feedback}
            onChange={handleFeedbackChange}
            className="w-full resize-none border-2 border-blue-200 p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedBack;

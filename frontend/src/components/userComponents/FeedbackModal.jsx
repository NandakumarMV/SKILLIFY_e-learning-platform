import React, { useState } from "react";
import { useCourseRevewMutation } from "../../slices/userApiSlice";

const FeedbackModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");
  const handleSubmit = () => {
    onSubmit(feedback);

    onRequestClose();
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "block" : "hidden"
      } bg-black bg-opacity-50 flex items-center justify-center`}
    >
      <div className="bg-white p-5 ">
        <div className="text-xl font-bold mb-3">
          Give your feedback about this Course
        </div>
        <textarea
          className="border-2 border-gray-400 p-2 mb-3 w-full"
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-black text-white p-2 rounded"
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
          <button
            className="ml-3 bg-gray-300 text-black p-2 rounded"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;

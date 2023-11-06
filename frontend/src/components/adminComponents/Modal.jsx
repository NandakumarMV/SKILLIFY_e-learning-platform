import React from "react";

const Modal = ({ user, showModal, onClose }) => {
  return (
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
          <p className="text-gray-700 mb-4">{user.email}</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;

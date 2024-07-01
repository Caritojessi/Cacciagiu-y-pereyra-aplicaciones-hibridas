import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-900 bg-opacity-50">
      <div className="relative bg-white w-full max-w-md mx-auto my-6 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center h-full p-6">
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">{message}</h3>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
              onClick={onDelete}
            >
              Aceptar
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
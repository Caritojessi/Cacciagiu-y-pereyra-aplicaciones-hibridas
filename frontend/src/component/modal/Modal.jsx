import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, message }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, 10000); // 10 segundos (10000 milisegundos)
    }

    return () => clearTimeout(timerRef.current);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAccept = () => {
    clearTimeout(timerRef.current); // Limpiar el temporizador cuando se acepta
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 outline-none focus:outline-none">
      <div className="relative bg-white w-full max-w-md mx-auto my-6 rounded-lg shadow-xl outline-none focus:outline-none">
        <div className="flex flex-col justify-center items-center h-full p-6">
          <h1 className="text-xl font-semibold text-gray-800 text-center mb-4">{message}</h1>
          <div className="flex justify-center mt-4">
            <button
              className="bg-purple-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              onClick={handleAccept}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

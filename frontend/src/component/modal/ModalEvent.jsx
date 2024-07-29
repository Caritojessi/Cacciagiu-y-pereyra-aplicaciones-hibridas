import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const ModalEvent = ({ isOpen, onClose, event, onEdit, onDelete }) => {
    const timerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            timerRef.current = setTimeout(() => {
                onClose();
            }, 10000); // Cerrar automáticamente después de 10 segundos
        }

        return () => clearTimeout(timerRef.current);
    }, [isOpen, onClose]);

    if (!isOpen || !event) return null;

    const handleEdit = () => {
        onEdit(event.id); // Llama a la función onEdit con el ID del evento
        onClose(); // Cierra el modal después de editar
    };

    const handleDelete = () => {
        onDelete(event.id); // Llama a la función onDelete con el ID del evento
        onClose(); // Cierra el modal después de eliminar
    };

    const handleAccept = () => {
        clearTimeout(timerRef.current);
        onClose(); // Cierra el modal al aceptar
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 outline-none focus:outline-none">
            <div className="relative bg-white w-full max-w-md mx-auto my-6 rounded-lg shadow-xl outline-none focus:outline-none">
                <div className="flex flex-col justify-center items-center h-full p-6">
                    <h1 className="text-xl font-semibold text-gray-800 text-center mb-4">{event.title}</h1>
                    <p className="text-gray-700 text-center mb-4">{event.description}</p>
                    <p className="text-gray-700 text-center mb-4">Horario: {event.horario}</p>
                    <div className="flex justify-center mt-4 space-x-4">
                        <button
                            className="bg-purple-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={faPen} /> Editar
                        </button>
                        <button
                            className="bg-red-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                            onClick={handleDelete}
                        >
                            <FontAwesomeIcon icon={faTrash} /> Eliminar
                        </button>
                        <button
                            className="bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
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

export default ModalEvent;

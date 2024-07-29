import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../modal/Modal';
import { updateExpense } from './userServices/updateSpends';

const UpdateSpends = () => {
    const { id } = useParams();

    const [gastos, setGastos] = useState({
        nombre: '',
        valor: '',
        fecha: ''
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const referenciaMapa = {
        'c': 'Comida',
        'r': 'Ropa',
        'h': 'Hotel',
        'v': 'Vuelo',
    };

    const handleNombreChange = (e) => {
        const valor = e.target.value.toLowerCase();
        setGastos({ ...gastos, nombre: valor });

        const newSuggestions = Object.keys(referenciaMapa)
            .filter(key => key.startsWith(valor))
            .map(key => referenciaMapa[key]);

        setSuggestions(newSuggestions);
        setShowSuggestions(true);
    };

    const handleNombreFocus = () => {
        const valor = gastos.nombre.toLowerCase();

        const newSuggestions = Object.keys(referenciaMapa)
            .filter(key => key.startsWith(valor))
            .map(key => referenciaMapa[key]);

        setSuggestions(newSuggestions);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setGastos({ ...gastos, nombre: suggestion });
        setShowSuggestions(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateExpense(id, gastos);

            if (response.status === 201) {
                setGastos({ nombre: '', valor: '', fecha: '' });
                setError(null);
                setModalMessage('¡Gasto agregado correctamente!');
                setModalOpen(true);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Error al agregar el gasto.');
            }
        }
    };

    const closeModal = () => {
        setModalMessage('');
        setModalOpen(false);
    };

    return (
        <div className="max-w-lg mx-auto pt-10">
            <div className="bg-white mb-8 shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4 text-purple-900">Agregar un gasto del viaje</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4 relative">
                        <label htmlFor="nombre" className="block text-md font-semibold text-gray-700 mb-2 text-left">
                            Referencia del gasto:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={gastos.nombre}
                            onChange={handleNombreChange}
                            onFocus={handleNombreFocus}
                            className="w-full px-3 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute bg-white border rounded-md w-full mt-1 z-10">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="valor" className="block text-md font-semibold text-gray-700 mb-2 text-left">
                            Valor del gasto:
                        </label>
                        <input
                            type="number"
                            id="valor"
                            value={gastos.valor}
                            onChange={(e) => setGastos({ ...gastos, valor: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 text-violet-950 font-semibold"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fecha" className="block text-md font-semibold text-gray-700 mb-2 text-left">
                            Fecha del gasto:
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            value={gastos.fecha}
                            onChange={(e) => setGastos({ ...gastos, fecha: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 text-violet-950 font-semibold"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-1/2 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 mr-2"
                        >
                            Agregar gasto
                        </button>
                        <a href={`/viajes/detalle/${id}`} className="w-1/2 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 ml-2 hover:text-whitesmoke">
                            Volver al viaje
                        </a>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                message={modalMessage}
            />
        </div>
    );
};

export default UpdateSpends;

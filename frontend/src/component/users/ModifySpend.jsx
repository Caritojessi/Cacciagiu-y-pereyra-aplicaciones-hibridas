import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import Modal from '../modal/Modal';
import { fetchGasto, handleSubmitGasto } from './userServices/modifySpend';

const ModifySpend = () => {
    const { idViaje, id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [gasto, setGasto] = useState({
        nombre: '',
        valor: ''
    });

    useEffect(() => {
        const getGasto = async () => {
            try {
                const data = await fetchGasto(idViaje, id);
                setGasto(data);
            } catch (error) {
                setError(error.message);
            }
        };

        getGasto();
    }, [idViaje, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await handleSubmitGasto(idViaje, id, gasto);
            if (success) {
                setGasto({ nombre: '', valor: '' });
                setError(null);
                setModalOpen(true);
                navigate(`/viajes/detalle/${idViaje}`);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 mb-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-semibold mb-4 text-purple-900">Modificar el nombre y valor del gasto</h1>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-left text-md font-medium text-gray-700">Nombre del gasto:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={gasto.nombre}
                        onChange={(e) => setGasto({ ...gasto, nombre: e.target.value })}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-violet-300 text-violet-950 font-semibold"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="valor" className="block text-left text-md font-medium text-gray-700">Valor del gasto:</label>
                    <input
                        type="number"
                        id="valor"
                        value={gasto.valor}
                        onChange={(e) => setGasto({ ...gasto, valor: e.target.value })}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-violet-300 text-violet-950 font-semibold"
                        required
                    />
                </div>
                <div className='flex justify-around'>
                    <button
                        type="submit"
                        className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
                    >
                        Actualizar gasto
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/viajes/detalle/${idViaje}`)}
                        className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
                    >
                        Volver al viaje
                    </button>
                </div>
            </form>
            {modalOpen && (
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} message="¡Gasto actualizado correctamente!" />
            )}
        </div>
    );
};

export default ModifySpend;

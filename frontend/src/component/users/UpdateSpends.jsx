import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../modal/Modal';

const UpdateSpends = () => {
    const { id } = useParams();

    const [gastos, setGastos] = useState({
        nombre: '',
        valor: ''
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const user = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = Cookies.get('jwtoken');

            if (!token) {
                throw new Error('No se registró token de acceso');
            }

            const response = await axios.put(`http://localhost:3000/viajes/gastos/${id}`,
                {
                    nombre: gastos.nombre,
                    valor: gastos.valor
                },
                {
                    headers: {
                        auth: `${token}`
                    }
                }
            );

            if (response.status === 201) {
                setGastos({ nombre: '', valor: '' });
                setError(null);
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
    

    return (
        <div className="max-w-lg mx-auto pt-10 ">
            <div className="bg-white mb-8 shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4 text-purple-900">Agregar un gasto del viaje</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-lg font-semibold text-gray-700 mb-2">
                            Referencia del gasto:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={gastos.nombre}
                            onChange={(e) => setGastos({ ...gastos, nombre: e.target.value })}
                            className="w-full px-3 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="valor" className="block text-lg font-semibold text-gray-700 mb-2">
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
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-1/2 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 mr-2"
                        >
                            Agregar Gasto
                        </button>
                        <a href={`/viajes/detalle/${id}`} className="w-1/2 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 ml-2 hover:text-whitesmoke">
                            Volver al viaje
                        </a>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                message="Evento agregado correctamente!"
            />
        </div>
    );
};

export default UpdateSpends;

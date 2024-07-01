import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import { format } from 'date-fns';
import Modal from '../modal/Modal';

const UpdateEvents = () => {
    const { id } = useParams();
    const user = useContext(AuthContext);

    const [eventos, setEventos] = useState({
        nombre: '',
        descripcion: '',
        fecha: '',
        horario: ''
    });

    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = Cookies.get('jwtoken');

            if (!token) {
                throw new Error('No se registró token de acceso');
            }

            const [year, month, day] = eventos.fecha.split('-');
            const [hour, minute] = eventos.horario.split(':');

            const fechaCompleta = new Date(Date.UTC(year, month - 1, day, hour, minute));

            // console.log(fechaCompleta);

            const response = await axios.put(
                `http://localhost:3000/viajes/eventos/${id}`,
                {
                    eventos: {
                        nombre: eventos.nombre,
                        descripcion: eventos.descripcion,
                        fecha: fechaCompleta.toISOString(),
                        horario: eventos.horario
                    }
                },
                {
                    headers: {
                        auth: `${token}`
                    }
                }
            );

            if (response.status === 201) {
                setEventos({ nombre: '', descripcion: '', fecha: '', horario: '' });
                setError(null);
                setModalOpen(true);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Error al agregar el evento.');
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 pt-10">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-purple-900">Agregar un evento al viaje</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-lg font-semibold text-gray-700 mb-2">
                            Nombre del evento:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={eventos.nombre}
                            onChange={(e) => setEventos({ ...eventos, nombre: e.target.value })}
                            className="w-full px-3 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-lg font-semibold text-gray-700 mb-2">
                            Descripción del evento:
                        </label>
                        <textarea
                            id="descripcion"
                            value={eventos.descripcion}
                            onChange={(e) => setEventos({ ...eventos, descripcion: e.target.value })}
                            className="w-full px-3 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-purple-300 h-32"
                            placeholder="Descripción del evento..."
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fecha" className="block text-lg font-semibold text-gray-700 mb-2">
                            Fecha del evento:
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            value={eventos.fecha}
                            onChange={(e) => setEventos({ ...eventos, fecha: e.target.value })}
                            className="w-full px-3 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="horario" className="block text-lg font-semibold text-gray-700 mb-2">
                            Horario del evento:
                        </label>
                        <input
                            type="time"
                            id="horario"
                            value={eventos.horario}
                            onChange={(e) => setEventos({ ...eventos, horario: e.target.value })}
                            className="w-full px-3 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-1/2 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 mr-2"
                        >
                            Agregar Evento
                        </button>
                        <a
                            href={`/viajes/detalle/${id}`}
                            className="w-1/2 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 hover:text-white ml-2 flex items-center justify-center"
                        >
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

export default UpdateEvents;

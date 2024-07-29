import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios';
import { updateTravel } from './userServices/updateTravel';

const UpdateTravel = () => {

    const {id} = useParams();

    const [error, setError] = useState(null)

    const [travel, setTravel] = useState({
        nombre: "",
        destino: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateTravel(id, travel);

            if (response.status === 201) {
                setTravel({
                    nombre: '',
                    destino: ''
                });
                setError(null);
                alert('¡El viaje se modificó correctamente!');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Error al modificar el viaje');
            }
        }
    };

  return (
    <div className="max-w-md mx-auto mt-24 mb-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-purple-900">Modificar datos del viaje</h1>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-md font-semibold text-gray-700 mb-2 text-left">Nombre del viaje:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={travel.nombre}
                        onChange={(e) => setTravel({...travel, nombre: e.target.value})}
                        className="w-full px-3 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="destino" className="block text-md font-semibold text-gray-700 mb-2 text-left">Destino del viaje:</label>
                    <input
                        type="text"
                        id="destino"
                        value={travel.destino}
                        onChange={(e) => setTravel({...travel, destino: e.target.value})}
                        className="w-full px-3 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>
                <div className='flex justify-around'>
                    <button
                        type="submit"
                        className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
                    >
                        Actualizar viaje
                    </button>
                    <button 
                        className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
                    >
                        <a href={`/viajes/detalle/${id}`} className='text-white hover:text-white'>Volver al viaje</a>
                    </button>
                </div>
            </form>
    </div>
  )
}

export default UpdateTravel
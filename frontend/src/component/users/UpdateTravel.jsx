import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie'
import axios from 'axios';

const UpdateTravel = () => {

    const {id} = useParams();
    const user = useContext(AuthContext)

    const [error, setError] = useState(null)

    const [travel, setTravel] = useState({
        nombre: "",
        destino: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = Cookies.get('jwtoken')

            if(!token) {
                throw new Error('No se registró token de acceso')
            }

            const res = await axios.put(`http://localhost:3000/viajes/modificar/${id}`, {
                nombre: travel.nombre,
                destino: travel.destino
            }, {
                headers: {'auth': `${token}`}
            });

            if (res.status === 201) {
                setTravel({
                    nombre: "",
                    destino: ""
                });
                setError(null);
                alert('¡El viaje se modificó correctamente!')
            }
        } catch (error) {
            if(error.res) {
                setError(error.res.data.error)
            } else {
                setError('Error al modificar el viaje')
            }
        }
    }

  return (
    <div className="max-w-md mx-auto mt-24 mb-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-purple-900">Modificar el nombre y destino del viaje</h1>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del viaje:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={travel.nombre}
                        onChange={(e) => setTravel({...travel, nombre: e.target.value})}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="destino" className="block text-sm font-medium text-gray-700">Destino del viaje:</label>
                    <input
                        type="text"
                        id="destino"
                        value={travel.destino}
                        onChange={(e) => setTravel({...travel, destino: e.target.value})}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-700"
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
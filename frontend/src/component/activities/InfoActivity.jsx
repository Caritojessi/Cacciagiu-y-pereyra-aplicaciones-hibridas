import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Actividad from '../../assets/actividades.jpg';

const InfoActivity = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const token = Cookies.get('jwtoken');
                if (!token) {
                    throw new Error('No se registró token de acceso');
                }

                const response = await axios.post(`http://localhost:3000/api/actividades/id/${id}`, 
                    { _id: id },
                    { headers: { 'auth': `${token}` } }
                );
                setActivity(response.data);
            } catch (error) {
                if (error.response) {
                    // console.log('Datos del error:', error.response.data);
                    // console.log('Estado del error:', error.response.status);
                    // console.log('Encabezados del error:', error.response.headers);
                    setError(error.response.data.message);
                } else if (error.request) {
                    // console.log('Solicitud:', error.request);
                    setError('No se recibió respuesta del servidor');
                } else {
                    // console.log('Error:', error.message);
                    setError('Error al configurar la solicitud');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Cargando información de la actividad...</p>;
    if (error) return <p className="text-center text-red-500">Ha ocurrido un error al cargar la información de la actividad: {error}</p>;

    return (
        <div>
        <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-9">Detalle de Actividad</h1>
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <img src={Actividad} alt="Montaña"   className="rounded-lg w-full h-full object-cover border-2 border-solid border-purple-500"/>
            </div>
            <div className="w-full md:w-2/3 md:pl-8 flex flex-col justify-center">
                {activity && (
                    <div>
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold text-gray-700">{activity.nombre}</h2>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-medium text-gray-600">Ciudad: {activity.ciudad}</h2>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700">{activity.informacion_general}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><strong>Ubicación:</strong> {activity.direccion}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><strong>Precio:</strong> {activity.precio}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Calificación:</strong> {activity.estrellas} estrellas</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default InfoActivity;

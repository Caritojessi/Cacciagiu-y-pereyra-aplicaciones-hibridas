import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Travels = () => {
    const { id } = useParams();
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // const { user, auth } = useContext(AuthContext);
    // console.log(user);

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const token = Cookies.get('jwtoken');
                if (!token) {
                    throw new Error('No se registró token de acceso');
                }
                const response = await axios.get(`http://localhost:3000/viajes/${id}`, {
                    headers: { 'auth': `${token}` }
                });
                setTravels(response.data);
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                if (error.response) {
                    setError(error.response.data.message);
                } else if (error.request) {
                    setError('No se recibió respuesta del servidor');
                } else {
                    setError('Error al configurar la solicitud');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTravels();
    }, [id]);

    const goToTravelDetail = (id) => {
        navigate(`/viajes/detalle/${id}`)
    }

    if (loading) return <p className='text-slate-800'>Cargando información de los viajes...</p>;
    if (error) return <p className='text-slate-800'>Ha ocurrido un error al cargar la información de los viajes: {error}</p>;

    return (
        <div>
            <h2 className='text-purple-800  text-3xl font-bold'>Sus viajes</h2>
            <div className='mt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {travels?.map(travel => (
                    <div key={travel._id} className='m-4 text-white bg-purple-600 p-4 rounded-md'>
                        <h3 className='text-xl'>Nombre del viaje: {travel.nombre}</h3>
                        <h4 className='text-xl'>Destino: {travel.destino}</h4>
                        <button className='w-full md:w-auto p-4 m-2 bg-violet-950 hover:bg-purple-900 text-white font-semibold' onClick={() => goToTravelDetail(travel._id)}>
                            Ver viaje
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Travels;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UshuaiaImage from '../../assets/viajes/ushuaia.jpg'; 
import BuenosAiresImage from '../../assets/viajes/buenos-aires.jpg'; 
import DefaultImage from '../../assets/viajes/default-city.jpg'; 
import IguazuImage from '../../assets/viajes/puerto.jpg';
import MendoImage from '../../assets/viajes/mendo.jpg';
import { getTravels } from './userServices/travels';

const Travels = () => {
    const { id } = useParams();
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const data = await getTravels(id); 
                setTravels(data);
            } catch (error) {
                setError(error.message || 'Ha ocurrido un error inesperado');
            } finally {
                setLoading(false);
            }
        };

        fetchTravels();
    }, [id]);

    const goToTravelDetail = (id) => {
        navigate(`/viajes/detalle/${id}`);
    };

    const goToNewTravel = () => {
        navigate('/viajes/nuevo-viaje');
    };

    const goToArchived = () => {
        navigate(`/viajes/archivados/${id}`)
    }

    const getCityImage = (destino) => {
        switch (destino.toLowerCase()) {
            case 'ushuaia':
                return UshuaiaImage;
            case 'buenos aires':
                return BuenosAiresImage;
            case 'iguazú':
                return IguazuImage;
            case 'mendoza':
                return MendoImage;
            default:
                return DefaultImage;
        }
    };

    if (loading) return <p className='text-slate-800'>Cargando información de los viajes...</p>;
    if (error) return <p className='text-slate-800'>Ha ocurrido un error al cargar la información de los viajes: {error}</p>;

    return (
        <div>
            <h1 className='text-purple-800 text-3xl font-bold'>Mis viajes</h1>
            <button
                className='w-full md:w-auto p-4 mt-10 m-2 bg-purple-700 hover:bg-purple-900 text-white font-semibold'
                onClick={goToNewTravel}
            >
                Agregar viaje
            </button>
            <button
                className='w-full md:w-auto py-4 px-6 mt-10 m-2 bg-purple-700 hover:bg-purple-900 text-white font-semibold'
                onClick={goToArchived}
            >
                Ver viajes archivados
            </button>
            <div className='mt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {travels.map(travel => (
                    <div key={travel._id} className='m-4 text-white bg-purple-600 p-4 rounded-md'>
                        <h3 className='text-xl'>Nombre del viaje: {travel.nombre}</h3>
                        <h4 className='text-xl mb-4'>Destino: {travel.destino}</h4>
                        <img
                            src={getCityImage(travel.destino)}
                            alt={`Imagen de ${travel.destino}`}
                            className="w-full h-64 object-cover mb-2 rounded-md"
                        />
                        <button className='w-full md:w-auto p-4 m-2 bg-violet-950 hover:bg-purple-900 text-white font-semibold' onClick={() => goToTravelDetail(travel._id)}>
                            Ver viaje
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Travels;

import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AuthContext } from '../../context/AuthContext';
import { getActivities, getCities } from './activitiesServices/recomendaciones';

const Recomendaciones = () => {
    const [activities, setActivities] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                
                const activities = await getActivities();
                setActivities(activities);
            } catch (error) {
                setError(error.message || 'Ha ocurrido un error inesperado');
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cities = await getCities();
                setCities(cities);
            } catch (error) {
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

        fetchCities();
    }, []);

    if (loading) return <p>Cargando lista de datos...</p>;
    if (error) return <p>Ha ocurrido un error al cargar la lista: {error}</p>;

    // Construir la URL de la imagen basada en la ruta del backend
    const getImageForCity = (imageName) => {
        // console.log(imageName);
        return `http://localhost:3000/api/images/${imageName}`;
    };

    const getShortDescription = (cityName) => {
        switch (cityName.toLowerCase()) {
            case 'ushuaia':
                return 'La ciudad más austral del mundo, rodeada de montañas y glaciares.';
            case 'mendoza':
                return 'Conocida por sus vinos y el majestuoso Aconcagua.';
            case 'bariloche':
                return 'Destino ideal para el esquí y la belleza de los lagos patagónicos.';
            case 'puerto iguazú':
                return 'Hogar de las impresionantes Cataratas del Iguazú.';
            case 'córdoba':
                return 'Famosa por su arquitectura colonial y su vibrante vida nocturna.';
            case 'salta':
                return 'Destaca por su arquitectura colonial y paisajes montañosos.';
            default:
                return 'Una ciudad maravillosa con mucho por descubrir.';
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4">
            <div className='mt-10'>
                <h1 className="text-3xl font-bold mb-8 text-purple-800">Ciudades recomendadas</h1>
                {cities.map(city => (
                    <div key={city._id} className="mb-16">
                        <div className="bg-purple-800 text-white rounded p-4 shadow-lg m-2">
                            <img
                                src={getImageForCity(city.image)} // Usar la URL construida dinámicamente
                                alt={`Imagen de ${city.nombre}`}
                                className="w-full h-48 object-cover rounded mb-4 shadow-md shadow-black"
                            />
                            <h2 className="text-xl font-bold mb-2">{city.nombre}</h2>
                            <p className="text-sm mb-4">{getShortDescription(city.nombre)}</p>
                            <NavLink to={`/localidades/${city.nombre}`} className="inline-block bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-900 hover:text-white transition duration-300 mb-4">Ver más</NavLink>
                        </div>
                        <Slider {...settings}>
                            {activities.filter(activity => activity.ciudad === city.nombre).map(activity => (
                                <div key={activity._id} className="p-2">
                                    <div className="bg-purple-500 text-white rounded p-4 shadow-lg h-full flex flex-col" style={{ height: '300px' }}>
                                        <h2 className="text-xl font-bold mb-2">{activity.nombre}</h2>
                                        <p className="text-sm mb-4">{activity.informacion_general}</p>
                                        <NavLink to={`/actividades/id/${activity._id}`} className="mt-auto inline-block bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-900 hover:text-white transition duration-300">Ver más</NavLink>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recomendaciones;

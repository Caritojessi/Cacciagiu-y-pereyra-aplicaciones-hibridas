import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import montanaImage from '../../assets/montaña.jpg';
import mendozaImage from '../../assets/playa.jpg';
import barilocheImage from '../../assets/bariloche.jpg';
import iguazuImage from '../../assets/cataratas.jpg';
import cordobaImage from '../../assets/cordoba.jpg';
import saltaImage from '../../assets/salta.jpg';
import backgroundImageRight from '../../assets/parte.png'; // Importa la primera imagen
import backgroundImageLeft from '../../assets/parte-copia.png'; // Importa la segunda imagen

const Recomendaciones = () => {
    const [activities, setActivities] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const token = Cookies.get('jwtoken');
                if (!token) {
                    throw new Error('No se registró token de acceso');
                }
                const response = await axios.get('http://localhost:3000/api/actividades/actividades', {
                    headers: { 'auth': `${token}` }
                });
                setActivities(response.data);
            } catch (error) {
                // console.error('Error al realizar la solicitud:', error);
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
        fetchActivities();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const token = Cookies.get('jwtoken');
                if (!token) {
                    throw new Error('No se registró token de acceso');
                }
                const response = await axios.get('http://localhost:3000/api/localidades/localidades', {
                    headers: { 'auth': `${token}` }
                });
                setCities(response.data);
            } catch (error) {
                // console.error('Error al realizar la solicitud:', error);
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

    const getImageForCity = (cityName) => {
        switch (cityName.toLowerCase()) {
            case 'ushuaia':
                return montanaImage;
            case 'mendoza':
                return mendozaImage;
            case 'bariloche':
                return barilocheImage;
            case 'puerto iguazú':
                return iguazuImage;
            case 'córdoba':
                return cordobaImage;
            case 'salta':
                return saltaImage;
            default:
                return montanaImage; // Imagen por defecto
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
                                src={getImageForCity(city.nombre)} 
                                alt={`Imagen de ${city.nombre}`}
                             className="w-full h-48 object-cover rounded mb-4 shadow-md shadow-black"
                            />
                            <h2 className="text-xl font-bold mb-2">{city.nombre}</h2>
                            <p className="text-sm mb-4">Descripción corta de la ciudad</p>
                            <NavLink to={`/localidades/${city.nombre}`} className="inline-block bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-900 hover:text-white transition duration-300 mb-4">Ver más</NavLink>
                            {/* <img src={backgroundImageRight} alt="background" className="hidden md:block absolute right-0 top-0 h-full w-auto object-cover opacity-50" />
                            <img src={backgroundImageLeft} alt="background" className="hidden md:block absolute left-0 top-0 h-full w-auto object-cover opacity-50" /> */}
                        </div>
                        <Slider {...settings}>
                            {activities.filter(activity => activity.ciudad === city.nombre).map(activity => (
                                <div key={activity._id} className="p-2">
                                    <div className="bg-purple-500 text-white rounded p-4 shadow-lg h-full flex flex-col" style={{ height: '300px' }}>
                                        <h2 className="text-xl font-bold mb-2">{activity.nombre}</h2>
                                        <p className="text-sm mb-4">{activity.informacion_general}</p>
                                        <NavLink to={`/actividades/id/${activity._id}`} className="mt-auto inline-block bg-white text-blue-800 px-4 py-2 rounded hover:bg-blue-900 hover:text-white transition duration-300">Ver más</NavLink>
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

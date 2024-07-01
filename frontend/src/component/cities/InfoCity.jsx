import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import mountainImage from '../../assets/montaña.jpg'; // Ajusta la ruta según sea necesario
import beachImage from '../../assets/playa.jpg';
import barilocheImage from '../../assets/bariloche.jpg';
import iguazuImage from '../../assets/cataratas.jpg';
import cordobaImage from '../../assets/cordoba.jpg';
import saltaImage from '../../assets/salta.jpg';

const InfoCity = () => {
    const { nombre } = useParams();
    const [city, setCity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showFullInfo, setShowFullInfo] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Verificar el tamaño de la pantalla al cargar el componente

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const token = Cookies.get('jwtoken');
                if (!token) {
                    throw new Error('No se registró token de acceso');
                }
                const response = await axios.post(
                    `http://localhost:3000/api/localidades/${nombre}`,
                    { ciudad: nombre },
                    { headers: { auth: token } }
                );
                setCity(response.data);
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
        fetchCity();
    }, [nombre]);

    if (loading) return <p className="text-black">Cargando información de la ciudad...</p>;
    if (error) return <p className="text-black">Ha ocurrido un error al cargar la información de la ciudad: {error}</p>;

    // Función para obtener la imagen correspondiente a la ciudad
    const getImageForCity = () => {
        switch (nombre.toLowerCase()) {
            case 'ushuaia':
                return mountainImage;
            case 'mendoza':
                return beachImage;
            case 'bariloche':
                return barilocheImage;
            case 'puerto iguazú':
                return iguazuImage;
            case 'córdoba':
                return cordobaImage;
            case 'salta':
                return saltaImage;
            default:
                return mountainImage; // Imagen por defecto
        }
    };

    // Función para marcar palabras en negrita, incluyendo el nombre de la ciudad
    const marcarNegrita = (texto) => {
        const ciudadLowerCase = nombre.toLowerCase();
        const regex = new RegExp(`(\\b${ciudadLowerCase}\\b)`, 'gi');
        return texto.replace(regex, '<strong>$1</strong>');
    };

    let informacionParte1 = '';
    let informacionParte2 = '';

    if (city && city.informacion) {
        const fullText = city.informacion;
        let splitIndex = fullText.lastIndexOf('.', Math.ceil(fullText.length / 2));
        if (splitIndex === -1) {
            splitIndex = Math.ceil(fullText.length / 2); // Si no se encuentra un punto, divide a la mitad
        }
        informacionParte1 = fullText.slice(0, splitIndex + 1);
        informacionParte2 = fullText.slice(splitIndex + 1);
    }

    return (
        <div className={`info-city-container ${isMobile ? '' : 'flex min-h-screen'}`} style={{ backgroundImage: isMobile ? 'none' : `url(${getImageForCity()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {isMobile && (
                <div className="w-full h-64 mt-10" style={{ backgroundImage: `url(${getImageForCity()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
            )}

            <div className={`p-8 ${isMobile ? 'w-full mx-auto mt-5' : ' bg-black bg-opacity-50 '}`}>
                <div className={`rounded-lg ${isMobile ? 'mt-5' : 'bg-gray-900 bg-opacity-75 mt-8'}`}>
                    <div className="rounded-t-lg">
                        <h1 className={`text-4xl ${isMobile ? 'text-black mt-5' : 'text-white'} text-left p-8`}>{nombre}</h1>
                    </div>

                    {city && (
                        <div className="p-5 w-full">
                            <div className="mb-4">
                                <div className={`${isMobile ? 'w-full' : 'grid grid-cols-2 gap-x-12 gap-y-4'}`}>
                                    <div>
                                        <p className={`text-lg ${isMobile ? 'text-black' : 'text-white'} text-left`} dangerouslySetInnerHTML={{ __html: `Información: ${marcarNegrita(informacionParte1)}` }}></p>
                                    </div>
                                    {!isMobile && (
                                        <div>
                                            <p className="text-lg text-white text-left" dangerouslySetInnerHTML={{ __html: marcarNegrita(informacionParte2) }}></p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isMobile && !showFullInfo && (
                                <button
                                    className="text-lg text-white bg-purple-500 hover:bg-purple-700 p-2 rounded"
                                    onClick={() => setShowFullInfo(true)}
                                >
                                    Ver más
                                </button>
                            )}
                            {isMobile && showFullInfo && (
                                <div>
                                    <p className="text-lg text-black text-left" dangerouslySetInnerHTML={{ __html: marcarNegrita(informacionParte2) }}></p>
                                    <button
                                        className="text-lg text-white bg-purple-500 hover:bg-purple-700 p-2 rounded mt-2"
                                        onClick={() => setShowFullInfo(false)}
                                    >
                                        Ver menos
                                    </button>
                                </div>
                            )}
                            <div>
                                <h2 className={`text-lg mb-2 ${isMobile ? 'text-black' : 'text-white'} text-left`}>Actividades:</h2>
                                <ul className={`list-disc list-inside ${isMobile ? 'text-black' : 'text-white'} text-left`}>
                                    {city.actividades?.map((actividad, index) => (
                                        <li key={index} className="ml-4">{actividad}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfoCity;

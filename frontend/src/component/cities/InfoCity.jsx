import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { deleteCity, getCity, saveCityChanges } from './citiesServices/infoCity';


const InfoCity = () => {
    const { nombre } = useParams();
    const [city, setCity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showFullInfo, setShowFullInfo] = useState(false);
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedCity, setEditedCity] = useState({
        nombre: nombre,
        informacion: '',
        actividades: [],
        image: null // Nueva propiedad para la imagen
    });

    const navigate = useNavigate();
    const id = city?._id;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const city = await getCity(nombre);
                setCity(city);
                setEditedCity({
                    _id: city._id,
                    nombre: nombre,
                    informacion: city.informacion,
                    actividades: city.actividades || [],
                    image: city.image
                });
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
        fetchCity();

        if (user?.rol === 'admin') {
            setIsAdmin(true);
        }
    }, [nombre, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCity((prev) => ({
            ...prev,
            [name]: name === 'actividades' ? value.split(',').map(item => item.trim()) : value
        }));
    };

    const handleImageChange = (e) => {
        setEditedCity((prev) => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const updatedCity = await saveCityChanges(editedCity);
            setCity(updatedCity);
            setEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        }
    };

    const getImageForCity = (imagePath) => {
        const baseUrl = 'http://localhost:3000/api/images/';
        const photo = baseUrl + imagePath;
        // console.log(photo);
        return imagePath ? photo : city?.nombre;
    };

    const handleDeleteCity = async (id) => {
        try {
            const confirmation = window.confirm('¿Estás seguro de que quieres eliminar esta ciudad?');
            if (!confirmation) return;

            const response = await deleteCity(id);

            if (response.status === 200) {
                navigate('/actividades/recomendaciones');
            } else {
                console.error('Error al eliminar la actividad:', response);
                setError('No se pudo eliminar la ciudad. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al eliminar la actividad:', error);
            setError('No se pudo eliminar la ciudad. Inténtalo de nuevo.');
        }
    };

    const marcarNegrita = (texto) => {
        const ciudadLowerCase = nombre.toLowerCase();
        const regex = new RegExp(`(\\b${ciudadLowerCase}\\b)`, 'gi');
        return texto.replace(regex, '<strong>$1</strong>');
    };

    let informacionParte1 = '';
    let informacionParte2 = '';

    if (city && city?.informacion) {
        const fullText = city?.informacion;
        let splitIndex = fullText.lastIndexOf('.', Math.ceil(fullText.length / 2));
        if (splitIndex === -1) {
            splitIndex = Math.ceil(fullText.length / 2);
        }
        informacionParte1 = fullText.slice(0, splitIndex + 1);
        informacionParte2 = fullText.slice(splitIndex + 1);
    }

    return (
        <div className={`info-city-container ${isMobile ? '' : 'flex min-h-screen'}`} style={{ backgroundImage: isMobile ? 'none' : `url(${getImageForCity(city?.image)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {isMobile && (
                <div className="w-full h-64 mt-10" style={{ backgroundImage: `url(${getImageForCity(city?.image)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
            )}

            <div className={`p-8 ${isMobile ? 'w-full mx-auto mt-5' : ' bg-black bg-opacity-50 w-full'}`}>
                <div className={`rounded-lg ${isMobile ? 'mt-5' : 'bg-gray-900 bg-opacity-75 mt-8 w-full'}`}>
                    <div className="rounded-t-lg">
                        <h1 className={`text-4xl ${isMobile ? 'text-black mt-5' : 'text-white'} text-left p-8`}>{nombre}</h1>
                    </div>

                    {city && (
                        <div className="p-5 w-full">
                            {editing ? (
                                <div className="w-full">
                                    <div className="mb-4 w-full">
                                        <label className="block text-white mb-2 text-left" htmlFor="informacion">Información:</label>
                                        <textarea
                                            name="informacion"
                                            value={editedCity.informacion}
                                            onChange={handleInputChange}
                                            className="text-gray-700 w-full p-2 border rounded h-40 bg-violet-300"
                                        />
                                    </div>
                                    <div className="mb-4 w-full">
                                        <label className="block text-white mb-2 text-left" htmlFor="actividades">Actividades:</label>
                                        <input
                                            type="text"
                                            name="actividades"
                                            value={editedCity.actividades.join(', ')}
                                            onChange={handleInputChange}
                                            className="text-gray-700 w-full p-2 border rounded text-left bg-violet-300"
                                        />
                                    </div>
                                    <div className="mb-4 w-full">
                                        <label className="block text-white mb-2 text-left" htmlFor="image">Imagen:</label>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleImageChange}
                                            className="text-gray-700 w-full p-2 border rounded bg-violet-300"
                                        />
                                    </div>
                                    <div className="mt-4 w-full flex gap-2">
                                        <button
                                            onClick={handleSaveChanges}
                                            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 flex-1"
                                        >
                                            Guardar Cambios
                                        </button>
                                        <button
                                            onClick={() => setEditing(false)}
                                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 flex-1"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-4 w-full">
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
                                                className="text-lg text-white bg-purple-500 hover:bg-purple-700 p-2 rounded"
                                                onClick={() => setShowFullInfo(false)}
                                            >
                                                Ver menos
                                            </button>
                                        </div>
                                    )}
                                    <div className="mb-4 w-full">
                                        <p className={`text-lg ${isMobile ? 'text-black' : 'text-white'} text-left`}>Actividades:</p>
                                        <ul className={`list-disc ${isMobile ? 'text-black' : 'text-white'} pl-5 text-left`}>
                                            {city?.actividades?.map((actividad, index) => (
                                                <li key={index}>{actividad}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    {isAdmin && (
                                        <div className="mt-6 flex gap-4">
                                            <button
                                                onClick={() => setEditing(true)}
                                                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                                            >
                                                Editar Ciudad
                                            </button>

                                            <button
                                                onClick={() => handleDeleteCity(id)}
                                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                            >
                                                Eliminar Ciudad
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500 text-white p-2 rounded mt-4">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfoCity;
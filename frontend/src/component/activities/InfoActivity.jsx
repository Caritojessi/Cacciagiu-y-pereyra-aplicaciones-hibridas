import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import Actividad from '../../assets/actividades/actividades.jpg';
import { AuthContext } from '../../context/AuthContext';
import { getActivity } from './activitiesServices/infoActivity';

const InfoActivity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editing, setEditing] = useState(false);
    const [photo, setPhoto] = useState(Actividad);
    const [photoFile, setPhotoFile] = useState(null);
    const [editedActivity, setEditedActivity] = useState({
        _id: id,
        nombre: '',
        ciudad: '',
        informacion_general: '',
        direccion: '',
        precio: '',
        estrellas: '',
        image: ''
    });

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const activityData = await getActivity(id); // Use the service
                setActivity(activityData);
                setEditedActivity({
                    _id: id,
                    nombre: activityData.nombre,
                    ciudad: activityData.ciudad,
                    informacion_general: activityData.informacion_general,
                    direccion: activityData.direccion,
                    precio: activityData.precio,
                    estrellas: activityData.estrellas,
                    image: activityData.image
                });
                setPhoto(activityData.image ? `http://localhost:3000/api/images/${activityData.image}` : Actividad);
            } catch (error) {
                setError(error.message || 'Ha ocurrido un error inesperado');
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    
        if (user?.rol === 'admin') {
            setIsAdmin(true);
        }
    }, [id, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedActivity((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhotoFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePhoto = () => {
        setPhoto(null);
        setPhotoFile(null);
        setEditedActivity((prev) => ({
            ...prev,
            foto: ''
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const token = Cookies.get('jwtoken');
            if (!token) {
                throw new Error('No se registró token de acceso');
            }
    
            const formData = new FormData();
            formData.append('_id', editedActivity._id);
            formData.append('nombre', editedActivity.nombre);
            formData.append('ciudad', editedActivity.ciudad);
            formData.append('informacion_general', editedActivity.informacion_general);
            formData.append('direccion', editedActivity.direccion);
            formData.append('precio', editedActivity.precio);
            formData.append('estrellas', editedActivity.estrellas);
    
            if (photoFile) {
                formData.append('image', photoFile);
            }
    
            const response = await axios.put('http://localhost:3000/api/actividades', 
                formData,
                {
                    headers: {
                        'auth': `${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
    
            const updatedActivity = response.data.data;
            setPhoto(editedActivity.image ? `http://localhost:3000/api/images/${editedActivity.image}` : Actividad);
            setEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        }
    };
    
    const handleDeleteActivity = async () => {
        try {
            const token = Cookies.get('jwtoken');
            if (!token) {
                throw new Error('No se registró token de acceso');
            }

            const confirmation = window.confirm('¿Estás seguro de que quieres eliminar esta actividad?');
            if (!confirmation) return;
    
            const response = await axios.delete(`http://localhost:3000/api/actividades/${id}`, {
                headers: { 'auth': `${token}` }
            });
    
            // Verificación de respuesta exitosa
            if (response.status === 200) {
                // Redirigir a la lista de actividades después de eliminar
                navigate('/actividades/recomendaciones');
            } else {
                console.error('Error al eliminar la actividad:', response);
                setError('No se pudo eliminar la actividad. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al eliminar la actividad:', error);
            setError('No se pudo eliminar la actividad. Inténtalo de nuevo.');
        }
    };
    

    if (loading) return <p className="text-center text-gray-500">Cargando información de la actividad...</p>;
    if (error) return <p className="text-center text-red-500">Ha ocurrido un error al cargar la información de la actividad: {error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-9">Detalle de Actividad {isAdmin ? 'Hola Admin' : ''}</h1>
            <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 mb-6 md:mb-0 relative">
                    {photo ? (
                        <div className="relative h-full">
                            <img src={photo} alt="Actividad" className="rounded-lg w-full h-full object-cover border-2 border-solid border-purple-500" style={{ height: '100%' }} />
                            {isAdmin && editing && (
                                <button
                                    onClick={handleDeletePhoto}
                                    className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-full"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full border-2 border-dashed border-purple-500 flex items-center justify-center rounded-lg">
                            <input type="file" onChange={handlePhotoChange} className="w-full h-full opacity-0 cursor-pointer" />
                            <p className="absolute text-purple-500">Subir Foto</p>
                        </div>
                    )}
                </div>

                <div className="w-full md:w-2/3 md:pl-8 flex flex-col text-left">
                    {activity && (
                        <div>
                            {editing ? (
                                <div>
                                    <div className="mb-4">
                                    <label htmlFor="nombre" className="sr-only">Nombre</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={editedActivity.nombre}
                                            onChange={handleInputChange}
                                            className="text-2xl font-semibold text-gray-700 w-full p-2 border rounded bg-violet-300"
                                        />
                                    </div>
                                    <div className="mb-4">
                                    <label htmlFor="ciudad" className="sr-only">Ciudad</label>
                                        <input
                                            type="text"
                                            name="ciudad"
                                            value={editedActivity.ciudad}
                                            onChange={handleInputChange}
                                            className="text-xl font-medium text-gray-600 w-full p-2 border rounded bg-violet-300"
                                        />
                                    </div>
                                    <div className="mb-4">
                                    <label htmlFor="informacion_general" className="sr-only">Información</label>
                                        <textarea
                                            name="informacion_general"
                                            value={editedActivity.informacion_general}
                                            onChange={handleInputChange}
                                            className="text-gray-700 w-full p-2 border rounded bg-violet-300"
                                        />
                                    </div>
                                    <div className="mb-4">
                                    <label htmlFor="precio" className="sr-only">Precio</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            value={editedActivity.direccion}
                                            onChange={handleInputChange}
                                            className="text-gray-700 w-full p-2 border rounded bg-violet-300"
                                        />
                                    </div>
                                    <div className="mb-4">
                                    <label htmlFor="precio" className="sr-only">Precio</label>
                                        <input
                                            type="text"
                                            name="precio"
                                            value={editedActivity.precio}
                                            onChange={handleInputChange}
                                            className="text-gray-700 w-full p-2 border rounded bg-violet-300"
                                        />
                                    </div>
                                    <div className="mb-4">
                                    <label htmlFor="estrellas" className="sr-only">Estrellas</label>
                                        <input
                                            type="text"
                                            name="estrellas"
                                            value={editedActivity.estrellas}
                                            onChange={handleInputChange}
                                            className="text-gray-700 w-full p-2 border rounded bg-violet-300"
                                        />
                                    </div>
                                    <div className="mb-4">
                                    <label htmlFor="estrellas" className="sr-only">Estrellas</label>
                                        <input
                                            type="file"
                                            onChange={handlePhotoChange}
                                            className="w-full p-2 border rounded bg-violet-300"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            onClick={handleSaveChanges}
                                            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                                        >
                                            Guardar Cambios
                                        </button>
                                        <button
                                            onClick={() => setEditing(false)}
                                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-4"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
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
                                    {isAdmin && (
                                        <div className="mt-6 flex gap-4">
                                            <button
                                                onClick={() => setEditing(true)}
                                                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                                            >
                                                Editar Actividad
                                            </button>
                                            <button
                                                onClick={handleDeleteActivity}
                                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                            >
                                                Eliminar Actividad
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfoActivity;
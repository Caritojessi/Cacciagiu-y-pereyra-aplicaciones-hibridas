import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal'; // Asegúrate de que la ruta sea correcta

const AddNewActivity = () => {
    const [newActivity, setNewActivity] = useState({
        ciudad: '',
        direccion: '',
        nombre: '',
        informacion_general: '',
        precio: '',
        estrellas: '',
        image: '',
    });

    const [cities, setCities] = useState([]);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const token = Cookies.get('jwtoken');
                if (!token) {
                    throw new Error('No se registró token de acceso');
                }
                const response = await axios.get('http://localhost:3000/api/localidades/localidades', { headers: { 'auth': `${token}` } });
                setCities(response.data);
            } catch (error) {
                console.error('Error al obtener ciudades:', error);
                setError('Error al obtener ciudades');
            }
        };

        fetchCities();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Previene envíos múltiples
        setLoading(true);
        try {
            const token = Cookies.get('jwtoken');
            if (!token) {
                throw new Error('No se registró token de acceso');
            }

            const formData = new FormData();
            formData.append('ciudad', newActivity.ciudad);
            formData.append('direccion', newActivity.direccion);
            formData.append('nombre', newActivity.nombre);
            formData.append('informacion_general', newActivity.informacion_general);
            formData.append('precio', newActivity.precio);
            formData.append('estrellas', newActivity.estrellas);
            if (newActivity.image) {
                formData.append('image', newActivity.image);
            }

            await axios.post(
                'http://localhost:3000/api/actividades/nueva-actividad',
                formData,
                { headers: { 
                    'auth': `${token}`,
                    'Content-Type': 'multipart/form-data'
                } }
            );

            setModalMessage('¡Actividad agregada con éxito!');
            setModalOpen(true);
            setTimeout(() => {
                navigate('/actividades/recomendaciones');
            }, 2000);
        } catch (error) {
            console.error('Error al crear actividad:', error);
            const errorMessage = error.response?.data?.message || 'Error al registrar la actividad';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewActivity(prevState => ({
                ...prevState,
                image: file,
            }));
            setImagePreview(URL.createObjectURL(file)); // Crear una vista previa de la imagen
        }
    };

    return (
        <>
            <form id='form-basic' onSubmit={handleSubmit} className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-violet-700">Agregar Nueva Actividad</h1>
                </div>
                <div className='mb-4'>
                    <label htmlFor="ciudad" className='block text-left mb-2 text-lg font-medium text-violet-600'>Ciudad:</label>
                    <select
                        id="ciudad"
                        className='w-full h-12 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                        value={newActivity.ciudad}
                        onChange={(e) => setNewActivity({ ...newActivity, ciudad: e.target.value })}
                        required
                    >
                        <option value="">Selecciona una ciudad</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city.nombre}>
                                {city.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-4'>
                    <label htmlFor="direccion" className='block text-left mb-2 text-lg font-medium text-violet-600'>Dirección:</label>
                    <input
                        id='direccion'
                        className='w-full h-12 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                        type="text"
                        value={newActivity.direccion}
                        onChange={(e) => setNewActivity({ ...newActivity, direccion: e.target.value })}
                        placeholder="Dirección"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="nombre" className='block text-left mb-2 text-lg font-medium text-violet-600'>Nombre:</label>
                    <input
                        id='nombre'
                        className='w-full h-12 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                        type="text"
                        value={newActivity.nombre}
                        onChange={(e) => setNewActivity({ ...newActivity, nombre: e.target.value })}
                        placeholder="Nombre de la actividad"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="informacion" className='block text-left mb-2 text-lg font-medium text-violet-600'>Información de la actividad:</label>
                    <textarea
                        id='informacion'
                        className='w-full h-36 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                        value={newActivity.informacion_general}
                        onChange={(e) => setNewActivity({ ...newActivity, informacion_general: e.target.value })}
                        placeholder="Información General"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="precio" className='block text-left mb-2 text-lg font-medium text-violet-600'>Precio de la actividad:</label>
                    <input
                        id='precio'
                        className='w-full h-12 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                        type="number"
                        value={newActivity.precio}
                        onChange={(e) => setNewActivity({ ...newActivity, precio: e.target.value })}
                        placeholder="Precio"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="estrella" className='block text-left mb-2 text-lg font-medium text-violet-600'>Calificación (en cantidad de estrellas del 1 al 5):</label>
                    <input
                        id='estrella'
                        className='w-full h-12 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                        type="number"
                        value={newActivity.estrellas}
                        onChange={(e) => setNewActivity({ ...newActivity, estrellas: e.target.value })}
                        placeholder="Estrellas"
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='image' className='block text-left mb-2 text-lg font-medium text-violet-600'>Imagen:</label>
                    <input
                        id='image'
                        className='w-full h-12 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                        type="file"
                        accept='image/*'
                        onChange={handleChangeImage}
                    />
                    {imagePreview && <img src={imagePreview} alt="Vista previa" className="mt-4 w-full h-32 object-cover rounded"/>}
                </div>
                {error && <p className='text-red-600'>{error}</p>}
                <div className='text-center mt-6'>
                    <button
                        type='submit'
                        className='w-full h-12 bg-violet-600 text-white rounded-lg'
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Agregar Actividad'}
                    </button>
                </div>
            </form>
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    message={modalMessage}
                />
            )}
        </>
    );
};

export default AddNewActivity;

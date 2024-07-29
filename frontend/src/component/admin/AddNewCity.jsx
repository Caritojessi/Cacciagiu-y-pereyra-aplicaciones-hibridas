import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddNewCity = () => {
    const [newCity, setNewCity] = useState({
        nombre: '',
        informacion: '',
        actividades: '',
        image: null,
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('jwtoken');

            if (!token) {
                throw new Error('No se registró token de acceso');
            }

            const formData = new FormData();
            formData.append("nombre", newCity.nombre);
            formData.append("informacion", newCity.informacion);

            // Convertir la cadena de actividades a un array de actividades
            const actividadesArray = newCity.actividades
                .split(',')
                .map(activity => activity.trim())
                .filter(activity => activity.length > 0);
            
            formData.append("actividades", actividadesArray);

            if (newCity.image) {
                formData.append("image", newCity.image);
            }

            // El body de FormData ya contiene todo lo necesario
            const response = await axios.post(
                'http://localhost:3000/api/localidades/nueva-ciudad',
                formData,
                { headers: { 
                    'auth': `${token}`,
                    'Content-Type': 'multipart/form-data' 
                } 
            });

            console.log('Ciudad creada:', response.data);
            navigate('/actividades/recomendaciones');
        } catch (error) {
            console.error('Error al crear ciudad:', error);
            const errorMessage = error.response?.data?.message || 'Error al registrar la ciudad';
            setError(errorMessage);
        }
    };

    const handleChangeImage = (e) => {
        setNewCity({...newCity, image: e.target.files[0]});
    }

    return (
        <form id='form-basic' onSubmit={handleSubmit} className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-violet-700">Agregar Nueva Ciudad</h1>
            </div>

            <div className='mb-4'>
                <label htmlFor='nombre' className='block text-left mb-2 text-lg font-medium text-violet-600'>Nombre:</label>
                <input
                    id='nombre'
                    className='w-full h-12 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                    type="text"
                    value={newCity.nombre}
                    onChange={(e) => setNewCity({ ...newCity, nombre: e.target.value })}
                    required
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='informacion' className='block text-left mb-2 text-lg font-medium text-violet-600'>Información:</label>
                <input
                    id='informacion'
                    className='w-full h-12 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                    type="text"
                    value={newCity.informacion}
                    onChange={(e) => setNewCity({ ...newCity, informacion: e.target.value })}
                    required
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='actividades' className='block text-left mb-2 text-lg font-medium text-violet-600'>Actividades (separe cada nombre de actividad por una 'coma'):</label>
                <input
                    id='actividades'
                    className='w-full h-12 rounded-lg border border-violet-300 bg-violet-50 text-slate-900 px-3'
                    type='text'
                    value={newCity.actividades}
                    onChange={(e) => setNewCity({ ...newCity, actividades: e.target.value })}
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
            </div>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <div className="mb-4">
                <button
                    type="submit"
                    className='w-full py-3 rounded-lg bg-violet-600 text-white text-lg font-semibold hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'
                >
                    Agregar Ciudad
                </button>
            </div>
        </form>
    );
};

export default AddNewCity;
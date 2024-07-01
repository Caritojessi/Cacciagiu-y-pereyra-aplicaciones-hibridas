import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';

const RegistroGastos = () => {
    const {id} = useParams();
    const [gastoDescripcion, setGastoDescripcion] = useState('');
    const [gastoCantidad, setGastoCantidad] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [gastosRegistrados, setGastosRegistrados] = useState([]);

    useEffect(() => {
        cargarGastosRegistrados();
    }, []);

    const cargarGastosRegistrados = async () => {
        try {
            const token = Cookies.get('jwtoken')
                if (!token) {
                    throw new Error('No se registró token de acceso')
                }
            const response = await axios.get(`http://localhost:3000/viajes/detalle/${id}`, { headers: { 'auth': `${token}` }
            });
            setGastosRegistrados(response.data);
        } catch (error) {
            // console.error('Error al cargar gastos registrados:', error);
            setError('No se pudieron cargar los gastos registrados.');
        }
    };

    const handleChangeDescripcion = (e) => {
        setGastoDescripcion(e.target.value);
    };

    const handleChangeCantidad = (e) => {
        setGastoCantidad(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjY2NWNkZmQxYjc1NzMxMmY3ZjIwZTk3NyIsIm5vbWJyZSI6Imp1YW5pIiwiZW1haWwiOiJqdWFuaUBnbWFpbC5jb20ifSwiaWF0IjoxNzE3NTMxNzU5LCJleHAiOjE3MTc1MzUzNTl9.eEVGt2Q7lzK-W8qaGGqRQJ7zYwQzje-Pz270iPRMN5I';
            const response = await axios.post('http://localhost:5000/api/gastos', 
                { descripcion: gastoDescripcion, cantidad: gastoCantidad },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setMensaje(response.data.message);
            setGastoDescripcion('');
            setGastoCantidad('');
            cargarGastosRegistrados(); // Vuelve a cargar la lista de gastos después de registrar uno nuevo.
        } catch (error) {
            // console.error('Error al registrar gasto:', error);
            setError('No se pudo registrar el gasto.');
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Registro de Gastos</h2>
            {mensaje && <p className="text-green-500 mb-4">{mensaje}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="descripcion" className="text-sm font-semibold">Descripción:</label>
                    <input 
                        type="text" 
                        id="descripcion" 
                        value={gastoDescripcion} 
                        onChange={handleChangeDescripcion} 
                        className="mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="cantidad" className="text-sm font-semibold">Cantidad:</label>
                    <input 
                        type="number" 
                        id="cantidad" 
                        value={gastoCantidad} 
                        onChange={handleChangeCantidad} 
                        className="mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Registrar Gasto
                </button>
            </form>
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Gastos Registrados</h3>
                {gastosRegistrados.length === 0 ? (
                    <p>No hay gastos registrados.</p>
                ) : (
                    <ul>
                        {gastosRegistrados?.map((gasto, index) => (
                            <li key={index}>
                                <p>{gasto.descripcion}: ${gasto.cantidad}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default RegistroGastos;

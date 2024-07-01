import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';

const ModifySpend = () => {
    const { id } = useParams();
    const user = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const [gasto, setGasto] = useState({
        nombre: '',
        valor: ''
    });

    useEffect(() => {
        // Obtener los datos del gasto al montar el componente
        const fetchGasto = async () => {
            try {
                const token = Cookies.get('jwtoken');
                if (!token) {
                    throw new Error('No se registró token de acceso');
                }

                const res = await axios.get(`http://localhost:3000/viajes/gastos/${id}`, {
                    headers: { auth: `${token}` }
                });

                if (res.status === 200) {
                    setGasto({
                        nombre: res.data.nombre,
                        valor: res.data.valor
                    });
                }
            } catch (error) {
                setError('Error al obtener los datos del gasto');
            }
        };

        fetchGasto();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = Cookies.get('jwtoken');

            if (!token) {
                throw new Error('No se registró token de acceso');
            }

            const res = await axios.put(`http://localhost:3000/viajes/modificar-gasto/${id}`, {
                nombre: gasto.nombre,
                valor: gasto.valor
            }, {
                headers: { auth: `${token}` }
            });

            if (res.status === 200) {
                setGasto({
                    nombre: '',
                    valor: ''
                });
                setError(null);
                alert('¡El gasto se modificó correctamente!');
                navigate(`/viajes/detalle/${id}`);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Error al modificar el gasto');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 mb-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-semibold mb-4 text-purple-900">Modificar el nombre y valor del gasto</h1>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del gasto:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={gasto.nombre}
                        onChange={(e) => setGasto({ ...gasto, nombre: e.target.value })}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor del gasto:</label>
                    <input
                        type="number"
                        id="valor"
                        value={gasto.valor}
                        onChange={(e) => setGasto({ ...gasto, valor: e.target.value })}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-700"
                        required
                    />
                </div>
                <div className='flex justify-around'>
                    <button
                        type="submit"
                        className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
                    >
                        Actualizar gasto
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/viajes/detalle/${id}`)}
                        className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
                    >
                        Volver al viaje
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModifySpend;

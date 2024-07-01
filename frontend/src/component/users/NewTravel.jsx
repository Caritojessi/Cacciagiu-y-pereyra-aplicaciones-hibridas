import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../modal/Modal'; // Ajusta la ruta según la ubicación de tu componente Modal
import { useNavigate } from 'react-router-dom';

const NewTravel = () => {
  const [travelData, setTravelData] = useState({
    nombre: '',
    destino: '',
    dueño: { id: '', nombre: '' },
    gastos: { nombre: '', valor: '' }
  });

  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la visibilidad de la modal

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id && user.nombre) {
      setTravelData(prevData => ({
        ...prevData,
        dueño: { id: user._id, nombre: user.nombre }
      }));
    }
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const token = Cookies.get('jwtoken');

      if (!token) {
        throw new Error('No se registró token de acceso');
      }

      const response = await axios.post(`/viajes/agregar`, {
        nombre: travelData.nombre,
        destino: travelData.destino,
        dueño: {
          id: travelData.dueño.id,
          nombre: travelData.dueño.nombre
        }
      }, {
        headers: {
          auth: `${token}`
        }
      });

      if (response.status === 201) {
        setTravelData({
          nombre: '',
          destino: '',
          dueño: { id: '', nombre: '' },
          gastos: { nombre: '', valor: '' }
        });
        setError(null);
        setModalOpen(true); // Abrir la modal cuando se agrega correctamente
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Error al agregar el viaje.');
      }
    }
  };

  const goToTravels = () => {
    navigate(`/viajes/${user._id}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 pt-18 text-purple-800">Agregar un nuevo viaje</h1>
      <div className="max-w-lg mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="mb-5">
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">Nombre del viaje:</label>
            <input
              type="text"
              id="nombre"
              value={travelData.nombre}
              onChange={(e) => setTravelData({ ...travelData, nombre: e.target.value })}
              className="w-full p-3 border bg-violet-300 text-violet-950 font-semibold border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="destino" className="block text-sm font-semibold text-gray-700 mb-2">Destino del viaje:</label>
            <input
              type="text"
              id="destino"
              value={travelData.destino}
              onChange={(e) => setTravelData({ ...travelData, destino: e.target.value })}
              className="w-full p-3 border bg-violet-300 text-violet-950 font-semibold border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Agregar viaje
          </button>
        </form>
        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
          <p className="text-gray-800 mb-4">¿O quizás querías ver sus viajes?</p>
          <button
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-300"
            onClick={goToTravels}
          >
            Ver mis viajes
          </button>
        </div>
      </div>
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} message="¡Viaje agregado correctamente!" />
      )}
    </div>
  );
};

export default NewTravel;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../modal/Modal';
import { useNavigate } from 'react-router-dom';
import agregarViaje from './userServices/newTravel';

const NewTravel = () => {
  const [travelData, setTravelData] = useState({
    nombre: '',
    destino: '',
    dueño: { id: '', nombre: '' },
    inicio_viaje: '',
    final_viaje: '',
  });

  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showNombreSuggestions, setShowNombreSuggestions] = useState(false);
  const [nombreSuggestions, setNombreSuggestions] = useState([]);
  const [showDestinoSuggestions, setShowDestinoSuggestions] = useState(false);
  const [destinoSuggestions, setDestinoSuggestions] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar carga

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const lugares = [
    'Buenos Aires',
    'Córdoba',
    'Mendoza',
    'Bariloche',
    'Ushuaia',
    'Salta',
    'Iguazú',
    'Mar del Plata',
    'Rosario',
    'San Juan',
    // Puedes agregar más lugares aquí
  ];

  const nombresViaje = [
    'Vacaciones',
    'Trabajo',
    'Familia',
    'Aventura',
    'Luna de Miel',
    // Puedes agregar más nombres aquí
  ];

  const SUGGESTION_LIMIT = 4;

  useEffect(() => {
    if (user && user._id && user.nombre) {
      setTravelData(prevData => ({
        ...prevData,
        dueño: { id: user._id, nombre: user.nombre }
      }));
    }
  }, [user]);

  const handleNombreChange = (e) => {
    const valor = e.target.value;
    setTravelData(prevData => ({ ...prevData, nombre: valor }));

    const newNombreSuggestions = nombresViaje.filter(nombre =>
      nombre.toLowerCase().startsWith(valor.toLowerCase())
    ).slice(0, SUGGESTION_LIMIT);

    setNombreSuggestions(newNombreSuggestions);
    setShowNombreSuggestions(true);
  };

  const handleNombreFocus = () => {
    const initialNombreSuggestions = nombresViaje.slice(0, SUGGESTION_LIMIT);
    setNombreSuggestions(initialNombreSuggestions);
    setShowNombreSuggestions(true);
  };

  const handleNombreSuggestionClick = (suggestion) => {
    setTravelData(prevData => ({ ...prevData, nombre: suggestion }));
    setShowNombreSuggestions(false);
  };

  const handleDestinoChange = (e) => {
    const valor = e.target.value;
    setTravelData(prevData => ({ ...prevData, destino: valor }));

    const newDestinoSuggestions = lugares.filter(lugar =>
      lugar.toLowerCase().startsWith(valor.toLowerCase())
    ).slice(0, SUGGESTION_LIMIT);

    setDestinoSuggestions(newDestinoSuggestions);
    setShowDestinoSuggestions(true);
  };

  const handleDestinoFocus = () => {
    const initialDestinoSuggestions = lugares.slice(0, SUGGESTION_LIMIT);
    setDestinoSuggestions(initialDestinoSuggestions);
    setShowDestinoSuggestions(true);
  };

  const handleDestinoSuggestionClick = (suggestion) => {
    setTravelData(prevData => ({ ...prevData, destino: suggestion }));
    setShowDestinoSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
        const result = await agregarViaje(travelData);
        if (result.success) {
            setTravelData({
                nombre: '',
                destino: '',
                dueño: { id: '', nombre: '' },
                inicio_viaje: '',
                final_viaje: ''
            });
            setError(null);
            setModalMessage(result.message);
            setModalOpen(true);
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false); 
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
          <div className="mb-5 relative">
            <label htmlFor="nombre" className="block text-md text-left font-semibold text-gray-700 mb-2">Nombre del viaje:</label>
            <input
              type="text"
              id="nombre"
              value={travelData.nombre}
              onChange={handleNombreChange}
              onFocus={handleNombreFocus}
              className="w-full p-3 border bg-violet-300 text-violet-950 font-semibold border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            {showNombreSuggestions && nombreSuggestions.length > 0 && (
              <ul className="absolute bg-white border rounded-md w-full mt-1 z-10">
                {nombreSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleNombreSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-5 relative">
            <label htmlFor="destino" className="block text-md text-left font-semibold text-gray-700 mb-2">Destino del viaje:</label>
            <input
              type="text"
              id="destino"
              value={travelData.destino}
              onChange={handleDestinoChange}
              onFocus={handleDestinoFocus}
              className="w-full p-3 border bg-violet-300 text-violet-950 font-semibold border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            {showDestinoSuggestions && destinoSuggestions.length > 0 && (
              <ul className="absolute bg-white border rounded-md w-full mt-1 z-10">
                {destinoSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleDestinoSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='mb-5 relative'>
            <label htmlFor="inicio_viaje" className="block text-md font-semibold text-gray-700 mb-2 text-left">
                Comienzo del viaje:
            </label>
            <input
                type="date"
                id="inicio_viaje"
                value={travelData.inicio_viaje}
                onChange={(e) => setTravelData({ ...travelData, inicio_viaje: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 text-violet-950 font-semibold"
                required
            />
          </div>
          <div className='mb-5 relative'>
            <label htmlFor="final_viaje" className="block text-md font-semibold text-gray-700 mb-2 text-left">
                Final del viaje:
            </label>
            <input
                type="date"
                id="final_viaje"
                value={travelData.final_viaje}
                onChange={(e) => setTravelData({ ...travelData, final_viaje: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 text-violet-950 font-semibold"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
            disabled={loading} // Desactivar el botón durante la carga
          >
            {loading ? 'Añadiendo...' : 'Agregar viaje'}
          </button>
        </form>
        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
          <p className="text-gray-800 mb-4">¿O quizás querías ver tus viajes?</p>
          <button
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-300"
            onClick={goToTravels}
          >
            Ver mis viajes
          </button>
        </div>
      </div>
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />
      )}
    </div>
  );
};

export default NewTravel;

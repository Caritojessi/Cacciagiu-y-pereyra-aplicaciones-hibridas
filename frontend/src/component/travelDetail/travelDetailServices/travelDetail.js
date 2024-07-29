import axios from 'axios';
import Cookies from 'js-cookie';

const fetchTravelDetails = async (id) => {
     const token = Cookies.get('jwtoken');
    if (!token) {
        throw new Error('No se registró token de acceso');
    }
    const response = await axios.get(`http://localhost:3000/viajes/detalle/${id}`, {
        headers: { auth: `${token}` }
    });
    return response.data;
};

const toggleTravelState = async (id, currentState) => {
     const token = Cookies.get('jwtoken');
    if (!token) {
        throw new Error('No se registró token de acceso');
    }
    const newState = !currentState;
    const response = await axios.put(`http://localhost:3000/viajes/archivar/${id}`, {
        estado: newState
    }, {
        headers: { auth: `${token}` }
    });
    return response.status;
};

const removeSpend = async (id) => {
     const token = Cookies.get('jwtoken');
    if (!token) {
        throw new Error('No se registró token de acceso');
    }
    const response = await axios.delete(`http://localhost:3000/viajes/eliminar-gasto/${id}`, {
        headers: { auth: `${token}` }
    });
    return response.status;
};

export { fetchTravelDetails, toggleTravelState, removeSpend}
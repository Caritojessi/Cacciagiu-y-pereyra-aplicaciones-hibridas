import axios from "axios";
import Cookies from 'js-cookie';

const getTravels = async (id) => {
    try {
        const token = Cookies.get('jwtoken');
        if (!token) {
            throw new Error('No se registró token de acceso');
        }
        const response = await axios.get(`http://localhost:3000/viajes/${id}`, {
            headers: { 'auth': `${token}` }
        });
        const filteredTravels = response.data.filter(travel => travel.estado === true)
        return filteredTravels;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw new Error(
            error.response?.data?.message ||
            'No se recibió respuesta del servidor' ||
            'Error al configurar la solicitud'
        );
    }
};


export { getTravels };
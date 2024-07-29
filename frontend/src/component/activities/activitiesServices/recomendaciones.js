import axios from "axios";
import Cookies from 'js-cookie';

const getActivities = async () => {
    try {

        const token = Cookies.get('jwtoken');
        if (!token) {
            throw new Error('No se registró token de acceso');
        }

        const response = await axios.get('http://localhost:3000/api/actividades/actividades', {
            headers: { 'auth': `${token}` }
        });

        return response.data;
    } catch (error) {
        // console.error('Error al realizar la solicitud:', error);
        throw new Error(
            error.response?.data?.message ||
            'No se recibió respuesta del servidor' ||
            'Error al configurar la solicitud'
        );
    }
}

const getCities = async () => {
    try {
        
        const token = Cookies.get('jwtoken');
        if (!token) {
            throw new Error('No se registró token de acceso');
        }
        const response = await axios.get('http://localhost:3000/api/localidades/localidades', {
            headers: { 'auth': `${token}` }
        });

        return response.data
        
    } catch (error) {
        // console.error('Error al realizar la solicitud:', error);
        throw new Error(
            error.response?.data?.message ||
            'No se recibió respuesta del servidor' ||
            'Error al configurar la solicitud'
        );
    }
}


export { getActivities, getCities }
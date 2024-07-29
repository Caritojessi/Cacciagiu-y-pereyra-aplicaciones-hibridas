import axios from 'axios';
import Cookies from 'js-cookie';

const getActivity = async (id) => {
    try {
        const token = Cookies.get('jwtoken');
        if (!token) {
            throw new Error('No se registró token de acceso');
        }
        const response = await axios.post(`http://localhost:3000/api/actividades/id/${id}`, 
            { _id: id },
            { headers: { 'auth': `${token}` } }
        );
        return response.data;
    } catch (error) {
        // console.error('Error al realizar la solicitud:', error);
        throw new Error(
            error.response?.data?.message ||
            'No se recibió respuesta del servidor' ||
            'Error al configurar la solicitud'
        );
    }
};

export { getActivity };
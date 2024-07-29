import axios from "axios";
import Cookies from 'js-cookie';

const getCity = async (nombre) => {
    try {
        const token = Cookies.get('jwtoken');
        if (!token) {
            throw new Error('No se registró token de acceso');
        }
        const response = await axios.post(
            `http://localhost:3000/api/localidades/${nombre}`,
            { ciudad: nombre },
            { headers: { auth: token } }
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
}


const saveCityChanges = async (editedCity) => {
    try {
        const token = Cookies.get('jwtoken');
        if (!token) {
            throw new Error('No se registró token de acceso');
        }

        const formData = new FormData();
        formData.append('nombre', editedCity.nombre);
        formData.append('informacion', editedCity.informacion);
        editedCity.actividades.forEach((actividad, index) => {
            formData.append(`actividades[${index}]`, actividad);
        });
        if (editedCity.image) {
            formData.append('image', editedCity.image);
        }

        const response = await axios.put(
            `http://localhost:3000/api/localidades/${editedCity._id}`,
            formData,
            {
                headers: {
                    auth: token,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
        throw error;
    }
};

const deleteCity = async (id) => {
    try {
        const token = Cookies.get('jwtoken');
        if (!token) {
            throw new Error('No se registró token de acceso');
        }

        const response = await axios.delete(`http://localhost:3000/api/localidades/${id}`, {
            headers: { 'auth': `${token}` }
        });

        if (response.status !== 200) {
            throw new Error('No se pudo eliminar la ciudad. Inténtalo de nuevo.');
        }

        return response;
    } catch (error) {
        console.error('Error al eliminar la ciudad:', error);
        throw error;
    }
};

export { getCity, saveCityChanges, deleteCity }
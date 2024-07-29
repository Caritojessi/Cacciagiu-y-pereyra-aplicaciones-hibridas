import axios from 'axios';
import Cookies from 'js-cookie';

const agregarViaje = async (travelData) => {
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
            },
            inicio_viaje: travelData.inicio_viaje,
            final_viaje: travelData.final_viaje
        }, {
            headers: {
                auth: `${token}`
            }
        });

        if (response.status === 201) {
            return { success: true, message: '¡Viaje agregado correctamente!' };
        } else {
            throw new Error('Error al agregar el viaje.');
        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error al agregar el viaje.');
        }
    }
};

export default agregarViaje;
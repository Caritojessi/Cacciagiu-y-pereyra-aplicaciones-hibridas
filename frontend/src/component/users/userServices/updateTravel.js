import axios from 'axios';
import Cookies from 'js-cookie';

const updateTravel = async (id, travel) => {
    const token = Cookies.get('jwtoken');
    if (!token) {
        throw new Error('No se registró token de acceso');
    }

    return axios.put(
        `http://localhost:3000/viajes/modificar/${id}`,
        {
            nombre: travel.nombre,
            destino: travel.destino
        },
        {
            headers: {
                auth: `${token}`
            }
        }
    );
};

export { updateTravel }

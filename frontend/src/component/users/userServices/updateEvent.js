import axios from 'axios';
import Cookies from 'js-cookie';

const updateEvent = async (id, eventos) => {
    const token = Cookies.get('jwtoken');
    if (!token) {
        throw new Error('No se registró token de acceso');
    }

    const [year, month, day] = eventos.fecha.split('-');
    const [hour, minute] = eventos.horario.split(':');

    const fechaCompleta = new Date(Date.UTC(year, month - 1, day, hour, minute));

    return axios.put(
        `http://localhost:3000/viajes/eventos/${id}`,
        {
            eventos: {
                nombre: eventos.nombre,
                descripcion: eventos.descripcion,
                fecha: fechaCompleta.toISOString(),
                horario: eventos.horario
            }
        },
        {
            headers: {
                auth: `${token}`
            }
        }
    );
};

export { updateEvent }
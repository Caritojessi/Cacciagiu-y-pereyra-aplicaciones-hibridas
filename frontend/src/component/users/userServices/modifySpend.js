import axios from 'axios';
import Cookies from 'js-cookie';

const fetchGasto = async (idViaje, id) => {
    try {
        const token = Cookies.get('jwtoken');
        if (!token) {
            throw new Error('No se registró token de acceso');
        }

        const res = await axios.get(`http://localhost:3000/viajes/gastos/${idViaje}/${id}`, {
            headers: { auth: `${token}` }
        });

        if (res.status === 200) {
            return {
                nombre: res.data.nombre,
                valor: res.data.valor
            };
        } else {
            throw new Error('Error al obtener los datos del gasto');
        }
    } catch (error) {
        throw new Error('Error al obtener los datos del gasto');
    }
};

const handleSubmitGasto = async (idViaje, id, gasto) => {
    try {
        const token = Cookies.get('jwtoken');
        if (!token) {
            throw new Error('No se registró token de acceso');
        }

        const res = await axios.put(`http://localhost:3000/viajes/modificar-gasto/${idViaje}/${id}`, {
            nombre: gasto.nombre,
            valor: gasto.valor
        }, {
            headers: { auth: `${token}` }
        });

        if (res.status === 200) {
            return true;
        } else {
            throw new Error('Error al modificar el gasto');
        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error al modificar el gasto');
        }
    }
};

export { fetchGasto, handleSubmitGasto }
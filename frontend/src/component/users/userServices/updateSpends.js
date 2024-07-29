import axios from 'axios';
import Cookies from 'js-cookie';

const updateExpense = async (id, gastos) => {
    const token = Cookies.get('jwtoken');
    if (!token) {
        throw new Error('No se registró token de acceso');
    }

    return axios.put(
        `http://localhost:3000/viajes/gastos/${id}`,
        {
            nombre: gastos.nombre,
            valor: gastos.valor,
            fecha: gastos.fecha 
        },
        {
            headers: {
                auth: `${token}`
            }
        }
    );
};

export { updateExpense } 
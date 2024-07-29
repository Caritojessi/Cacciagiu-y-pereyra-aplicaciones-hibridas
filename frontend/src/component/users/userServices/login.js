import axios from 'axios';
import Cookies from 'js-cookie';

const handleLogin = async (userData) => {
    try {
        const res = await axios.post("http://localhost:3000/login", userData);
        Cookies.set('jwtoken', res.data.jwtoken, { expires: 1 });
        return res.data.usuario;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else if (error.request) {
            throw new Error("No se recibió respuesta del servidor.");
        } else {
            throw new Error("Error al configurar la solicitud.");
        }
    }
};

export default handleLogin;
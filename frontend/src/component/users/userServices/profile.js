import axios from 'axios';
import Cookies from 'js-cookie';

const updateUser = async (userId, formData) => {
    const token = Cookies.get('jwtoken');
    return axios.put(`http://localhost:3000/users/${userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'auth': `${token}`
        }
    });
};

const deleteUser = async (userId) => {
    const token = Cookies.get('jwtoken');
    return axios.delete(`http://localhost:3000/users/eliminar/${userId}`, {
        headers: { auth: `${token}` }
    });
};

export { updateUser, deleteUser }
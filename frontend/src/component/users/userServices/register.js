import axios from 'axios';

const registerUser = async (userData) => {
    return axios.post(`http://localhost:3000/users/register`, userData);
};

export default registerUser;
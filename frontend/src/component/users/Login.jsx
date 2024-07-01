import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; 
import '../../utils/form.css';
import ModalErrores from '../modal/ModalErrores'

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/login", userData)
      .then((res) => {
        setUser(res.data.usuario); // Actualizar el estado de autenticación
        Cookies.set('jwtoken', res.data.jwtoken, { expires: 1 });
        navigate('/inicio');
      }) 
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("No se recibió respuesta del servidor.");
        } else {
          setError("Error al configurar la solicitud.");
        }
      });
  };

  const goToRegister = (e) => {
    e.preventDefault();
    navigate('/registro');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const closeModal = () => {
    setError('');
  };

  return (
    <div className="contenedor text-slate-900">
      <div className="formulario">
        <div className="form-container sign-in">
          <form onSubmit={handleLogin} id="form-basic">
            <div className="text-center">
              <h1 className="mb-4 mt-1 pb-1 text-2xl font-semibold">
                Agenda VIAJERA
              </h1>
            </div>
            <p className="mb-4 text-xl hidden md:block">Por favor inicia sesión en tu cuenta</p>
            <div className="form-group">
              <label htmlFor="email" className="visually-hidden">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-none s"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="visually-hidden">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-none"
              />
            </div>
            <div className="form-group">
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-purple-800"
                type="submit"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
        <div className="toggle-container hidden md:block">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h2>¡Hola, viajero!</h2>
              <p>Registrate con tus datos personales para utilizar todas las funciones del sitio</p>
              <button
                className="btn-register inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                onClick={goToRegister}
              >
                Registrarte
              </button>
            </div>
          </div>
        </div>
        <div className='md:hidden text-center mt-4'>
          <p>¿No tienes cuenta?</p>
          <p className='text-pink-500 underline cursor-pointer' onClick={goToRegister}>
            Regístrate
          </p>
        </div>
      </div>
      <ModalErrores message={error} onClose={closeModal} />
    </div>
  );
}

export default Login;

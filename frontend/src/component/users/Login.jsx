import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../utils/form.css';
import ModalErrores from '../modal/ModalDelete';
import handleLogin from './userServices/login';

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await handleLogin(userData);
      setUser(user);
      navigate('/inicio');
    } catch (error) {
        setError(error.message);
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    navigate('/registro');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const closeModal = () => {
    setError('');
  };

  return (
    <div className="contenedor text-slate-900">
      <div className="formulario">
        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit} id="form-basic">
            <div className="text-center">
              <h1 className="mb-4 mt-10 pb-1 text-2xl text-purple-900 font-semibold">
                Agenda VIAJERA
              </h1>
            </div>
            <p className="mb-4 text-xl text-purple-800 hidden md:block">Iniciar sesión</p>
            <div className="form-group">
              <label htmlFor="email" className="block text-left mb-1">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-violet-300 border-none"
              />
            </div>
            <div className="form-group relative">
              <label htmlFor="password" className="block text-left mb-1">Contraseña:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-violet-300 border-none pr-10"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-900 mt-3'
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
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
              <p>Regístrate con tus datos personales para utilizar todas las funciones del sitio</p>
              <button
                className="btn-register inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                onClick={goToRegister}
              >
                Regístrate
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
};

export default Login;

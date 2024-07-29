import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalErrores from '../modal/ModalDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import registerUser from './userServices/register';

const Register = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!userData.nombre || !userData.email || !userData.password || !userData.confirmPassword) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (!validateEmail(userData.email)) {
            setError('El correo electrónico no es válido');
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            await registerUser(userData);
            navigate('/inicio');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al registrar el usuario';
            setError(errorMessage);
        }
    };

    const goToLogin = () => {
        navigate('/login');
    };

    const closeModal = () => {
        setError('');
    };

    return (
        <div className='contenedor'>
            <div className='formulario text-slate-950'>
                <div className="form-container sign-in">
                    <form id='form-basic' onSubmit={handleRegister}>
                        <div className="text-center">
                            <h1 className="mb-4 mt-10 pb-1 text-2xl font-semibold text-purple-900">Crear mi cuenta</h1>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='nombre' className='block text-left mb-2'>Nombre:</label>
                            <input
                                id='nombre'
                                className='w-full rounded-lg border-none text-slate-900 bg-violet-300'
                                type="text"
                                value={userData.nombre}
                                onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email' className='block text-left mb-2'>Correo electrónico:</label>
                            <input
                                id='email'
                                className='w-full rounded-lg border-none text-slate-900 bg-violet-300'
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className='form-group relative'>
                            <label htmlFor='password' className='block text-left mb-2'>Contraseña:</label>
                            <input
                                id='password'
                                className='w-full rounded-lg border-none text-slate-900 bg-violet-300'
                                type={showPassword ? "text" : "password"}
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                required
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3 text-slate-900'
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            />
                        </div>
                        <div className='form-group relative'>
                            <label htmlFor='confirmPassword' className='block text-left mb-2'>Confirmar contraseña:</label>
                            <input
                                id='confirmPassword'
                                className='w-full rounded-lg border-none text-slate-900 bg-violet-300'
                                type={showConfirmPassword ? "text" : "password"}
                                value={userData.confirmPassword}
                                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                                required
                            />
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? faEye : faEyeSlash}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3 text-slate-900'
                                aria-label={showConfirmPassword ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'}
                            />
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="form-group">
                            <button type="submit" className='w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300'>
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
                <div className="toggle-container hidden md:block">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h2>¡Hola, viajero!</h2>
                            <p>¡Si ya tienes una cuenta en nuestra aplicación ingresa con tus datos de usuario!</p>
                            <button
                                className="btn-register inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 mb-20"
                                onClick={goToLogin}
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>
                <div className='md:hidden text-center mt-4'>
                    <p>¿Ya tienes cuenta?</p>
                    <p className='text-pink-500 underline cursor-pointer' onClick={goToLogin}>
                        Iniciar sesión
                    </p>
                </div>
            </div>
            <ModalErrores message={error} onClose={closeModal} />
        </div>
    );
}

export default Register;

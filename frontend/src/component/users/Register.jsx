import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../utils/form.css'
import ModalErrores from '../modal/ModalErrores';


const Register = () => {

    const [userData, setUserData] = useState({
        nombre: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/users/register", userData)
            .then((res) => {
                // console.log(res);
                navigate('/inicio')
            })
            .catch((error) => {
                // console.log(error);
                setError(error.response?.data || error.message);
            });
    }

    const goToLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    const closeModal = () => {
        setError('');
    };

    return (
        <div className='contenedor'>
            <div className='formulario text-slate-950'>
                <div className="form-container sign-in">
                    <form id='form-basic'>
                        <div className="text-center">
                            <h1 className="mb-4 mt-1 pb-1 text-2xl font-semibold">Ingresa tus datos para crear una cuenta</h1>
                        </div>

                        <div className='form-group'>
                            <label className='visually-hidden'>Nombre:</label>
                            <input
                                className='w-full rounded-lg border-none text-slate-900'
                                type="text"
                                value={userData.nombre}
                                onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                            />
                        </div>
                        <div className='form-group'>
                            <label className='visually-hidden'>Correo electrónico:</label>
                            <input
                                className='w-full rounded-lg border-none text-slate-900'
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </div>
                        <div className='form-group'>
                            <label className='visually-hidden'>Contraseña:</label>
                            <input
                                className='w-full rounded-lg border-none text-slate-900'
                                type="password"
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <button onClick={handleRegister}>Registrarse</button>
                        </div>
                    </form>
                    {/* {error && <p>{error}</p>} */}
                </div>
                <div className="toggle-container hidden md:block">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h2>¡Hola, viajero!</h2>
                            <p>¡Si ya tienes una cuenta en nuestra aplicación ingresa con tus datos de usuario!</p>
                            <button
                                className="btn-register inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
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

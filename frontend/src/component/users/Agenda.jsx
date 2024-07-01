import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMoneyBill, faThumbsUp, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import backgroundImageRight from '../../assets/parte.png'; // Importa la primera imagen
import backgroundImageLeft from '../../assets/parte-copia.png'; // Importa la segunda imagen

const Agenda = () => {
    const [loading, setLoading] = useState(false);
    const { auth, user, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:3000/users", { headers: { 'auth': auth } })
            .then((res) => {
                // console.log(res.data);
                setTimeout(() => {
                    setLoading(false);
                    // setUsers(res.data)
                }, 2000);
            })
            .catch((error) => {
                setLoading(false);
                // console.log(error);
            //     if(error?.data.error.message === "jwt expired") {
            //         alert("token expirado")
            //         logoutUser()
            //         Navigate('/login')
            //     }
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="hero-section bg-violet-900 text-white py-20 mt-8 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl font-bold mb-4">Bienvenido {user?.nombre}</h1>
                    <h2 className="text-4xl font-bold mb-4"> a Agenda VIAJERA</h2>
                    <p className="text-lg mb-8">Tu compañero perfecto para planificar y disfrutar de tus viajes</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center">
                        <Link to={`/viajes/nuevo-viaje`} className="bg-purple-600 my-2 sm:mx-2 hover:bg-purple-400 hover:text-purple-950 text-white font-bold py-2 px-4 rounded-md">
                            Comienza tu nuevo viaje
                        </Link>
                        <Link to={`/viajes/${user?._id}`} className="bg-purple-600 my-2 sm:mx-2 hover:bg-purple-400 hover:text-purple-950 text-white font-bold py-2 px-4 rounded-md">
                            Ver tus viajes
                        </Link>
                    </div>
                </div>
                <img src={backgroundImageRight} alt="background" className="hidden md:block absolute right-0 top-0 h-full w-auto object-cover opacity-50" />
                <img src={backgroundImageLeft} alt="background" className="hidden md:block absolute left-0 top-0 h-full w-auto object-cover opacity-50" />
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-purple-800">Características de Agenda VIAJERA</h2>
                    <p className="text-gray-600">Descubre todo lo que puedes hacer con nuestra herramienta</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FontAwesomeIcon icon={faHome} className="text-purple-800 h-12 w-12 mb-4" />
                        <h3 className="text-xl text-purple-950 font-bold mb-2">Inicio</h3>
                        <p className="text-gray-600">Accede a tu panel de control viajero y visualiza toda su información de viajes.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FontAwesomeIcon icon={faMoneyBill} className="text-purple-800 h-12 w-12 mb-4" />
                        <h3 className="text-xl text-purple-950 font-bold mb-2">Gastos</h3>
                        <p className="text-gray-600">Registra y controla siempre todos sus gastos de viaje fácilmente.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FontAwesomeIcon icon={faThumbsUp} className="text-purple-800 h-12 w-12 mb-4" />
                        <h3 className="text-xl text-purple-950 font-bold mb-2">Recomendaciones</h3>
                        <p className="text-gray-600">Encuentra actividades recomendadas y lugares para visitar.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <FontAwesomeIcon icon={faSuitcase} className="text-purple-800 h-12 w-12 mb-4" />
                        <h3 className="text-xl text-purple-950 font-bold mb-2">Nuevo Viaje</h3>
                        <p className="text-gray-600">Planifica sus próximos viajes teniendo nuestras recomendaciones con facilidad.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agenda;

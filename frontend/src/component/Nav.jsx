import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faSuitcase, faEnvelope, faSignOutAlt, faQuestionCircle, faShieldAlt, faSignInAlt, faUserPlus, faBars, faTimes, faL } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import NavItem from './NavItem';
import faviconImage from '../assets/favicon.png';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logoutUser } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect (() => {

        if ( user?.rol === 'admin') {
            setIsAdmin(true);
        }

    })
        
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <nav className="bg-purple-800 text-white w-full fixed top-0 left-0 z-50">
                <ul>
                    {user ? (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between items-center h-16">
                                <Link to="/" className="flex items-center space-x-2 text-white hover:text-white font-bold">
                                        <img src={faviconImage} alt="Favicon" className="h-10 w-10" />
                                        <span className="text-lg font-bold">Agenda VIAJERA</span>
                                    </Link>
                                    <div className="flex items-center md:hidden">
                                        <button onClick={toggleMenu} className="text-white focus:outline-none bg-purple-900">
                                            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <div className="hidden md:flex space-x-4 items-center">
                                        <NavItem to="/inicio" icon={faHome}>Inicio</NavItem>
                                        <NavItem to="/actividades/recomendaciones" icon={faHeart}>Recomendaciones</NavItem>
                                        <NavItem to="/viajes/nuevo-viaje" icon={faSuitcase}>Nuevo Viaje</NavItem>
                                        {
                                            isAdmin ? <NavItem to="/admin" icon={faEnvelope}>Admin</NavItem> : 
                                            <NavItem to="/contacto" icon={faEnvelope}>Contacto</NavItem>

                                        }
                                        <NavItem to="/perfil" icon={faHeart}>Mi perfil</NavItem>
                                        <NavItem onClick={logoutUser} to="/login" icon={faSignOutAlt}>Cerrar Sesión</NavItem>
                                    </div>
                                </div>
                            </div>

                            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-purple-800`}>
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    <NavItem to="/inicio" icon={faHome}>Inicio</NavItem>
                                    <NavItem to="/actividades/recomendaciones" icon={faHeart}>Recomendaciones</NavItem>
                                    <NavItem to="/viajes/nuevo-viaje" icon={faSuitcase}>Nuevo Viaje</NavItem>
                                    <NavItem to="/contacto" icon={faEnvelope}>Contacto</NavItem>
                                    <NavItem to="/perfil" icon={faHeart}>Mi perfil</NavItem>

                                    <NavItem onClick={logoutUser} to="/login" icon={faSignOutAlt}>Cerrar Sesión</NavItem>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between items-center h-16">
                                <Link to="/" className="flex items-center space-x-2 text-white hover:text-white font-bold">
                                        <img src={faviconImage} alt="Favicon" className="h-10 w-10" />
                                        <span className="text-lg font-bold">Agenda VIAJERA</span>
                                    </Link>
                                    <div className="flex items-center md:hidden">
                                        <button onClick={toggleMenu} className="text-white focus:outline-none bg-purple-950 ">
                                            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-7" />
                                        </button>
                                    </div>
                                    <div className="hidden md:flex space-x-4 items-center">
                                        <NavItem to="/" icon={faHome}>Inicio</NavItem>
                                        <NavItem to="/contacto" icon={faEnvelope}>Contacto</NavItem>
                                        <NavItem to="/funcionamiento" icon={faQuestionCircle}>¿Cómo funciona?</NavItem>
                                        <NavItem to="/seguridad" icon={faShieldAlt}>Seguridad</NavItem>
                                        <NavItem to="/descargar" icon={faSuitcase}>Descarga la App</NavItem>
                                        <NavItem to="/login" icon={faSignInAlt}>Login</NavItem>
                                        <NavItem to="/registro" icon={faUserPlus} className="bg-purple-500 text-lg font-bold shadow-lg hover:bg-purple-600">Registro</NavItem>
                                    </div>
                                </div>
                            </div>

                            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-purple-800`}>
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    <NavItem to="/" icon={faHome}>Inicio</NavItem>
                                    <NavItem to="/contacto" icon={faEnvelope}>Contacto</NavItem>
                                    <NavItem to="/funcionamiento" icon={faQuestionCircle}>¿Cómo funciona?</NavItem>
                                    <NavItem to="/login" icon={faSignInAlt}>Login</NavItem>
                                    <NavItem to="/registro" icon={faUserPlus} className="bg-purple-500 text-lg font-bold shadow-lg hover:bg-purple-600">Registro</NavItem>
                                </div>
                            </div>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Nav;
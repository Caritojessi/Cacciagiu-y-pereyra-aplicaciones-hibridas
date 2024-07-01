import React from 'react';
import Logo from '../assets/icoo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-purple-800 mt-8 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <img src={Logo} alt="Ilustración" className="h-12 md:h-16 lg:h-20 rounded-lg" />
                        <p className="text-sm ml-2">
                            © 2024 Agenda VIAJERA. 
                        </p>
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=NUMERO_DE_TELEFONO" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300">
                            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                        </a>
                    </div>
                </div>
                <div className="mt-4 border-t border-purple-700 pt-4 text-center md:text-left">
                    <p className="text-xs text-gray-400">
                        Encuéntranos también en nuestras redes sociales para más actualizaciones y contenido exclusivo.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

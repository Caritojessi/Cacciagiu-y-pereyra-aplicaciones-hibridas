import React from 'react';

const Descargar = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <img src="https://www.transparenttextures.com/patterns/diamond-upholstery.png" alt="Textura de fondo" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col md:flex-row">
                <div className="p-6 md:p-8 order-1 md:order-2 flex-1">
                   
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">Descargar la Aplicación</h1>
                  
                    <p className="text-lg text-gray-700 mb-6">Organiza tus viajes de manera fácil y sencillo. <strong>Agenda VIAJERA</strong> ofrece la ayuda para mantener sus planes organizados y poder disfrutar cada momento del viaje.</p>
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
                        <a href="#" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300">Descargar para iOS</a>
                        <a href="#" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300">Descargar para Android</a>
                    </div>
                </div>
                <div className="md:flex-shrink-0  items-center justify-center bg-gray-100 order-2 md:order-1 hidden md:block">
                    <img className="h-64 w-full object-cover md:w-64 p-4" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://example.com" alt="Código QR" />
                </div>
            </div>
        </div>
    );
};

export default Descargar;

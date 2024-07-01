import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Principio from '../../assets/ilustraciones/agenda.png';
import Pasaporte from '../../assets/ilustraciones/pasaporte.png';
import VideoDescubre from '../../assets/ilustraciones/video.mp4';
import Video from '../../assets/ilustraciones/chat.mp4';
import { FaHome } from 'react-icons/fa';

const Funcionamiento = () => {
    const Section = ({ children, delay = 0 }) => {
        const { ref, inView } = useInView({ triggerOnce: true });

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay }}
                className="mt-8 md:flex md:items-center"
            >
                {children}
            </motion.div>
        );
    };

    return (
        <>
            <style jsx global>{`
                body {
                    background-color: white;
                }
            `}</style>
            <div className="bg-gradient-to-r via-purple-100 to-pink-100 min-h-screen p-4 bg-white">
                <Section>
                    <div className="md:w-2/3 flex justify-center mb-8 md:mb-0">
                        <img src={Principio} alt="Ilustración" className="max-w-full h-auto md:w-full lg:w-3/4 rounded-lg" />
                    </div>
                    <div className="md:w-1/3 flex flex-col justify-center px-4 text-left">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-purple-800">
                            Planificación de viajes simplificada al máximo
                        </h1>
                        <p className="text-lg md:text-xl mb-4 text-gray-700">
                            Descubra lo rápido que <strong className='text-purple-900'>Agenda VIAJERA</strong> puede dar sentido a sus planes y crear sencillamente un único itinerario para cada <em>viaje</em>.
                        </p>
                    </div>
                </Section>

                <Section delay={0.2}>
                    <div className="md:w-1/2 flex flex-col justify-center px-4 text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-800">Paso 1: Iniciar sesión</h2>
                        <p className="text-lg md:text-xl mb-4 text-gray-700">Para acceder a todas las funcionalidades de <strong className='text-purple-900'>Agenda VIAJERA</strong>, primero debe iniciar sesión en la aplicación. Una vez que haya ingresado sus credenciales, podrá:</p>
                        <ul className="list-none text-slate-800">
                            <li className="flex items-center mb-2">
                                <FaHome className="text-purple-800 mr-2" />
                                Ver recomendaciones personalizadas para actividades y destinos.
                            </li>
                            <li className="flex items-center mb-2">
                                <FaHome className="text-purple-800 mr-2" />
                                Agregar y mantener un registro detallado para un control financiero.
                            </li>
                            <li className="flex items-center mb-2">
                                <FaHome className="text-purple-800 mr-2" />
                                Planificar y agregar actividades a su itinerario de viaje.
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                        <img src={Pasaporte} alt="Imagen" className="max-w-full h-auto md:w-3/4 lg:w-1/2 rounded-lg" />
                    </div>
                </Section>

                <Section delay={0.2}>
                    <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                        <video autoPlay loop className="max-w-full h-auto md:w-3/4 lg:w-1/2 rounded-lg" muted>
                            <source src={Video} type="video/mp4" />
                            Su navegador no soporta el elemento de video.
                        </video>
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center px-4 text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-800">Paso 2: Obtenga un itinerario completo</h2>
                        <p className="text-lg md:text-xl mb-4 text-gray-700">Accede a la información de su viaje sobre la marcha, cuando más la necesite. Podes cargar fácilmente planes a su calendario.</p>
                    </div>
                </Section>

                <Section delay={0.4}>
                    <div className="md:w-1/2 flex justify-center md:order-2 mb-8 md:mb-0">
                        <video autoPlay loop className="max-w-full h-auto md:w-3/4 lg:w-1/2 rounded-lg" muted>
                            <source src={VideoDescubre} type="video/mp4" />
                            Su navegador no soporta el elemento de video.
                        </video>
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center md:order-1 px-4 text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-800">Paso 3: Descargue la aplicación</h2>
                        <p className="text-lg md:text-xl mb-4 text-gray-700"> 
                            Si quiere tener todos sus planes del viaje en su mano, en su muñeca o en su escritorio, <strong className='text-purple-900'>Agenda VIAJERA</strong> está disponible en todo momento.
                        </p>
                    </div>
                </Section>

                <Section delay={0.4}>
               
                <section className="bg-purple-50 p-8 rounded-lg shadow-lg text-center">
    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-purple-700">Descargue la aplicación Agenda VIAJERA</h2>
    <div className="md:flex md:justify-center md:space-x-8">
        <div className="md:w-1/2 md:text-left">
            <p className="text-lg md:text-md mb-4 text-gray-800">
                ¿Por qué debería descargar <strong className=' text-purple-900'>Agenda VIAJERA</strong>? </p>
                <p  className="text-lg md:text-md mb-4 text-gray-800">Porque simplifica la gestión de su <em>viaje</em> como ninguna otra aplicación. Nuestra herramienta, puede planificar todas sus <em>actividades</em> y llevar perfectamente un registro de sus gastos</p>
                
        </div>
      
    </div>
    <a href="/descargar" className="text-purple-600 font-bold underline mb-4 hover:text-purple-800">Descargue la aplicación ahora</a>
</section>

            </Section>
            </div>
        </>
    );
};

export default Funcionamiento;

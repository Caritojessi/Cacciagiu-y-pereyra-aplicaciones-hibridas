import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import fondoImg from '../assets/fondo.png'; 
import Notificaciones from '../assets/ilustraciones/notificaciones.png'; 
import Planificacion from '../assets/ilustraciones/planificacion.png'; 
import ilustracionImg from '../assets/ilustracion.png'; 

const Home = () => {

    const Section = ({ children, delay = 0 }) => {
        const { ref, inView } = useInView({ triggerOnce: true });

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay }}
                className="mt-8 md:flex md:items-center"
            >
                {children}
            </motion.div>
        );
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="bg-cover bg-center min-h-screen text-violet-800 flex items-center" style={{ backgroundImage: `url(${fondoImg})` }}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-end">
                    <motion.div 
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-3xl md:text-5xl text-left font-bold mb-4">Viajar nunca fue tan fácil con Agenda VIAJERA</h1>

                        <p className="text-lg  text-left ">Podes imaginar tener toda la información de tu viaje en un solo lugar mientras recibis notificaciones a medida que tu viaje avanza.</p>
                        <p className="text-lg  text-left "> Con <strong>Agenda VIAJERA</strong>, podes agregar actividades y llevar un control de <em>gastos</em> fácilmente. Podes simplificar tu experiencia de <em>viaje</em> y podes descubrir por qué millones de viajeros ya no se pueden imaginar su vida sin ella.</p>
                    </motion.div>
                </div>
            </div>

            {/* Sections */}
            <Section className="flex flex-col md:flex-row items-center justify-between mb-12">
                <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                    <img src={Planificacion} alt="Ilustracion de mujer pensando" className="max-w-full h-auto md:w-3/4 lg:w-1/2 rounded-lg " />
                </div>
                <div className="md:w-1/2 flex flex-col text-left">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-purple-700">Registro de tus gastos</h2>
                    <p className=" md:text-lg mb-4 text-gray-800">Con <strong className=' text-purple-900'>Agenda VIAJERA</strong>, lleva un registro detallado de tus gastos durante el viaje, asignando el costo a cada tipo de gasto para un mejor control financiero. Además, la aplicación te recomendienda <em>ciudades</em> o <em>actividades</em> adicionales según tus intereses y preferencias.</p>
                    <a href="/funcionamiento" className="text-purple-500 font-bold underline mb-4 hover:text-purpl-600">Mira cómo funciona</a>
                    <p className="italic mb-2 text-gray-600">"Paso 100 días al año viajando y <strong>Agenda VIAJERA</strong> es mi aplicación móvil de referencia favorita. En manos de un viajero es una herramienta muy poderosa. Es la mejor que probé".</p>
                    <p className="text-sm text-gray-700">- Ludmila M.</p>
                </div>
            </Section>

            <Section delay={0.1}>
                <div className="md:w-1/2 flex flex-col text-left">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-purple-700">Recordatorios y alertas útiles</h2>
                    <p className="text-lg md:text-lg mb-4 text-gray-800">Repleta de funciones que te ayudarán con los cambios y a sacar el máximo partido a todos tus viajes, esta aplicación de <strong className=' text-purple-900'>Agenda VIAJERA</strong> te avisa sobre las <em>actividades</em> que tengas pendientes, tanto un día antes como unas horas antes de cada <em>actividad</em>, asegurando que no se pierdas nada importante durante tu viaje.</p>
                    <a href="/registro" className="text-purple-500 font-bold underline mb-4 hover:text-purple-600">Crear mi cuenta</a>
                    <p className="italic mb-2 text-gray-600">"Me encanta saber exactamente cuándo son mis <em>actividades</em> y tener el recordatorio a cada momento para saber dónde y cúando tengo que estar".</p>
                    <p className="text-sm text-gray-700">- Micaela P.</p>
                </div>
                <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                    <img src={Notificaciones} alt="Celular con notificaciones" className="max-w-full h-auto md:w-3/4 lg:w-1/2 rounded-lg" />
                </div>
            </Section>

            <Section delay={0.1}>
                <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                    <img src={ilustracionImg} alt="Ilustración de mujer con una valija" className="max-w-full h-auto md:w-3/4 lg:w-1/2 rounded-lg" />
                </div>
                <div className="md:w-1/2 flex flex-col text-left">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-purple-700">Conocer qué hacer y dónde ir</h2>
                    <p className="text-lg md:text-lg mb-4 text-gray-800">¿Buscas recomendaciones sobre qué hacer en cada <em>ciudad</em>? ¿No está seguro/a de dónde comer o qué <em>actividades</em> realizar? Esta aplicación tiene todo lo que necesitas para aprovechar al máximo tu <em>viaje</em>.</p>
                    <a href="/inicio" className="text-purple-500 font-bold underline mb-4 hover:text-purple-600">Ingresar a mi cuenta</a>
                    <p className="italic mb-2 text-gray-600">"Mi aplicación de <em>viajes</em> favorita hasta la fecha es <strong>Agenda VIAJERA</strong>.</p>
                    <p className="italic mb-2 text-gray-600"> Con todas las recomendaciones de <em>ciudades</em> y <em>actividades</em>, mi auténtica salvación cuando quiero saber:</p>
                    <p className="italic text-gray-600 mb-2">¿Qué puedo hacer aquí?</p>
                    <p className="italic  text-gray-600 mb-2">¿Cuál es el siguiente lugar que debo visitar?</p>
                    <p className="text-sm text-gray-700">- Alejandro C.</p>
                </div>
            </Section>


            <Section delay={0.1}>
                <section className="bg-purple-50 p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-purple-700">Descarga Agenda VIAJERA</h2>
                    <div className="md:flex md:justify-center md:space-x-8">
                        <div className="md:w-1/2 md:text-left">
                            <p className="text-lg md:text-md mb-4 text-gray-800">
                                ¿Por qué descargar <strong className=' text-purple-900'>Agenda VIAJERA</strong>? </p>
                                <p  className="text-lg md:text-md mb-4 text-gray-800">Porque simplifica la gestión de tu <em>viaje</em> como ninguna otra aplicación. Nuestra herramienta, puede planificar todas tus <em>actividades</em> y llevar perfectamente un registro de tus gastos</p>
                                
                        </div>
                    
                    </div>
                    <a href="/descargar" className="text-purple-600 font-bold underline mb-4 hover:text-purple-800">Descarga la aplicación ahora</a>
                </section>
            </Section>
        </div>
    );
};

export default Home;

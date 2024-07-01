import React from 'react';
import Seguridad from '../../assets/ilustraciones/seguridad.png';
import Fisica from '../../assets/ilustraciones/fisica.png';
import Info from '../../assets/ilustraciones/see.png';
import Seguro from '../../assets/ilustraciones/seguro.png';

const SecurityInfo = () => {
    return (
        <div className="  min-h-screen py-10 px-4 lg:px-10 text-gray-800">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SecurityCard
                        image={Seguro}
                        title="Seguridad física"
                        description={[
                            "Todos los datos se almacenan en centros de datos altamente seguros que se someten a múltiples .",
                            "No se almacenan datos de clientes en ninguna de nuestras oficinas, ni en ninguna estación de trabajo de la empresa logrando una alta seguridad."
                        ]}
                    />

                    <SecurityCard
                        image={Info}
                        title="Seguridad del servicio"
                        description={[
                            "Empleamos varias funciones a nivel de servicio para mantener Agenda VIAJERA segura y garantizar su disponibilidad.",
                            "Registro automático de eventos importantes, alertas activadas por eventos de registro importantes, y protección para los datos de registro contra acceso no autorizado."
                        ]}
                    />

                    <SecurityCard
                        image={Fisica}
                        title="Seguridad móvil"
                        description={[
                            "Su información personal confidencial está cifrada con seguridad solamente en su dispositivo móvil.",
                            "El acceso a su información personal confidencial está restringido mediante contraseña."
                        ]}
                    />

                    <SecurityCard
                        image={Seguro}
                        title="Seguridad del software"
                        description={[
                            "Empleamos un ciclo de vida de desarrollo de software estructurado (SDLC) al crear, realizar cambios y mejoras.",
                            "Revisiones de código, capacitación en técnicas de escritura segura y pruebas de seguridad por un equipo dedicado."
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

const SecurityCard = ({ image, title, description }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
                <img src={image} alt={title} className="h-12 mr-4" />
                <h2 className="text-3xl font-bold text-purple-700">{title}</h2>
            </div>
            <div className="text-lg">
                {description.map((line, index) => (
                    <p key={index} className="mb-4">{line}</p>
                ))}
            </div>
        </div>
    );
};

export default SecurityInfo;

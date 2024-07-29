import React from 'react';
import Fisica from '../../assets/ilustraciones/fisica.png';
import Info from '../../assets/ilustraciones/see.png';
import Seguro from '../../assets/ilustraciones/seguro.png';

const SecurityInfo = () => {
    return (
        <div className="min-h-screen py-10 px-4 lg:px-10 text-gray-800">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SecurityCard
                        image={Seguro}
                        title="Seguridad física"
                        description={[
                            "Todos los datos se almacenan en centros de datos altamente seguros que se someten a múltiples medidas de seguridad.",
                            "No se almacenan datos de clientes en ninguna de nuestras oficinas ni estaciones de trabajo, lo que garantiza una alta seguridad."
                        ]}
                    />

                    <SecurityCard
                        image={Info}
                        title="Seguridad del servicio"
                        description={[
                            "Empleamos funciones avanzadas para mantener Agenda VIAJERA segura y disponible.",
                            "Registro automático de eventos importantes y protección contra accesos no autorizados a los datos de registro."
                        ]}
                    />

                    <SecurityCard
                        image={Fisica}
                        title="Seguridad móvil"
                        description={[
                            "La información personal confidencial está cifrada y protegida solo en tu dispositivo móvil.",
                            "El acceso a la información está restringido mediante seguridad basada en contraseña."
                        ]}
                    />

                    <SecurityCard
                        image={Seguro}
                        title="Seguridad del software"
                        description={[
                            "Seguimos un ciclo de vida de desarrollo de software seguro (SDLC) para garantizar la integridad y seguridad del software.",
                            "Revisión de código, capacitación en técnicas de escritura segura y pruebas de seguridad realizadas por un equipo especializado."
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

const SecurityCard = ({ image, title, description }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <div className="flex items-center mb-6">
                <img src={image} alt={`Ilustración ${title}`} className="h-12 mr-4" />
                <h2 className="text-3xl text-left font-bold text-purple-700">{title}</h2>
            </div>
            <div className="text-lg text-left">
                {description.map((line, index) => (
                    <p key={index} className="mb-4">{line}</p>
                ))}
            </div>
        </div>
    );
};

export default SecurityInfo;

import React, { useState } from 'react';

const Contacto = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const questions = [
        {
            question: '¿Cuál es el número de teléfono de atención al cliente?',
            answer: 'Puedes contactar con nuestro equipo de atención al cliente llamando al +1135548324.',
        },
        {
            question: '¿Cuál es la dirección de correo electrónico para consultas?',
            answer: 'Para consultas generales, puedes enviar un correo electrónico a info@empresa.com.',
        },
        {
            question: '¿Cómo puedo enviar sugerencias o comentarios?',
            answer: 'Si tienes sugerencias o comentarios, puedes enviarnos un mensaje a través del formulario de contacto en nuestro sitio web.',
        },
        {
            question: '¿Ofrecen soporte en otros idiomas?',
            answer: 'Sí, nuestro equipo de atención al cliente puede proporcionar soporte en varios idiomas. Por favor, indícanos tu preferencia cuando nos contactes.',
        },
    ];

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-full h-full text-purple-800 text-start">
            <h1 className="text-center text-4xl font-bold mb-8 text-purple-700">Dudas & Contacto</h1>
            {/* Acordeón de preguntas frecuentes */}
            {questions.map((question, index) => (
                <div key={index} className="mb-4  border rounded-md overflow-hidden shadow-lg">
                    <button
                        className="w-full text-left py-3 px-4 bg-purple-100  hover:bg-purple-200 focus:outline-none transition-colors duration-300 flex items-center"
                        onClick={() => toggleAccordion(index)}
                    >
                        <span className="font-semibold text-purple-700">{question.question}</span>
                        <svg
                            className={`w-6 h-6 ml-auto transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {activeIndex === index && (
                        <div className="px-4 py-2 bg-purple-50 text-slate-800 w-full">
                            <p>{question.answer}</p>
                        </div>
                    )}
                </div>
            ))}

            {/* Formulario */}
            <h2 className="text-center text-4xl mt-12 font-bold mb-6 text-purple-700">Formulario de Contacto</h2>
            <form onSubmit={handleSubmit} className="mb-4 space-y-4 max-w-md mx-auto">
                <div className="relative">
                    <label htmlFor="nombre" className="block mb-2 font-semibold text-lg text-purple-700">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-violet-300 px-3 py-2 border border-purple-200 rounded-md text-violet-950 font-semibold shadow-inner focus:ring-2 focus:ring-purple-500 transition-colors duration-300" />
                </div>
                <div className="relative">
                    <label htmlFor="email" className="block mb-2 font-semibold text-lg text-purple-700">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-violet-300 px-3 py-2 border border-purple-200 rounded-md text-violet-950 font-semibold shadow-inner focus:ring-2 focus:ring-purple-500 transition-colors duration-300" />
                </div>
                <div className="relative">
                    <label htmlFor="telefono" className="block mb-2 font-semibold text-lg text-purple-700">Teléfono:</label>
                    <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-violet-300 px-3 py-2 border border-purple-200 rounded-md text-violet-950 font-semibold shadow-inner focus:ring-2 focus:ring-purple-500 transition-colors duration-300" />
                </div>
                <div className="relative">
                    <label htmlFor="mensaje" className="block mb-2 font-semibold text-lg text-purple-700">Mensaje:</label>
                    <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} className="w-full bg-violet-300 px-3 py-2 border border-purple-200 rounded-md text-violet-950 font-semibold shadow-inner focus:ring-2 focus:ring-purple-500 transition-colors duration-300" rows="4" />
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-purple-600 hover:bg-purple-800 text-white w-1/2 mt-2 mb-4 py-2 px-4 rounded-md text-lg transition-colors duration-300 shadow-md">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default Contacto;

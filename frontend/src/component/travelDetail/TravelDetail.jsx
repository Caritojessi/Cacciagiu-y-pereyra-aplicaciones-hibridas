import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import './calendar.css';
import DeleteModal from '../modal/DeleteModal'; // Importar el componente DeleteModal
import Modal from '../modal/Modal';

const TravelDetail = () => {
    const { id } = useParams();
    const [travel, setTravel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la modal
    const [deleteAction, setDeleteAction] = useState(null); // Estado para almacenar la acción de borrado
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchTravel = async () => {
            try {
                const token = Cookies.get('jwtoken');
                if (!token) {
                    throw new Error('No se registró token de acceso');
                }
                const response = await axios.get(`http://localhost:3000/viajes/detalle/${id}`, {
                    headers: { auth: `${token}` }
                });
                setTravel(response.data);
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                if (error.response) {
                    setError(error.response.data.message);
                } else if (error.request) {
                    setError('No se recibió respuesta del servidor');
                } else {
                    setError('Error al configurar la solicitud');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTravel();
    }, [id]);

    const deleteTravel = async () => {
        try {
            const token = Cookies.get('jwtoken');

            if (!token) {
                throw new Error('No se registró token de acceso');
            }

            const res = await axios.delete(`http://localhost:3000/viajes/eliminar/${id}`, {
                headers: { auth: `${token}` }
            });
            if (res.status === 201) {
                navigate('/inicio');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Error al eliminar el viaje.');
            }
        }
    };

    const calcularTotalGastos = () => {
        let total = 0;
        travel.gastos.forEach(gasto => {
            total += parseFloat(gasto.valor);
        });
        return total.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    };
    

    const goToEdit = (e) => {
        e.preventDefault();
        navigate(`/modificar/${travel._id}`);
    }

    const goToSpends = (e) => {
        e.preventDefault();
        navigate(`/registro-gastos/${travel._id}`);
    }

    const goToEvents = (e) => {
        e.preventDefault();
        navigate(`/registro-eventos/${travel._id}`);
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const deleteSpend = async (id) => {        
        try {
            const token = Cookies.get('jwtoken');

            if (!token) {
                throw new Error('No se registró token de acceso');
            }

            const res = await axios.delete(`http://localhost:3000/viajes/eliminar-gasto/${id}`, {
                headers: { auth: `${token}` }
            });

            if (res.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Error al eliminar el gasto.');
            }
        }
    }

    const editSpend = (e) => {
            e.preventDefault();
            navigate(`/modificar-gasto/${travel._id}`);
    }

    const handleDeleteClick = (action) => {
        setDeleteAction(action);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteAction === 'travel') {
            deleteTravel();
        } else {
            deleteSpend(deleteAction);
        }
        setIsModalOpen(false);
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setDeleteAction(null);
    };

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
        setModalOpen(false);
    };

    if (loading) return <p className='text-slate-800 text-center'>Cargando información del viaje...</p>;
    if (error) return <p className='text-slate-800 text-center'>Ha ocurrido un error al cargar la información del viaje: {error.message}</p>;

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='text-center md:text-left'>
                    <h1 className='text-3xl text-purple-800 font-bold my-6 mx-auto'>Nombre: {travel?.nombre}</h1>
                </div>
                <div className='text-center md:text-right'>
                    <h2 className='text-3xl text-purple-800 font-bold my-6 mx-auto'>Destino: {travel?.destino}</h2>
                </div>
            </div>
            <div className='text-purple-900 font-semibold my-6 mx-auto'>
                <h3 className='text-3xl font-bold text- mb-10'>Eventos del viaje</h3>
                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        locale={esLocale}
                        timeZone="America/Argentina/Buenos_Aires"
                        headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay"
                        }}
                        weekends={true}
                        events={travel?.eventos?.map(event => ({
                        title: event.nombre,
                        start: event.fecha,
                        description: event.descripcion,
                        horario: `${event.horario}`
                        }))}
                        eventBackgroundColor='#8A2BE2'
                        eventBorderColor='#8A2BE2'
                        aspectRatio={1.5}
                        dayMaxEventRows={3}
                        eventClick={handleEventClick}
                    />
                    <Modal
                        isOpen={modalOpen}
                        onClose={handleCloseModal}
                        event={selectedEvent ? {
                        title: selectedEvent.title,
                        extendedProps: {
                            description: selectedEvent.extendedProps.description,
                            horario: selectedEvent.extendedProps.horario
                        }
                        } : null}
                    />
                    </div>
            </div>
            <div className='font-semibold my-6 mx-auto bg-purple-400 p-4 rounded-xl'>
                <h3 className='text-3xl font-bold mb-8 text-center text-purple-900'>Gastos del viaje</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {travel?.gastos?.map(gasto => (
                        <div key={gasto._id} className='bg-violet-900 p-3 rounded-lg flex justify-between items-center'>
                            <div className='m-2'>
                                <p className='text-white text-lg font-semibold'>{capitalizeFirstLetter(gasto.nombre)}</p>
                                <p className='text-white mt-2 text-lg font-semibold'>${parseFloat(gasto.valor).toLocaleString('es-ES', { minimumFractionDigits: 2 })}</p>

                            </div>
                            <div className='flex flex-col ml-4'>
                                <button className='mb-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded' onClick={editSpend}><FontAwesomeIcon icon={faPen} /></button>
                                <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700' onClick={() => handleDeleteClick(gasto._id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-4 text-purple-900 text-center text-lg font-semibold'>
        Total de gastos: ${calcularTotalGastos()}
    </div>
            </div>
            <div className='flex flex-col md:flex-row justify-center md:justify-evenly items-center mt-8 mb-4'>
                <button className='w-full md:w-auto p-4 m-2 bg-purple-500 hover:bg-purple-600 text-white' onClick={goToEdit}>Editar datos del viaje</button>
                <button className='w-full md:w-auto p-4 m-2 bg-purple-500 hover:bg-purple-600 text-white' onClick={goToSpends}>Agregar gastos</button>
                <button className='w-full md:w-auto p-4 m-2 bg-purple-500 hover:bg-purple-600 text-white' onClick={goToEvents}>Agregar eventos</button>
                <button className='w-full md:w-auto p-4 m-2 bg-red-500 hover:bg-red-600 text-white' onClick={() => handleDeleteClick('travel')}>Eliminar viaje</button>
            </div>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onDelete={handleConfirmDelete}
                message="¿Estás seguro de que deseas eliminar?"
            />
        </div>
    );
};

export default TravelDetail
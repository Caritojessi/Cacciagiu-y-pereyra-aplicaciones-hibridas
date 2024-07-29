import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import './calendar.css';
import DeleteModal from '../modal/DeleteModal';
import ModalEvent from '../modal/ModalEvent';
import { fetchTravelDetails, removeSpend, toggleTravelState } from './travelDetailServices/travelDetail';

const TravelDetail = () => {
    const { id } = useParams();
    const [travel, setTravel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteAction, setDeleteAction] = useState(null);
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchTravel = async () => {
            try {
                const travelData = await fetchTravelDetails(id);
                setTravel(travelData);
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

    const storageTravel = async () => {
        try {
            const status = await toggleTravelState(id, travel?.estado);
            
            window.location.reload();
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Error al modificar el estado del viaje.');
            }
        }
    };
    const calcularTotalGastos = () => {
        let total = 0;
        travel?.gastos.forEach(gasto => {
            total += parseFloat(gasto?.valor);
        });
        return total.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    };

    const goToEdit = (e) => {
        e.preventDefault();
        navigate(`/modificar/${travel._id}`);
    };

    const goToSpends = (e) => {
        e.preventDefault();
        navigate(`/registro-gastos/${travel._id}`);
    };

    const goToEvents = (e) => {
        e.preventDefault();
        navigate(`/registro-eventos/${travel._id}`);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const deleteSpend = async (id) => {        
        try {
            const status = await removeSpend(id);
            
            window.location.reload();
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Error al eliminar el gasto.');
            }
        }
    };

    const editSpend = (id) => {
        navigate(`/modificar-gasto/${travel._id}/${id}`);
    };

    const handleDeleteClick = (action) => {
        setDeleteAction(action);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteAction === 'travel') {
            storageTravel();
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
            <div className='grid grid-cols-3 md:grid-cols-3'>
                <div className='text-center md:text-left'>
                    <h1 className='text-3xl text-purple-800 font-bold my-6 mx-auto'>Nombre: {travel?.nombre}</h1>
                    <p className="text-2xl text-black font-bold">Inicio: {new Date(travel?.inicio_viaje).toLocaleDateString('es-ES')}</p>
                </div>
                <div className='text-center md:text-center'>
                    <h2 className='text-3xl text-purple-800 font-bold my-6 mx-auto'>Estado: {travel?.estado ? 'Activo' : 'Archivado'}</h2>
                </div>
                <div className='text-center md:text-right'>
                    <h2 className='text-3xl text-purple-800 font-bold my-6 mx-auto'>Destino: {travel?.destino}</h2>
                    <p className='text-2xl text-black font-bold'>Final: {(travel?.final_viaje ? new Date(travel.final_viaje).toLocaleDateString('es-ES') : 'Sin fecha.')}</p>
                </div>
            </div>
            <div className='text-purple-900 font-semibold my-6 mx-auto'>
                <h3 className='text-3xl font-bold mb-10'>Eventos del viaje</h3>
                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        locale={esLocale}
                        timeZone="America/Argentina/Buenos_Aires"
                        headerToolbar={{
                            start: "today prev,next",
                            center: "title",
                            end: "dayGridMonth"
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
                        aspectRatio={2}  // Ajusta el aspecto para que sea más cuadrado en móviles
                        dayMaxEventRows={2} // Reduce el número de eventos por día visible para evitar desbordamientos
                        eventClick={handleEventClick}
                        contentHeight="auto" // Ajusta la altura del contenido del calendario
                    />
                    {selectedEvent && (
                        <ModalEvent
                            isOpen={modalOpen}
                            onClose={handleCloseModal}
                            event={{
                                title: selectedEvent.title,
                                description: selectedEvent.extendedProps.description,
                                horario: selectedEvent.extendedProps.horario
                            }}
                        />
                    )}
                </div>
            </div>
            <div className='font-semibold my-6 mx-auto bg-purple-400 p-4 rounded-xl'>
                <h3 className='text-3xl font-bold mb-8 text-center text-purple-900'>Gastos del viaje</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {travel?.gastos?.map(gasto => (
                        <div key={gasto?._id} className='bg-violet-900 p-3 rounded-lg flex justify-between items-center'>
                            <div className='m-2'>
                                <p className='text-white text-lg font-semibold'>{capitalizeFirstLetter(gasto?.nombre)}</p>
                                <p className='text-white mt-2 text-lg font-semibold'>${parseFloat(gasto?.valor).toLocaleString('es-ES', { minimumFractionDigits: 2 })}</p>
                                <p className='text-white mt-2 text-sm'>Fecha: {new Date(gasto.fecha).toLocaleDateString('es-ES')}</p>
                            </div>
                            <div className='flex flex-col ml-4'>
                                <button className='mb-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded' onClick={() => editSpend(gasto?._id)}><FontAwesomeIcon icon={faPen} /></button>
                                <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700' onClick={() => handleDeleteClick(gasto?._id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-4'>
                    <p className='text-xl font-bold text-purple-800'>Total Gastos: ${calcularTotalGastos()}</p>
                </div>
            </div>
            <div className='flex flex-wrap justify-around mt-8 mb-4'>
                <button className='w-full md:w-auto p-4 m-2 bg-purple-500 hover:bg-purple-600 text-white' onClick={goToEdit}>Editar datos del viaje</button>
                <button className='w-full md:w-auto p-4 m-2 bg-purple-500 hover:bg-purple-600 text-white' onClick={goToSpends}>Agregar gastos</button>
                <button className='w-full md:w-auto p-4 m-2 bg-purple-500 hover:bg-purple-600 text-white' onClick={goToEvents}>Agregar eventos</button>
                {
                    travel?.estado === true && (
                        <button className='w-full md:w-auto p-4 m-2 bg-red-500 hover:bg-red-600 text-white' onClick={() => handleDeleteClick('travel')}>Archivar viaje</button>
                    )
                }
                {
                    travel?.estado === false && (
                        <button className='w-full md:w-auto p-4 m-2 text-slate-900 bg-green-500 hover:bg-green-600' onClick={() => handleDeleteClick('travel')}>Reanudar viaje</button>
                    )
                }
            </div>
            {
                travel?.estado === true && (
                    <DeleteModal
                        isOpen={isModalOpen}
                        onClose={handleCancelDelete}
                        onDelete={handleConfirmDelete}
                        message="¿Estás seguro de que deseas archivar el viaje?"
                    />
                )
            }
            {
                travel?.estado === false && (
                    <DeleteModal
                        isOpen={isModalOpen}
                        onClose={handleCancelDelete}
                        onDelete={handleConfirmDelete}
                        message="¿Estás seguro de que deseas reanudar el viaje?"
                    />
                )
            }
        </div>
    );
};

export default TravelDetail;

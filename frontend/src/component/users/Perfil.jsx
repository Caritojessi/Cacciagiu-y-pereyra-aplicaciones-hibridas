import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import defaultUserImage from '../../assets/perfil.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../modal/DeleteModal';
import Cookies from 'js-cookie'

const Perfil = () => {
    const { user, setUser, logoutUser } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(user?.nombre || '');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la modal
    const [deleteAction, setDeleteAction] = useState(null);
    const [error, setError] = useState("");

    const handleEdit = () => {
        setEditing(true);
    };

    console.log(user?.nombre);

    const handleSave = async () => {
        const updatedUser = {
            nombre: newName,
            password: newPassword
        };

        try {
            const response = await axios.put(`http://localhost:3000/users/${user._id}`, updatedUser);
            setUser(response.data); // Actualiza el estado del usuario en el AuthContext
            setEditing(false);
            logoutUser();
        } catch (error) {
            // console.error("Hubo un error al actualizar el perfil", error);
            setError(error.response?.data || error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const token = Cookies.get('jwtoken');

            await axios.delete(`http://localhost:3000/users/eliminar/${user._id}`, { 
                headers: { auth: `${token}` }
            });
            logoutUser();
            navigate('/login');
        } catch (error) {
            console.error("Hubo un error al eliminar la cuenta", error);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setNewName(user?.nombre || '');
        setNewEmail(user?.email || '');
        setNewPassword('');
    };

    const handleDeleteClick = (action) => {
        setDeleteAction(action);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        
        handleDelete(deleteAction);
        setIsModalOpen(false);
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setDeleteAction(null);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-purple-500 text-white">
                        <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
                        <p className="mt-1 text-sm">Aquí puedes ver la información de tu perfil.</p>
                    </div>

                    <div className="flex justify-evenly p-6 sm:p-8 items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-45 w-40 rounded-full border-4 border-purple-500"
                                src={user?.imagenPerfil || defaultUserImage}
                                alt="Imagen de perfil"
                            />
                        </div>

                        <div className="ml-6">
                            {editing ? (
                                <div>
                                    <input
                                        type="text"
                                        className="w-full px-3 my-2 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder='Nuevo nombre'
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="w-full px-3 my-2 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Nueva contraseña"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <div className="flex justify-end mt-4 space-x-2">
                                        <button onClick={handleSave} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">Guardar</button>
                                        <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900">{user?.nombre}</h2>
                                    <p className="text-lg text-gray-700">{user?.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-100 text-right">
                        {!editing && (
                            <button onClick={handleEdit} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mr-2">Editar</button>
                        )}
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"  onClick={() => handleDeleteClick(user?._id)}>Borrar Cuenta</button>
                    </div>
                </div>
            </div>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onDelete={handleConfirmDelete}
                message="¿Estás seguro de que deseas eliminar la cuenta? No será posible recuperar sus datos luego."
            />
        </div>
    );
};

export default Perfil;

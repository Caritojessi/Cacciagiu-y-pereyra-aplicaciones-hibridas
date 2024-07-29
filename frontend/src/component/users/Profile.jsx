import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import defaultUserImage from '../../assets/perfil.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../modal/DeleteModal';
import Cookies from 'js-cookie';
import { deleteUser, updateUser } from './userServices/profile';

const Perfil = () => {
    const { user, setUser, logoutUser } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(user?.nombre || '');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteAction, setDeleteAction] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        const formData = new FormData();
        formData.append('nombre', newName);
        if (newPassword) formData.append('password', newPassword);
        if (selectedFile) formData.append('image', selectedFile);

        try {
            await updateUser(user?._id, formData);
            setUser(prev => ({ ...prev, nombre: newName }));
            setEditing(false);
        } catch (error) {
            setError(error.response?.data || error.message);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleDelete = async () => {
        try {
            await deleteUser(user?._id);
            logoutUser();
            navigate('/login');
        } catch (error) {
            console.error("Hubo un error al eliminar la cuenta", error);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setNewName(user?.nombre || '');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
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

    const getProfileImage = (imagePath) => {
        const baseUrl = 'http://localhost:3000/api/images/';
        const photo = baseUrl + imagePath;
        // console.log(user?.image);
        return imagePath ? photo : defaultUserImage;
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-purple-500 text-white">
                        <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
                        <p className="mt-1 text-sm">Aquí puedes ver la información de tu perfil.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-evenly p-6 sm:p-8 items-center">
                    <div className="flex-shrink-0 mb-4 sm:mb-0">
                            <img
                                className="h-40 w-40 rounded-full border-4 border-purple-500"
                                src={getProfileImage(user?.image)}
                                alt="Imagen de perfil"
                            />
                        </div>

                        <div className="sm:ml-6 w-full sm:w-auto">
                            {editing ? (
                                <div className="flex flex-col items-center sm:items-start">
                                    <label htmlFor="newName" className="block text-lg font-semibold text-gray-700 mb-2">Nuevo nombre:</label>
                                    <input
                                        id="newName"
                                        type="text"
                                        className="w-full px-3 my-2 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                    <label htmlFor="newPassword" className="block text-lg font-semibold text-gray-700 mb-2">Nueva contraseña:</label>
                                    <div className="relative w-full">
                                        <input
                                            id="newPassword"
                                            type={passwordVisible ? "text" : "password"}
                                            className="w-full px-3 my-2 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 bg-transparent text-gray-600 hover:bg-transparent hover:border-none transition-none"
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                            aria-label={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                        >
                                            <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                                        </button>
                                    </div>
                                    <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-700 mb-2">Confirmar contraseña:</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className="w-full px-3 my-2 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <label htmlFor="imagenPerfil" className="block text-lg font-semibold text-gray-700 mb-2">Imagen de perfil:</label>
                                    <input
                                        id="imagenPerfil"
                                        type="file"
                                        className="w-full px-3 my-2 py-2 border bg-violet-300 text-violet-950 font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        onChange={handleFileChange}
                                    />
                                    {error && <p className="text-red-500 mb-2">{error}</p>}
                                    <div className="flex justify-end mt-4 space-x-2 w-full">
                                        <button onClick={handleSave} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">Guardar</button>
                                        <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center sm:items-start">
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
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleDeleteClick(user?._id)}>Borrar Cuenta</button>
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
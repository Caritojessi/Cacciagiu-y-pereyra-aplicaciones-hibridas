import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Admin = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-purple-800 mb-6">
                Bienvenido administrador {user?.nombre}
            </h1>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <tbody>
                    <tr className="border-t">
                        <td className="py-3 px-4 text-purple-700">Ciudades</td>
                        <td className="py-3 px-4">
                            <Link to="/admin/nueva-ciudad">
                                <button className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                                    Añadir Ciudad
                                </button>
                            </Link>
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="py-3 px-4 text-purple-700">Actividades</td>
                        <td className="py-3 px-4">
                            <Link to="/admin/nueva-actividad">
                                <button className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                                    Añadir Actividad
                                </button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Admin;

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoutes = () => {
    const { user } = useContext(AuthContext);

    const isAdmin = user?.rol === 'admin';

    return (
        isAdmin ? <Outlet /> : <Navigate to={"/inicio"} />
    );
};

export default AdminProtectedRoutes;

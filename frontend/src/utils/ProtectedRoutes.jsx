import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {

    const { auth } = useContext(AuthContext);

    let authenticated = {'jwtoken': auth};

    return (
        authenticated.jwtoken ? <Outlet/> : <Navigate to={"/login"}/>
    )

}

export default ProtectedRoutes;
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {

    const { auth, logoutUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    let authenticated = {'jwtoken': auth};

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:3000/users", { headers: { 'auth': auth } })
            .then((res) => {
                // console.log(res.data);
                setTimeout(() => {
                    setLoading(false);
                    setUsers(res.data)
                }, 2000);
            })
            .catch((error) => {
                setLoading(false);
                // console.log(error.response);
                if(error?.response?.data?.message === "jwt expired") {
                    alert("¡Se terminó su sesión! Vuelva a ingresar a la página.")
                    logoutUser()
                    Navigate('/login')
                }
            });
    }, []);

    return (
        authenticated.jwtoken ? <Outlet/> : <Navigate to={"/login"}/>
    )

}

export default ProtectedRoutes;
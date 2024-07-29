import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const auth = Cookies.get('jwtoken') || null

    useEffect(() => {
        if(auth) {
            const decoded = jwtDecode(auth)

            // console.log(decoded);
            
            setUser({
                nombre: decoded.usuario.nombre,
                _id: decoded.usuario._id,
                email: decoded.usuario.email,
                rol: decoded.usuario.rol,
                image: decoded.usuario.image
            })
        }
    }, [])

    const logoutUser = () => {
        setUser(null);
        Cookies.remove('jwtoken')
    }

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{user, setUser: updateUser, auth, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )

}
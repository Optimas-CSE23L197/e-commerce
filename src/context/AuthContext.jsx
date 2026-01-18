import { createContext, useContext, useState } from "react";
import { Toast } from "../utils/Toast";

const AuthContext = createContext();

export default function AuthProvider({ children }) {

    // login
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // loading
    // const [] = useState(false)


    const handleLogin = () => {
        setIsLoggedIn(true)
        Toast.success("Login successful")
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        Toast.success("Logout Successful")
    }

    const value = {
        isLoggedIn,
        handleLogin,
        handleLogout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)
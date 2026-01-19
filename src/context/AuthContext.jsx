import { createContext, useContext, useEffect, useState } from "react";
import { Toast } from "../utils/toast.js";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setIsLoggedIn(true);
        }

        setAuthLoading(false);
    }, []);

    const handleLogin = (role = "user") => {
        const loggedInUser = {
            name: role === "admin" ? "admin" : "user",
            role,
        };

        setUser(loggedInUser);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        Toast.success("Login successful");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("user");
        Toast.success("Logout Successful");
    };

    return (
        <AuthContext.Provider
            value={{ user, isLoggedIn, authLoading, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

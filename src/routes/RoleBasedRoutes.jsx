import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleBasedRoute({ allow = [], children }) {
    const { user } = useAuth();
    console.log("Rolebased", user);


    if (!user) return <Navigate to="/login" replace />
    const role = user.role;
    console.log("Rolebased", role)

    if (!allow.includes(role)) {
        return <Navigate to="/" replace />
    }

    return children;
}
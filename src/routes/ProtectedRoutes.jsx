import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes({ children }) {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return <p className="text-center py-10">Checking login...</p>;
    }

    if (!user) return <Navigate to="/login" replace />;

    return children;
}

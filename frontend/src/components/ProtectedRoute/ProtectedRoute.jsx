import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    // Wait until authentication check finishes
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-xl font-semibold">
                    Loading...
                </h1>
            </div>
        );
    }

    // User not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User logged in
    return children;
}

export default ProtectedRoute;
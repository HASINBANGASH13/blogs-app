import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function AdminProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="py-20 text-center text-2xl">
                Loading...
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Not admin
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminProtectedRoute;
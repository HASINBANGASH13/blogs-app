import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        toast.success("Logged out successfully");

        navigate("/login");

    };

    return (
        <nav className="bg-white shadow-md">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    MERN Blog
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-5">

                    <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Home
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/create-blog"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Create Blog
                            </Link>

                            <Link
                                to="/dashboard"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                {user.name}
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
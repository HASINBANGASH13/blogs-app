import { Link } from "react-router-dom";

function Navbar() {
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

                {/* Navigation Links */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="text-gray-700 transition hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <Link
                        to="/login"
                        className="text-gray-700 transition hover:text-blue-600"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                        Register
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;
import { NavLink } from "react-router-dom";

import {
    FaChartBar,
    FaUsers,
    FaBlog,
    FaFolder
} from "react-icons/fa";

function AdminSidebar() {

    const linkClass = ({ isActive }) =>

        `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
            isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
        }`;

    return (

        <aside className="min-h-screen w-64 border-r bg-white p-5">

            <h2 className="mb-8 text-2xl font-bold">

                Admin Panel

            </h2>

            <nav className="space-y-2">

                <NavLink
                    to="/admin"
                    end
                    className={linkClass}
                >

                    <FaChartBar />

                    Dashboard

                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={linkClass}
                >

                    <FaUsers />

                    Users

                </NavLink>

                <NavLink
                    to="/admin/blogs"
                    className={linkClass}
                >

                    <FaBlog />

                    Blogs

                </NavLink>

                <NavLink
                    to="/admin/categories"
                    className={linkClass}
                >

                    <FaFolder />

                    Categories

                </NavLink>

            </nav>

        </aside>

    );

}

export default AdminSidebar;
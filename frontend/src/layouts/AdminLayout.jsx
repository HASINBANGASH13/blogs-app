import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar/AdminSidebar";

function AdminLayout() {

    return (

        <div className="flex">

            <AdminSidebar />

            <main className="flex-1 bg-gray-100 p-8 min-h-screen">

                <Outlet />

            </main>

        </div>

    );

}

export default AdminLayout;
import { useEffect, useState } from "react";

import {
    FaUsers,
    FaBlog,
    FaFolder,
    FaComments
} from "react-icons/fa";

import { toast } from "react-toastify";

import {
    getDashboardStats
} from "../../services/adminService";

function AdminDashboard() {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data.stats);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load dashboard"

            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <h1 className="text-2xl">

                Loading...

            </h1>

        );

    }

    return (

        <div>

            <h1 className="mb-8 text-4xl font-bold">

                Admin Dashboard

            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-xl bg-white p-6 shadow">

                    <FaUsers className="mb-3 text-3xl text-blue-600" />

                    <p>Total Users</p>

                    <h2 className="text-4xl font-bold">

                        {stats.users}

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <FaBlog className="mb-3 text-3xl text-green-600" />

                    <p>Total Blogs</p>

                    <h2 className="text-4xl font-bold">

                        {stats.blogs}

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <FaFolder className="mb-3 text-3xl text-yellow-500" />

                    <p>Total Categories</p>

                    <h2 className="text-4xl font-bold">

                        {stats.categories}

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <FaComments className="mb-3 text-3xl text-red-500" />

                    <p>Total Comments</p>

                    <h2 className="text-4xl font-bold">

                        {stats.comments}

                    </h2>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;
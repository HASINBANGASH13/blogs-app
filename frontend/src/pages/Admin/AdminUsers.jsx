import { useEffect, useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    getAllUsers,
    updateUserRole,
    deleteUser
} from "../../services/adminService";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    // ==========================
    // Load Users
    // ==========================

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const data = await getAllUsers();

            setUsers(data.users);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load users"
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Change Role
    // ==========================

    const handleRoleChange = async (id, role) => {

        try {

            await updateUserRole(id, role);

            setUsers(prev =>
                prev.map(user =>
                    user._id === id
                        ? { ...user, role }
                        : user
                )
            );

            toast.success("Role updated");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update role"
            );

        }

    };

    // ==========================
    // Delete User
    // ==========================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this user?"
        );

        if (!confirmed) return;

        try {

            await deleteUser(id);

            setUsers(prev =>
                prev.filter(user => user._id !== id)
            );

            toast.success("User deleted");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete user"
            );

        }

    };

    // ==========================
    // Search
    // ==========================

    const filteredUsers = useMemo(() => {

        return users.filter(user =>

            user.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            user.email
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [users, search]);

    if (loading) {

        return (

            <div className="py-20 text-center text-2xl">

                Loading Users...

            </div>

        );

    }

    return (

        <div>

            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <h1 className="text-4xl font-bold">

                    Users Management

                </h1>

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 md:w-80"
                />

            </div>

            <div className="overflow-x-auto rounded-xl bg-white shadow">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-4 text-left">

                                Name

                            </th>

                            <th className="px-6 py-4 text-left">

                                Email

                            </th>

                            <th className="px-6 py-4 text-left">

                                Role

                            </th>

                            <th className="px-6 py-4 text-left">

                                Joined

                            </th>

                            <th className="px-6 py-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map(user => (

                            <tr
                                key={user._id}
                                className="border-t"
                            >

                                <td className="px-6 py-4">

                                    {user.name}

                                </td>

                                <td className="px-6 py-4">

                                    {user.email}

                                </td>

                                <td className="px-6 py-4">

                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleChange(
                                                user._id,
                                                e.target.value
                                            )
                                        }
                                        className="rounded border px-3 py-2"
                                    >

                                        <option value="user">

                                            User

                                        </option>

                                        <option value="admin">

                                            Admin

                                        </option>

                                    </select>

                                </td>

                                <td className="px-6 py-4">

                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString()}

                                </td>

                                <td className="px-6 py-4 text-center">

                                    <button
                                        onClick={() =>
                                            handleDelete(user._id)
                                        }
                                        className="text-red-600 transition hover:text-red-800"
                                    >

                                        <FaTrash />

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminUsers;
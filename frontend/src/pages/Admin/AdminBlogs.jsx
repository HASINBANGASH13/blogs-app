import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    getAllBlogs,
    deleteBlog
} from "../../services/adminService";

function AdminBlogs() {

    const [blogs, setBlogs] = useState([]);

    const [filteredBlogs, setFilteredBlogs] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBlogs();

    }, []);

    const fetchBlogs = async () => {

        try {

            const data = await getAllBlogs();

            setBlogs(data.blogs);

            setFilteredBlogs(data.blogs);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load blogs"
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Search
    // ==========================

    useEffect(() => {

        const value = search.toLowerCase();

        const filtered = blogs.filter(blog =>

            blog.title.toLowerCase().includes(value) ||

            blog.author?.name
                ?.toLowerCase()
                .includes(value) ||

            blog.category?.name
                ?.toLowerCase()
                .includes(value)

        );

        setFilteredBlogs(filtered);

    }, [search, blogs]);

    // ==========================
    // Delete Blog
    // ==========================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this blog?"
        );

        if (!confirmed) return;

        try {

            await deleteBlog(id);

            toast.success("Blog deleted.");

            const updated = blogs.filter(
                blog => blog._id !== id
            );

            setBlogs(updated);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to delete blog"

            );

        }

    };

    if (loading) {

        return (

            <div className="py-20 text-center text-2xl">

                Loading blogs...

            </div>

        );

    }

    return (

        <div className="mx-auto max-w-7xl">

            <div className="mb-8 flex items-center justify-between">

                <h1 className="text-4xl font-bold">

                    Manage Blogs

                </h1>

                <div className="relative">

                    <FaSearch className="absolute left-3 top-4 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-blue-600"
                    />

                </div>

            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-4 text-left">

                                Title

                            </th>

                            <th className="px-6 py-4 text-left">

                                Author

                            </th>

                            <th className="px-6 py-4 text-left">

                                Category

                            </th>

                            <th className="px-6 py-4 text-left">

                                Date

                            </th>

                            <th className="px-6 py-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredBlogs.length === 0 && (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="py-8 text-center"
                                >

                                    No blogs found.

                                </td>

                            </tr>

                        )}

                        {filteredBlogs.map(blog => (

                            <tr
                                key={blog._id}
                                className="border-t"
                            >

                                <td className="px-6 py-4 font-medium">

                                    {blog.title}

                                </td>

                                <td className="px-6 py-4">

                                    {blog.author?.name}

                                </td>

                                <td className="px-6 py-4">

                                    {blog.category?.name}

                                </td>

                                <td className="px-6 py-4">

                                    {new Date(
                                        blog.createdAt
                                    ).toLocaleDateString()}

                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-3">

                                        <Link
                                            to={`/blogs/${blog._id}`}
                                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                        >

                                            View

                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(blog._id)
                                            }
                                            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                        >

                                            <FaTrash />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminBlogs;
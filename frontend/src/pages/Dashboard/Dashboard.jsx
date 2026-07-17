import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaPlus,
    FaHeart,
    FaEdit,
    FaTrash,
    FaEye,
    FaFileAlt
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
    getMyBlogs,
    deleteBlog
} from "../../services/blogService";

function Dashboard() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBlogs();

    }, []);

    const fetchBlogs = async () => {

        try {

            const data = await getMyBlogs();

            setBlogs(data.blogs);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this blog?"
        );

        if (!confirmed) return;

        try {

            await deleteBlog(id);

            setBlogs(prev =>
                prev.filter(blog => blog._id !== id)
            );

            toast.success("Blog deleted");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );

        }

    };

    const totalLikes = blogs.reduce(
        (sum, blog) => sum + (blog.likesCount || 0),
        0
    );

    if (loading) {

        return (

            <div className="py-20 text-center text-2xl">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="mx-auto max-w-6xl">

            <h1 className="mb-10 text-4xl font-bold">

                Dashboard

            </h1>

            {/* Stats */}

            <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-gray-500">

                        Total Blogs

                    </p>

                    <h2 className="mt-3 text-4xl font-bold">

                        {blogs.length}

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-gray-500">

                        Total Likes

                    </p>

                    <h2 className="mt-3 text-4xl font-bold">

                        {totalLikes}

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-gray-500">

                        Categories Used

                    </p>

                    <h2 className="mt-3 text-4xl font-bold">

                        {
                            new Set(
                                blogs.map(blog => blog.category?._id)
                            ).size
                        }

                    </h2>

                </div>

            </div>

            {/* Create */}

            <div className="mb-8">

                <Link
                    to="/create-blog"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >

                    <FaPlus />

                    Create Blog

                </Link>

            </div>

            {/* Blogs */}

            <div className="space-y-6">

                {blogs.length === 0 ? (

                    <div className="rounded-xl bg-white p-10 text-center shadow">

                        <FaFileAlt className="mx-auto mb-4 text-5xl text-gray-300" />

                        <h2 className="text-2xl font-bold">

                            No Blogs Yet

                        </h2>

                        <p className="mt-3 text-gray-500">

                            Create your first blog to get started.

                        </p>

                    </div>

                ) : (

                    blogs.map(blog => (

                        <div
                            key={blog._id}
                            className="rounded-xl bg-white p-6 shadow"
                        >

                            <div className="flex flex-col justify-between gap-5 lg:flex-row">

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        {blog.title}

                                    </h2>

                                    <p className="mt-2 text-gray-500">

                                        {blog.category?.name}

                                    </p>

                                    <div className="mt-4 flex items-center gap-2">

                                        <FaHeart className="text-red-500" />

                                        {blog.likesCount}

                                    </div>

                                </div>

                                <div className="flex gap-3">

                                    <Link
                                        to={`/blogs/${blog._id}`}
                                        className="rounded-lg bg-gray-100 p-3 hover:bg-gray-200"
                                    >

                                        <FaEye />

                                    </Link>

                                    <Link
                                        to={`/edit-blog/${blog._id}`}
                                        className="rounded-lg bg-blue-100 p-3 text-blue-700 hover:bg-blue-200"
                                    >

                                        <FaEdit />

                                    </Link>

                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="rounded-lg bg-red-100 p-3 text-red-700 hover:bg-red-200"
                                    >

                                        <FaTrash />

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default Dashboard;
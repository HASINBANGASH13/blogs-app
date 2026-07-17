import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CategorySelect from "../../components/CategorySelect/CategorySelect";

import { getBlog, updateBlog } from "../../services/blogService";
import { getCategories } from "../../services/categoryService";

function EditBlog() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: ""
    });

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    // ===============================
    // Load Blog + Categories
    // ===============================
    useEffect(() => {

        const fetchData = async () => {

            try {

                const [blogData, categoryData] = await Promise.all([
                    getBlog(id),
                    getCategories()
                ]);

                setCategories(categoryData.categories);

                setFormData({
                    title: blogData.blog.title,
                    content: blogData.blog.content,
                    category: blogData.blog.category?._id || ""
                });

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load blog"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, [id]);

    // ===============================
    // Handle Input
    // ===============================
    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    // ===============================
    // Update Blog
    // ===============================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            await updateBlog(id, formData);

            toast.success("Blog updated successfully.");

            navigate(`/blogs/${id}`);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update blog"
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                <h1 className="text-2xl font-semibold">

                    Loading...

                </h1>

            </div>

        );

    }

    return (

        <div className="mx-auto max-w-3xl">

            <h1 className="mb-8 text-4xl font-bold">

                Edit Blog

            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Title */}

                <div>

                    <label className="mb-2 block font-semibold">

                        Title

                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        required
                    />

                </div>

                {/* Category */}

                <div>

                    <label className="mb-2 block font-semibold">

                        Category

                    </label>

                    <CategorySelect
                        categories={categories}
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                </div>

                {/* Content */}

                <div>

                    <label className="mb-2 block font-semibold">

                        Content

                    </label>

                    <textarea
                        rows={12}
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        required
                    />

                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                >

                    {saving
                        ? "Updating..."
                        : "Update Blog"}

                </button>

            </form>

        </div>

    );

}

export default EditBlog;
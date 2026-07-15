import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CategorySelect from "../../components/CategorySelect/CategorySelect";
import CreateCategoryModal from "../../components/CreateCategoryModal/CreateCategoryModal";

import { createBlog } from "../../services/blogService";
import { getCategories } from "../../services/categoryService";

function CreateBlog() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: ""
    });

    const [categories, setCategories] = useState([]);

    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [loading, setLoading] = useState(false);

    const [showCategoryModal, setShowCategoryModal] = useState(false);

    // ===============================
    // Load Categories
    // ===============================
    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const data = await getCategories();

                setCategories(data.categories);

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load categories"
                );

            } finally {

                setCategoriesLoading(false);

            }

        };

        fetchCategories();

    }, []);

    // ===============================
    // Handle Input Change
    // ===============================
    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    // ===============================
    // Submit Blog
    // ===============================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = await createBlog(formData);

            toast.success("Blog created successfully!");

            navigate(`/blogs/${data.blog._id}`);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create blog"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="mx-auto max-w-3xl">

            <h1 className="mb-8 text-4xl font-bold">
                Create New Blog
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
                        placeholder="Enter blog title"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        required
                    />

                </div>

                {/* Category */}
                <div>

                    <div className="mb-2 flex items-center justify-between">

                        <label className="font-semibold">
                            Category
                        </label>

                        <button
                            type="button"
                            onClick={() => setShowCategoryModal(true)}
                            className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                        >
                            + New Category
                        </button>

                    </div>

                    <CategorySelect
                        categories={categories}
                        loading={categoriesLoading}
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
                        name="content"
                        rows="12"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your blog..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        required
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading || categoriesLoading}
                    className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Publishing..." : "Publish Blog"}
                </button>

            </form>

            <CreateCategoryModal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                onCategoryCreated={(category) => {

                    // Add new category locally
                    setCategories((prev) => [...prev, category]);

                    // Automatically select it
                    setFormData((prev) => ({
                        ...prev,
                        category: category._id
                    }));

                }}
            />

        </div>

    );

}

export default CreateBlog;
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    getAllCategories,
    updateCategory,
    deleteCategory
} from "../../services/adminService";

import CreateCategoryModal from "../../components/CreateCategoryModal/CreateCategoryModal";

function AdminCategories() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState(null);

    const [name, setName] = useState("");

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const data = await getAllCategories();

            setCategories(data.categories);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load categories"
            );

        } finally {

            setLoading(false);

        }

    };

    const handleEdit = (category) => {

        setEditingId(category._id);

        setName(category.name);

    };

    const handleSave = async (id) => {

        try {

            const data = await updateCategory(id, name);

            setCategories(prev =>
                prev.map(category =>
                    category._id === id
                        ? data.category
                        : category
                )
            );

            toast.success("Category updated");

            setEditingId(null);

            setName("");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update category"
            );

        }

    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this category?"
        );

        if (!confirmed) return;

        try {

            await deleteCategory(id);

            setCategories(prev =>
                prev.filter(category => category._id !== id)
            );

            toast.success("Category deleted");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete category"
            );

        }

    };

    if (loading) {

        return (
            <h1 className="text-center text-2xl">
                Loading...
            </h1>
        );

    }

    return (

        <div className="mx-auto max-w-5xl">

            <div className="mb-8 flex items-center justify-between">

                <h1 className="text-4xl font-bold">

                    Manage Categories

                </h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                >
                    <FaPlus />

                    New Category
                </button>

            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">

                                Name

                            </th>

                            <th className="p-4">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {categories.map(category => (

                            <tr
                                key={category._id}
                                className="border-t"
                            >

                                <td className="p-4">

                                    {editingId === category._id ? (

                                        <input
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            className="w-full rounded border px-3 py-2"
                                        />

                                    ) : (

                                        category.name

                                    )}

                                </td>

                                <td className="space-x-3 p-4 text-center">

                                    {editingId === category._id ? (

                                        <button
                                            onClick={() =>
                                                handleSave(category._id)
                                            }
                                            className="rounded bg-green-600 px-4 py-2 text-white"
                                        >
                                            Save
                                        </button>

                                    ) : (

                                        <button
                                            onClick={() =>
                                                handleEdit(category)
                                            }
                                            className="text-blue-600"
                                        >
                                            <FaEdit />
                                        </button>

                                    )}

                                    <button
                                        onClick={() =>
                                            handleDelete(category._id)
                                        }
                                        className="text-red-600"
                                    >
                                        <FaTrash />
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <CreateCategoryModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCategoryCreated={(category) =>
                    setCategories(prev => [
                        category,
                        ...prev
                    ])
                }
            />

        </div>

    );

}

export default AdminCategories;
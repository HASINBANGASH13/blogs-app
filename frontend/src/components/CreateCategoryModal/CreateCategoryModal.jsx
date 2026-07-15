import { useState } from "react";
import { toast } from "react-toastify";

import { createCategory } from "../../services/categoryService";

function CreateCategoryModal({
    isOpen,
    onClose,
    onCategoryCreated
}) {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!name.trim()) {
            return toast.error("Category name is required");
        }

        try {

            setLoading(true);

            const data = await createCategory({
                name
            });

            toast.success("Category created successfully");

            setName("");

            onCategoryCreated(data.category);

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create category"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold">
                    Create Category
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Category name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-5 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                        >
                            {loading
                                ? "Creating..."
                                : "Create"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CreateCategoryModal;
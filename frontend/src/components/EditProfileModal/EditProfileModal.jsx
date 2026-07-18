import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { updateProfile } from "../../services/userService";

function EditProfileModal({

    isOpen,
    onClose,
    profile,
    onUpdated

}) {

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (profile) {

            setFormData({
                name: profile.name || "",
                email: profile.email || ""
            });

        }

    }, [profile]);

    if (!isOpen) return null;

    const handleChange = (e) => {

        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = await updateProfile(formData);

            toast.success(data.message);

            onUpdated(data.user);

            onClose();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to update profile"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">

                <h2 className="mb-6 text-3xl font-bold">

                    Edit Profile

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="mb-2 block font-semibold">

                            Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                            required
                        />

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-5 py-3"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditProfileModal;
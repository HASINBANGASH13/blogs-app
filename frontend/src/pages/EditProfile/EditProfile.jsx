import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";

import {
    getProfile,
    updateProfile
} from "../../services/userService";

function EditProfile() {

    const navigate = useNavigate();

    const { updateUser } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    // ==========================
    // Load Profile
    // ==========================

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const data = await getProfile();

            setFormData({
                name: data.user.name,
                email: data.user.email
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load profile."
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Handle Change
    // ==========================

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    // ==========================
    // Submit
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const data = await updateProfile(formData);

            // Update Auth Context
            updateUser(data.user);

            toast.success("Profile updated successfully.");

            navigate("/profile");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="py-20 text-center text-2xl">

                Loading...

            </div>

        );

    }

    return (

        <div className="mx-auto max-w-2xl">

            <h1 className="mb-8 text-4xl font-bold">

                Edit Profile

            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-xl bg-white p-8 shadow"
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

                <div className="flex gap-4">

                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                    >

                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="rounded-lg border border-gray-300 px-8 py-3 font-semibold transition hover:bg-gray-100"
                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}

export default EditProfile;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { changePassword } from "../../services/userService";

function ChangePassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    // ==========================
    // Handle Input Change
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

        if (!formData.currentPassword.trim()) {
            return toast.error("Current password is required.");
        }

        if (!formData.newPassword.trim()) {
            return toast.error("New password is required.");
        }

        if (formData.newPassword.length < 6) {
            return toast.error(
                "New password must be at least 6 characters."
            );
        }

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {
            return toast.error(
                "Passwords do not match."
            );
        }

        try {

            setLoading(true);

            const data = await changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            toast.success(data.message);

            navigate("/profile");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to change password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="mx-auto max-w-2xl">

            <h1 className="mb-8 text-4xl font-bold">

                Change Password

            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-xl bg-white p-8 shadow"
            >

                <div>

                    <label className="mb-2 block font-semibold">

                        Current Password

                    </label>

                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-semibold">

                        New Password

                    </label>

                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-semibold">

                        Confirm New Password

                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        required
                    />

                </div>

                <div className="flex gap-4">

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                    >

                        {loading
                            ? "Updating..."
                            : "Change Password"}

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

export default ChangePassword;
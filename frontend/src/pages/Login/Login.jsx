import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";

function Login() {

    const { login, user } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await login(formData);

            toast.success("Login successful!");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login failed"
            );

        } finally {

            setLoading(false);

        }

    };

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (

        <div className="flex min-h-[80vh] items-center justify-center">

            <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">

                <h1 className="mb-6 text-center text-3xl font-bold">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Enter email"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Enter password"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;
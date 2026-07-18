import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaBlog,
    FaHeart,
    FaComments,
    FaUserShield,
    FaEdit,
    FaLock,
    FaTrash
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
    getProfile,
    deleteAccount
} from "../../services/userService";

import useAuth from "../../hooks/useAuth";

function Profile() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const data = await getProfile();

            setProfile(data.user);
            setStats(data.stats);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Edit Profile
    // ==========================

    const handleEditProfile = () => {

        navigate("/profile/edit");

    };

    // ==========================
    // Change Password
    // ==========================

    const handleChangePassword = () => {

        navigate("/profile/change-password");

    };

    // ==========================
    // Delete Account
    // ==========================

    const handleDeleteAccount = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to permanently delete your account?"
        );

        if (!confirmed) return;

        try {

            await deleteAccount();

            toast.success("Account deleted successfully.");

            await logout();

            navigate("/", {
                replace: true
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete account"
            );

        }

    };

    if (loading) {

        return (

            <div className="py-20 text-center text-2xl">

                Loading Profile...

            </div>

        );

    }

    return (

        <div className="mx-auto max-w-5xl">

            <h1 className="mb-10 text-4xl font-bold">

                My Profile

            </h1>

            {/* Profile Card */}

            <div className="rounded-xl bg-white p-8 shadow">

                <div className="flex flex-col items-center">

                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-100 text-5xl text-blue-700">

                        <FaUser />

                    </div>

                    <h2 className="mt-5 text-3xl font-bold">

                        {profile?.name}

                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-gray-500">

                        <FaEnvelope />

                        {profile?.email}

                    </p>

                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                        <FaUserShield />

                        {profile?.role}

                    </p>

                </div>

            </div>

            {/* Stats */}

            <div className="mt-10 grid gap-6 md:grid-cols-3">

                <div className="rounded-xl bg-white p-6 shadow">

                    <FaBlog className="mb-3 text-3xl text-blue-600" />

                    <p className="text-gray-500">

                        Blogs

                    </p>

                    <h2 className="text-4xl font-bold">

                        {stats?.blogs ?? 0}

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <FaHeart className="mb-3 text-3xl text-red-500" />

                    <p className="text-gray-500">

                        Likes

                    </p>

                    <h2 className="text-4xl font-bold">

                        {stats?.likes ?? 0}

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <FaComments className="mb-3 text-3xl text-green-600" />

                    <p className="text-gray-500">

                        Comments

                    </p>

                    <h2 className="text-4xl font-bold">

                        {stats?.comments ?? 0}

                    </h2>

                </div>

            </div>

            {/* Actions */}

            <div className="mt-10 flex flex-wrap gap-4">

                <button
                    onClick={handleEditProfile}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >

                    <FaEdit />

                    Edit Profile

                </button>

                <button
                    onClick={handleChangePassword}
                    className="flex items-center gap-2 rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white transition hover:bg-yellow-600"
                >

                    <FaLock />

                    Change Password

                </button>

                <button
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >

                    <FaTrash />

                    Delete Account

                </button>

            </div>

        </div>

    );

}

export default Profile;
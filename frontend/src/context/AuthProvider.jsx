import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

import {
    login as loginService,
    register as registerService,
    getProfile
} from "../services/authService";

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // =============================
    // Load User
    // =============================
    const loadUser = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const data = await getProfile();

            setUser(data.user);

        } catch (error) {

            localStorage.removeItem("token");

            setUser(null);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadUser();

    }, []);

    // =============================
    // Register
    // =============================
    const register = async (userData) => {

        const data = await registerService(userData);

        localStorage.setItem("token", data.token);

        setUser(data.user);

        return data;

    };

    // =============================
    // Login
    // =============================
    const login = async (userData) => {

        const data = await loginService(userData);

        localStorage.setItem("token", data.token);

        setUser(data.user);

        return data;

    };

    // =============================
    // Update User
    // =============================
    const updateUser = (updatedUser) => {

        setUser(updatedUser);

    };

    // =============================
    // Logout
    // =============================
    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                loadUser,
                updateUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;
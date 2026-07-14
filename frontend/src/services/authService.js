import api from "./api";

// Register
export const register = async (userData) => {

    const response = await api.post(
        "/users/register",
        userData
    );

    return response.data;

};

// Login
export const login = async (userData) => {

    const response = await api.post(
        "/users/login",
        userData
    );

    return response.data;

};

// Get Profile
export const getProfile = async () => {

    const response = await api.get(
        "/users/profile"
    );

    return response.data;

};

// Update Profile
export const updateProfile = async (userData) => {

    const response = await api.put(
        "/users/profile",
        userData
    );

    return response.data;

};

// Change Password
export const changePassword = async (passwordData) => {

    const response = await api.put(
        "/users/change-password",
        passwordData
    );

    return response.data;

};

// Delete Account
export const deleteAccount = async () => {

    const response = await api.delete(
        "/users/profile"
    );

    return response.data;

};
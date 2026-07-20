import api from "./api";

// ======================================
// Dashboard
// ======================================

export const getDashboardStats = async () => {

    const response = await api.get("/admin/dashboard");

    return response.data;

};

// ======================================
// Users
// ======================================

export const getAllUsers = async () => {

    const response = await api.get("/admin/users");

    return response.data;

};

export const updateUserRole = async (id, role) => {

    const response = await api.put(
        `/admin/users/${id}/role`,
        { role }
    );

    return response.data;

};

export const deleteUser = async (id) => {

    const response = await api.delete(
        `/admin/users/${id}`
    );

    return response.data;

};

// ======================================
// Blogs
// ======================================

export const getAllBlogs = async () => {

    const response = await api.get("/admin/blogs");

    return response.data;

};

export const deleteBlog = async (id) => {

    const response = await api.delete(
        `/admin/blogs/${id}`
    );

    return response.data;

};

// ======================================
// Categories
// ======================================

export const getAllCategories = async () => {

    const response = await api.get("/admin/categories");

    return response.data;

};

export const updateCategory = async (id, name) => {

    const response = await api.put(
        `/admin/categories/${id}`,
        { name }
    );

    return response.data;

};

export const deleteCategory = async (id) => {

    const response = await api.delete(
        `/admin/categories/${id}`
    );

    return response.data;

};
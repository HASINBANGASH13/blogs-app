import api from "./api";

// ===============================
// Get All Categories
// ===============================
export const getCategories = async () => {

    const response = await api.get(
        "/categories"
    );

    return response.data;

};

// ===============================
// Create Category
// ===============================
export const createCategory = async (
    categoryData
) => {

    const response = await api.post(
        "/categories",
        categoryData
    );

    return response.data;

};
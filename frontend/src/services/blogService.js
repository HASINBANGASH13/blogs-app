import api from "./api";

// ===============================
// Get All Blogs
// ===============================
export const getBlogs = async (params = {}) => {

    const response = await api.get(
        "/blogs",
        {
            params
        }
    );

    return response.data;

};

// ===============================
// Get Single Blog
// ===============================
export const getBlog = async (id) => {

    const response = await api.get(`/blogs/${id}`);

    return response.data;

};

// ===============================
// Create Blog
// ===============================
export const createBlog = async (blogData) => {

    const response = await api.post(
        "/blogs",
        blogData
    );

    return response.data;

};

// ===============================
// Update Blog
// ===============================
export const updateBlog = async (
    id,
    blogData
) => {

    const response = await api.put(
        `/blogs/${id}`,
        blogData
    );

    return response.data;

};

// ===============================
// Delete Blog
// ===============================
export const deleteBlog = async (id) => {

    const response = await api.delete(
        `/blogs/${id}`
    );

    return response.data;

};

// ===============================
// Like / Unlike Blog
// ===============================
export const toggleLike = async (id) => {

    const response = await api.post(
        `/blogs/${id}/like`
    );

    return response.data;

};


export const getMyBlogs = async () => {

    const response = await api.get("/blogs/myblogs");

    return response.data;

};
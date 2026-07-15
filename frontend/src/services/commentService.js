import api from "./api";

// ==========================
// Get Comments
// ==========================
export const getComments = async (blogId) => {

    const response = await api.get(`/comments/${blogId}`);

    return response.data;

};

// ==========================
// Create Comment
// ==========================
export const createComment = async (blogId, text) => {

    const response = await api.post(
        `/comments/${blogId}`,
        { text }
    );

    return response.data;

};

// ==========================
// Update Comment
// ==========================
export const updateComment = async (commentId, text) => {

    const response = await api.put(
        `/comments/${commentId}`,
        { text }
    );

    return response.data;

};

// ==========================
// Delete Comment
// ==========================
export const deleteComment = async (commentId) => {

    const response = await api.delete(
        `/comments/${commentId}`
    );

    return response.data;

};
import api from "./api";

// ===============================
// Dashboard Stats
// ===============================
export const getDashboardStats = async () => {

    const response = await api.get("/admin/dashboard");

    return response.data;

};
import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
    getDashboard,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllBlogsAdmin,
    deleteBlogAdmin,
    getAllCategories,
updateCategory,
deleteCategory
} from "../controllers/adminController.js";



const router = express.Router();

// ======================================
// Dashboard
// ======================================

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    getDashboard
);

// ===============================
// Users
// ===============================

router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    getAllUsers
);

router.put(
    "/users/:id/role",
    authMiddleware,
    adminMiddleware,
    updateUserRole
);

router.delete(
    "/users/:id",
    authMiddleware,
    adminMiddleware,
    deleteUser
);

// ======================================
// Blog Management
// ======================================

// Get all blogs
router.get("/blogs", authMiddleware, adminMiddleware, getAllBlogsAdmin);

// Delete any blog
router.delete("/blogs/:id", authMiddleware, adminMiddleware, deleteBlogAdmin);

// Categories
router.get(
    "/categories",
    authMiddleware,
    adminMiddleware,
    getAllCategories
);

router.put(
    "/categories/:id",
    authMiddleware,
    adminMiddleware,
    updateCategory
);

router.delete(
    "/categories/:id",
    authMiddleware,
    adminMiddleware,
    deleteCategory
);

export default router;
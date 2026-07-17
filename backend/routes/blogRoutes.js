import express from "express";

import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    toggleLike,
    getMyBlogs
} from "../controllers/blogController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==============================
// Public Routes
// ==============================

// Get all blogs
router.get("/", getAllBlogs);

// Get logged-in user's blogs
// IMPORTANT: Keep this above "/:id"
router.get(
    "/myblogs",
    authMiddleware,
    getMyBlogs
);

// Get single blog
router.get("/:id", getBlogById);

// ==============================
// Protected Routes
// ==============================

// Create blog
router.post(
    "/",
    authMiddleware,
    createBlog
);

// Update blog
router.put(
    "/:id",
    authMiddleware,
    updateBlog
);

// Delete blog
router.delete(
    "/:id",
    authMiddleware,
    deleteBlog
);

// Like / Unlike blog
router.post(
    "/:id/like",
    authMiddleware,
    toggleLike
);

export default router;
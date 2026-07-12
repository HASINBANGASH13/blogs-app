import express from "express";

import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from "../controllers/blogController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected Routes
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
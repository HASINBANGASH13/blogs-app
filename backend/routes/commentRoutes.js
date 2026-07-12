import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    createComment,
    getBlogComments,
    updateComment,
    deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

// ================================
// Public Routes
// ================================

// Get all comments for a blog
router.get("/:blogId", getBlogComments);

// ================================
// Protected Routes
// ================================

// Create comment
router.post("/:blogId", authMiddleware, createComment);

// Update comment
router.put("/:commentId", authMiddleware, updateComment);

// Delete comment
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
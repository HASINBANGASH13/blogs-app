import asyncHandler from "../middleware/asyncHandler.js";

import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";

// ======================================
// Admin Dashboard
// GET /api/admin/dashboard
// ======================================
export const getDashboard = asyncHandler(async (req, res) => {

    const users = await User.countDocuments();

    const blogs = await Blog.countDocuments();

    const categories = await Category.countDocuments();

    const comments = await Comment.countDocuments();

    res.status(200).json({
        success: true,
        stats: {
            users,
            blogs,
            categories,
            comments
        }
    });

});
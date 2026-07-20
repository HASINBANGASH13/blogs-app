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

// ======================================
// Get All Users
// GET /api/admin/users
// ======================================
export const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: users.length,
        users
    });

});

// ======================================
// Update User Role
// PUT /api/admin/users/:id/role
// ======================================
export const updateUserRole = asyncHandler(async (req, res) => {

    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
        res.status(400);
        throw new Error("Invalid role");
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    user.role = role;

    await user.save();

    res.status(200).json({
        success: true,
        message: "User role updated successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt
        }
    });

});

// ======================================
// Delete User
// DELETE /api/admin/users/:id
// ======================================
export const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error("You cannot delete your own account.");
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });

});

// ======================================
// Get All Blogs (Admin)
// GET /api/admin/blogs
// ======================================
export const getAllBlogsAdmin = asyncHandler(async (req, res) => {

    const blogs = await Blog.find()
        .populate("author", "name email")
        .populate("category", "name")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: blogs.length,
        blogs
    });

});

// ======================================
// Delete Any Blog (Admin)
// DELETE /api/admin/blogs/:id
// ======================================
export const deleteBlogAdmin = asyncHandler(async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {

        res.status(404);

        throw new Error("Blog not found");

    }

    // Delete related comments
    await Comment.deleteMany({
        blog: blog._id
    });

    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully"
    });

});
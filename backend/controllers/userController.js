import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// ===============================
// Register User
// POST /api/users/register
// ===============================
export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        }
    });

});

// ===============================
// Login User
// POST /api/users/login
// ===============================
export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    res.status(200).json({
        success: true,
        message: "Login successful",
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        }
    });

});

// ===============================
// Get Profile
// GET /api/users/profile
// ===============================
export const getProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
        .select("-password");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const blogs = await Blog.find({
        author: user._id
    });

    const blogCount = blogs.length;

    const totalLikes = blogs.reduce(
        (sum, blog) => sum + blog.likes.length,
        0
    );

    const commentCount = await Comment.countDocuments({
        user: user._id
    });

    res.status(200).json({
        success: true,
        user,
        stats: {
            blogs: blogCount,
            likes: totalLikes,
            comments: commentCount
        }
    });

});

// ===============================
// Update Profile
// PUT /api/users/profile
// ===============================
export const updateProfile = asyncHandler(async (req, res) => {

    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (email && email !== user.email) {

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            res.status(400);
            throw new Error("Email already exists");
        }

        user.email = email;
    }

    if (name) {
        user.name = name;
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        }
    });

});

// ===============================
// Change Password
// PUT /api/users/change-password
// ===============================
export const changePassword = asyncHandler(async (req, res) => {

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        res.status(400);
        throw new Error("Please provide both passwords");
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        res.status(400);
        throw new Error("Current password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });

});

// ===============================
// Delete Account
// DELETE /api/users/profile
// ===============================
export const deleteAccount = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "Account deleted successfully"
    });

});
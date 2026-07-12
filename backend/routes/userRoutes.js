import express from "express";

import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Public Routes
// ==========================

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// ==========================
// Protected Routes
// ==========================

// Get Logged In User Profile
router.get("/profile", authMiddleware, getProfile);

// Update Profile
router.put("/profile", authMiddleware, updateProfile);

// Change Password
router.put("/change-password", authMiddleware, changePassword);

// Delete Account
router.delete("/profile", authMiddleware, deleteAccount);

export default router;
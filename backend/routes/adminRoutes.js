import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
    getDashboard,
    getAllUsers,
    updateUserRole,
    deleteUser
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

export default router;
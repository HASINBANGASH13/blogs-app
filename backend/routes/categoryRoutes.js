import express from "express";

import {
    createCategory,
    getCategories
} from "../controllers/categoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", authMiddleware, createCategory);

export default router;
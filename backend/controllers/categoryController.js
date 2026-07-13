import Category from "../models/Category.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Create Category
export const createCategory = asyncHandler(async (req, res) => {

    const { name, description } = req.body;

    const exists = await Category.findOne({ name });

    if (exists) {
        res.status(400);
        throw new Error("Category already exists");
    }

    const category = await Category.create({
        name,
        description
    });

    res.status(201).json({
        success: true,
        category
    });

});

// Get Categories
export const getCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find()
        .sort({ name: 1 });

    res.status(200).json({
        success: true,
        count: categories.length,
        categories
    });

});
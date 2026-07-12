import Blog from "../models/Blog.js";
import asyncHandler from "../middleware/asyncHandler.js";

// ===================================
// Create Blog
// POST /api/blogs
// ===================================
export const createBlog = asyncHandler(async (req, res) => {

    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const blog = await Blog.create({
        title,
        content,
        category,
        author: req.user._id
    });

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog
    });

});

// ===================================
// Get All Blogs
// GET /api/blogs
// ===================================
export const getAllBlogs = asyncHandler(async (req, res) => {

    const blogs = await Blog.find()
        .populate("author", "name email avatar")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: blogs.length,
        blogs
    });

});

// ===================================
// Get Single Blog
// GET /api/blogs/:id
// ===================================
export const getBlogById = asyncHandler(async (req, res) => {

    const blog = await Blog.findById(req.params.id)
        .populate("author", "name email avatar");

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    res.status(200).json({
        success: true,
        blog
    });

});

// ===================================
// Update Blog
// PUT /api/blogs/:id
// ===================================
export const updateBlog = asyncHandler(async (req, res) => {

    const { title, content, category } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    // Only the blog author can update
    if (blog.author.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("You are not authorized to update this blog.");
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    await blog.save();

    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        blog
    });

});

// ===================================
// Delete Blog
// DELETE /api/blogs/:id
// ===================================
export const deleteBlog = asyncHandler(async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    // Only the blog author can delete
    if (blog.author.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("You are not authorized to delete this blog.");
    }

    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully"
    });

});
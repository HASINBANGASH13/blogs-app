import Blog from "../models/Blog.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/Category.js";

// ===================================
// Create Blog
// POST /api/blogs
// ===================================
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

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
        res.status(404);
        throw new Error("Category not found");
    }

    const blog = await Blog.create({
        title,
        content,
        category: categoryExists._id,
        author: req.user._id
    });

    const populatedBlog = await Blog.findById(blog._id)
        .populate("author", "name email avatar")
        .populate("category", "name description");

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: populatedBlog
    });

});

// ===================================
// Get All Blogs
// GET /api/blogs
// ===================================
// ===================================
// Get All Blogs
// GET /api/blogs
// ===================================
export const getAllBlogs = asyncHandler(async (req, res) => {

    const {
        page = 1,
        limit = 10,
        search = "",
        category,
        sort = "latest"
    } = req.query;

    // Build filter
    const filter = {};

    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                content: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    if (category) {
        filter.category = category;
    }

    // Sorting
    let sortOption = {};

    switch (sort) {

    case "oldest":
        sortOption = { createdAt: 1 };
        break;

    case "latest":
        sortOption = { createdAt: -1 };
        break;

    case "mostLiked":
        sortOption = { likes: -1 };
        break;

    case "title":
        sortOption = { title: 1 };
        break;

    default:
        sortOption = { createdAt: -1 };

}

    const totalBlogs = await Blog.countDocuments(filter);

    const blogs = await Blog.find(filter)
        .populate("author", "name email avatar")
        .populate("category", "name description")
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(Number(limit));

   const formattedBlogs = blogs.map(blog => ({
    ...blog.toObject(),
    likesCount: blog.likes.length,
    category: blog.category
}));

    res.status(200).json({

        success: true,

        currentPage: Number(page),

        totalPages: Math.ceil(totalBlogs / limit),

        totalBlogs,

        blogs: formattedBlogs

    });

});

// ===================================
// Get Single Blog
// GET /api/blogs/:id
// ===================================
export const getBlogById = asyncHandler(async (req, res) => {

    const blog = await Blog.findById(req.params.id)
        .populate("author", "name email avatar")
        .populate("category", "name description");

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    res.status(200).json({
        success: true,
        blog: {
        ...blog.toObject(),
        likesCount: blog.likes.length
    }
    });

});

// ===================================
// Update Blog
// PUT /api/blogs/:id
// ===================================
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

    if (blog.author.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("You are not authorized to update this blog.");
    }

    if (title) {
        blog.title = title;
    }

    if (content) {
        blog.content = content;
    }

    if (category) {

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            res.status(404);
            throw new Error("Category not found");
        }

        blog.category = categoryExists._id;
    }

    await blog.save();

    const updatedBlog = await Blog.findById(blog._id)
        .populate("author", "name email avatar")
        .populate("category", "name description");

    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        blog: updatedBlog
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

// ===================================
// Like / Unlike Blog
// POST /api/blogs/:id/like
// ===================================
export const toggleLike = asyncHandler(async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    const userId = req.user._id;

    const alreadyLiked = blog.likes.some(
        (id) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {

        blog.likes = blog.likes.filter(
            (id) => id.toString() !== userId.toString()
        );

        await blog.save();

        return res.status(200).json({
            success: true,
            message: "Blog unliked",
            totalLikes: blog.likes.length,
            liked: false
        });

    }

    blog.likes.push(userId);

    await blog.save();

    res.status(200).json({
        success: true,
        message: "Blog liked",
        totalLikes: blog.likes.length,
        liked: true
    });

});
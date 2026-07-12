import Blog from "../models/Blog.js";

/*
    Create Blog
    POST /api/blogs
*/
export const createBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;

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

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/*
    Get All Blogs
    GET /api/blogs
*/
export const getAllBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find()
            .populate("author", "name email avatar")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

/*
    Get Single Blog
    GET /api/blogs/:id
*/
export const getBlogById = async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id)
            .populate("author", "name email avatar");

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            blog
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

/*
    Update Blog
    PUT /api/blogs/:id
*/
export const updateBlog = async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Only author can update
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this blog."
            });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.category = req.body.category || blog.category;

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

/*
    Delete Blog
    DELETE /api/blogs/:id
*/
export const deleteBlog = async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Only author can delete
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this blog."
            });
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
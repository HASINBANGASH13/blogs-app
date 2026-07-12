import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import asyncHandler from "../middleware/asyncHandler.js";

// ===================================
// Create Comment
// POST /api/comments/:blogId
// ===================================
export const createComment = asyncHandler(async (req, res) => {

    const { text } = req.body;
    const { blogId } = req.params;

    if (!text) {
        res.status(400);
        throw new Error("Comment text is required");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    const comment = await Comment.create({
        text,
        user: req.user._id,
        blog: blogId
    });

    const populatedComment = await Comment.findById(comment._id)
        .populate("user", "name email avatar");

    res.status(201).json({
        success: true,
        message: "Comment added successfully",
        comment: populatedComment
    });

});

// ===================================
// Get Blog Comments
// GET /api/comments/:blogId
// ===================================
export const getBlogComments = asyncHandler(async (req, res) => {

    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    const comments = await Comment.find({ blog: blogId })
        .populate("user", "name email avatar")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: comments.length,
        comments
    });

});

// ===================================
// Update Comment
// PUT /api/comments/:commentId
// ===================================
export const updateComment = asyncHandler(async (req, res) => {

    const { text } = req.body;

    if (!text) {
        res.status(400);
        throw new Error("Comment text is required");
    }

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
        res.status(404);
        throw new Error("Comment not found");
    }

    // Only comment owner can update
    if (comment.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("You are not authorized to update this comment.");
    }

    comment.text = text;

    await comment.save();

    const updatedComment = await Comment.findById(comment._id)
        .populate("user", "name email avatar");

    res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        comment: updatedComment
    });

});

// ===================================
// Delete Comment
// DELETE /api/comments/:commentId
// ===================================
export const deleteComment = asyncHandler(async (req, res) => {

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
        res.status(404);
        throw new Error("Comment not found");
    }

    // Only comment owner can delete
    if (comment.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("You are not authorized to delete this comment.");
    }

    await comment.deleteOne();

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully"
    });

});
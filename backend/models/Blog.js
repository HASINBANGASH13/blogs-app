import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: 5,
            maxlength: 150
        },

        content: {
            type: String,
            required: [true, "Content is required"]
        },

        image: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
import { useState } from "react";
import { toast } from "react-toastify";

import { createComment } from "../../services/commentService";

function CommentForm({ blogId, onCommentAdded }) {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!text.trim()) {
            return toast.error("Please write a comment.");
        }

        try {

            setLoading(true);

            const data = await createComment(blogId, text);

            onCommentAdded(data.comment);

            setText("");

            toast.success("Comment added successfully.");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add comment"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h3 className="mb-4 text-xl font-semibold">

                Write a Comment

            </h3>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <textarea
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full rounded-lg border border-gray-300 p-4 outline-none focus:border-blue-600"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "Posting..." : "Post Comment"}
                </button>

            </form>

        </div>

    );

}

export default CommentForm;
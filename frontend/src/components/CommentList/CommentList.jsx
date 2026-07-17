import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getComments } from "../../services/commentService";

import CommentItem from "../CommentItem/CommentItem";

function CommentList({

    blogId,

    refresh,

    onCountChange

}) {

    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(true);

    // ===============================
    // Load Comments
    // ===============================
    useEffect(() => {

        const fetchComments = async () => {

            try {

                setLoading(true);

                const data = await getComments(blogId);

                setComments(data.comments);

                onCountChange?.(data.comments.length);

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load comments"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchComments();

    }, [blogId, refresh, onCountChange]);

    // ===============================
    // Delete Comment
    // ===============================
    const handleDelete = (commentId) => {

        const updatedComments = comments.filter(
            (comment) => comment._id !== commentId
        );

        setComments(updatedComments);

        onCountChange?.(updatedComments.length);

    };

    // ===============================
    // Update Comment
    // ===============================
    const handleUpdate = (updatedComment) => {

        setComments((prev) =>
            prev.map((comment) =>
                comment._id === updatedComment._id
                    ? updatedComment
                    : comment
            )
        );

    };

    if (loading) {

        return (

            <div className="rounded-lg border bg-white p-6 text-center">

                Loading comments...

            </div>

        );

    }

    if (comments.length === 0) {

        return (

            <div className="rounded-lg border bg-white p-6 text-center text-gray-500">

                No comments yet.

            </div>

        );

    }

    return (

        <div className="space-y-5">

            {comments.map((comment) => (

                <CommentItem
                    key={comment._id}
                    comment={comment}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />

            ))}

        </div>

    );

}

export default CommentList;
import { useState } from "react";
import {
    FaUser,
    FaTrash,
    FaEdit,
    FaSave,
    FaTimes
} from "react-icons/fa";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";

import {
    deleteComment,
    updateComment
} from "../../services/commentService";

function CommentItem({

    comment,

    onDelete,

    onUpdate

}) {

    const { user } = useAuth();

    const isOwner =
        user?._id === comment.user?._id;

    const [editing, setEditing] = useState(false);

    const [text, setText] = useState(comment.text);

    const [loading, setLoading] = useState(false);

    // ===============================
    // Delete Comment
    // ===============================
    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Delete this comment?"
        );

        if (!confirmed) return;

        try {

            setLoading(true);

            await deleteComment(comment._id);

            toast.success("Comment deleted.");

            onDelete(comment._id);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete comment"
            );

        } finally {

            setLoading(false);

        }

    };

    // ===============================
    // Update Comment
    // ===============================
    const handleUpdate = async () => {

        if (!text.trim()) {

            return toast.error(
                "Comment cannot be empty."
            );

        }

        try {

            setLoading(true);

            const data = await updateComment(
                comment._id,
                text
            );

            onUpdate(data.comment);

            toast.success(
                "Comment updated successfully."
            );

            setEditing(false);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update comment"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="rounded-xl border bg-white p-5 shadow-sm">

            {/* Header */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">

                        <FaUser className="text-blue-600" />

                    </div>

                    <div>

                        <h3 className="font-semibold">

                            {comment.user?.name}

                        </h3>

                        <p className="text-sm text-gray-500">

                            {new Date(
                                comment.createdAt
                            ).toLocaleString()}

                        </p>

                    </div>

                </div>

                {isOwner && !editing && (

                    <div className="flex gap-3">

                        <button
                            onClick={() => setEditing(true)}
                            className="text-blue-600 transition hover:text-blue-800"
                        >

                            <FaEdit />

                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="text-red-600 transition hover:text-red-800"
                        >

                            <FaTrash />

                        </button>

                    </div>

                )}

            </div>

            {/* Comment */}

            {!editing ? (

                <p className="mt-5 whitespace-pre-wrap leading-7 text-gray-700">

                    {comment.text}

                </p>

            ) : (

                <div className="mt-5">

                    <textarea
                        rows={4}
                        value={text}
                        onChange={(e) =>
                            setText(e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
                    />

                    <div className="mt-4 flex gap-3">

                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
                        >

                            <FaSave />

                            Save

                        </button>

                        <button
                            onClick={() => {

                                setText(comment.text);

                                setEditing(false);

                            }}
                            className="flex items-center gap-2 rounded-lg border px-5 py-2 transition hover:bg-gray-100"
                        >

                            <FaTimes />

                            Cancel

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}

export default CommentItem;
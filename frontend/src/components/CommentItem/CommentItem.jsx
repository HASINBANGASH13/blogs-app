import { FaTrash, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { deleteComment } from "../../services/commentService";

function CommentItem({

    comment,

    onDelete

}) {

    const { user } = useAuth();

    const isOwner =
        user?._id === comment.user?._id;

    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Delete this comment?"
        );

        if (!confirmed) return;

        try {

            await deleteComment(comment._id);

            toast.success("Comment deleted");

            onDelete(comment._id);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to delete comment"

            );

        }

    };

    return (

        <div className="rounded-lg border bg-white p-5">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">

                        <FaUser />

                    </div>

                    <div>

                        <h3 className="font-semibold">

                            {comment.user?.name}

                        </h3>

                        <p className="text-sm text-gray-500">

                            {new Date(comment.createdAt).toLocaleString()}

                        </p>

                    </div>

                </div>

                {isOwner && (

                    <button
                        onClick={handleDelete}
                        className="text-red-600 transition hover:text-red-800"
                    >
                        <FaTrash />
                    </button>

                )}

            </div>

            <p className="mt-4 whitespace-pre-wrap text-gray-700">

                {comment.text}

            </p>

        </div>

    );

}

export default CommentItem;
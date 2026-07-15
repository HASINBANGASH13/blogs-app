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

    useEffect(() => {

        const fetchComments = async () => {

            try {

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

    }, [blogId, refresh]);

    const handleDelete = (id) => {

        const updated = comments.filter(

            comment => comment._id !== id

        );

        setComments(updated);

        onCountChange?.(updated.length);

    };

    if (loading) {

        return (

            <p className="text-gray-500">

                Loading comments...

            </p>

        );

    }

    if (comments.length === 0) {

        return (

            <p className="text-gray-500">

                No comments yet.

            </p>

        );

    }

    return (

        <div className="space-y-5">

            {comments.map(comment => (

                <CommentItem

                    key={comment._id}

                    comment={comment}

                    onDelete={handleDelete}

                />

            ))}

        </div>

    );

}

export default CommentList;
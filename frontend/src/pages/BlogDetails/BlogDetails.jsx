import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    FaHeart,
    FaUser,
    FaCalendarAlt
} from "react-icons/fa";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";

import {
    getBlog,
    toggleLike
} from "../../services/blogService";

import CommentForm from "../../components/CommentForm/CommentForm";
import CommentList from "../../components/CommentList/CommentList";

function BlogDetails() {

    const { id } = useParams();

    const { user } = useAuth();

    const [blog, setBlog] = useState(null);

    const [loading, setLoading] = useState(true);

    const [likeLoading, setLikeLoading] = useState(false);

    const [refreshComments, setRefreshComments] = useState(0);

    const [commentCount, setCommentCount] = useState(0);

    // ===============================
    // Load Blog
    // ===============================
    useEffect(() => {

        const fetchBlog = async () => {

            try {

                const data = await getBlog(id);

                setBlog(data.blog);

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load blog"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchBlog();

    }, [id]);

    // ===============================
    // Like / Unlike
    // ===============================
    const handleLike = async () => {

        if (!user) {
            return toast.error("Please login first.");
        }

        try {

            setLikeLoading(true);

            const data = await toggleLike(blog._id);

            setBlog((prev) => {

                const likes = [...(prev.likes || [])];

                if (data.liked) {

                    const alreadyLiked = likes.some((like) => {

                        const likeId =
                            typeof like === "object"
                                ? like?._id
                                : like;

                        return String(likeId) === String(user._id);

                    });

                    if (!alreadyLiked) {
                        likes.push(user._id);
                    }

                } else {

                    const filteredLikes = likes.filter((like) => {

                        const likeId =
                            typeof like === "object"
                                ? like?._id
                                : like;

                        return String(likeId) !== String(user._id);

                    });

                    return {
                        ...prev,
                        likes: filteredLikes
                    };

                }

                return {
                    ...prev,
                    likes
                };

            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to like blog"
            );

        } finally {

            setLikeLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                <h1 className="text-2xl font-semibold">

                    Loading...

                </h1>

            </div>

        );

    }

    if (!blog) {

        return (

            <div className="flex justify-center py-20">

                <h1 className="text-2xl font-semibold">

                    Blog not found

                </h1>

            </div>

        );

    }

    const isLiked = !!user && (blog.likes || []).some((like) => {

        const likeId =
            typeof like === "object"
                ? like?._id
                : like;

        return String(likeId) === String(user._id);

    });

    return (

        <div className="mx-auto max-w-4xl">

            {/* Category */}

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">

                {blog.category?.name || "Uncategorized"}

            </span>

            {/* Title */}

            <h1 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">

                {blog.title}

            </h1>

            {/* Meta */}

            <div className="mt-8 flex flex-wrap items-center gap-6 border-b pb-6 text-gray-600">

                <div className="flex items-center gap-2">

                    <FaUser />

                    <span>

                        {blog.author?.name}

                    </span>

                </div>

                <div className="flex items-center gap-2">

                    <FaCalendarAlt />

                    <span>

                        {new Date(blog.createdAt).toLocaleDateString()}

                    </span>

                </div>

                <button
                    onClick={handleLike}
                    disabled={likeLoading}
                    className="ml-auto flex items-center gap-2 rounded-lg border px-5 py-2 transition hover:bg-red-50 disabled:opacity-60"
                >

                    <FaHeart
                        className={
                            isLiked
                                ? "text-red-500"
                                : "text-gray-400"
                        }
                    />

                    <span>

                        {blog.likes?.length || 0}

                    </span>

                </button>

            </div>

            {/* Content */}

            <div className="mt-10 whitespace-pre-wrap leading-9 text-gray-800">

                {blog.content}

            </div>

            {/* Comments */}

            <hr className="my-12" />

            <h2 className="mb-6 text-3xl font-bold">

                Comments ({commentCount})

            </h2>

            <CommentForm
                blogId={blog._id}
                onCommentAdded={() =>
                    setRefreshComments(prev => prev + 1)
                }
            />

            <div className="mt-10">

                <CommentList
                    blogId={blog._id}
                    refresh={refreshComments}
                    onCountChange={setCommentCount}
                />

            </div>

        </div>

    );

}

export default BlogDetails;
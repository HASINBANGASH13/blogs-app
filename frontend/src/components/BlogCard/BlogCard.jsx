import { Link } from "react-router-dom";
import { FaHeart, FaUser } from "react-icons/fa";

function BlogCard({ blog }) {

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Content */}
            <div className="p-6">

                {/* Category */}
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {blog.category?.name || "Uncategorized"}
                </span>

                {/* Title */}
                <h2 className="mt-4 text-2xl font-bold text-gray-800">
                    {blog.title}
                </h2>

                {/* Content Preview */}
                <p className="mt-3 line-clamp-3 text-gray-600">
                    {blog.content}
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-2 text-gray-500">
                    <FaUser />
                    <span>
                        {blog.author?.name || "Unknown"}
                    </span>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex items-center gap-1 text-red-500">
                            <FaHeart />
                            <span>
                                {blog.likesCount || 0}
                            </span>
                        </div>

                        <span className="text-sm text-gray-500">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </span>

                    </div>

                    <Link
                        to={`/blogs/${blog._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                        Read More
                    </Link>

                </div>

            </div>

        </div>
    );

}

export default BlogCard;
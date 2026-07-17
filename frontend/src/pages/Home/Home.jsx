import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getBlogs } from "../../services/blogService";
import { getCategories } from "../../services/categoryService";

import BlogCard from "../../components/BlogCard/BlogCard";
import CategorySelect from "../../components/CategorySelect/CategorySelect";

function Home() {

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("latest");

    const [page, setPage] = useState(1);
    const limit = 9;

    const [totalPages, setTotalPages] = useState(1);

    // ===============================
    // Load Categories
    // ===============================
    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const data = await getCategories();

                setCategories(data.categories);

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load categories"
                );

            }

        };

        fetchCategories();

    }, []);

    // ===============================
    // Load Blogs
    // ===============================
    useEffect(() => {

        const fetchBlogs = async () => {

            try {

                setLoading(true);

                const params = {
                    page,
                    limit,
                    sort
                };

                if (search.trim()) {
                    params.search = search;
                }

                if (category) {
                    params.category = category;
                }

                const data = await getBlogs(params);

                setBlogs(data.blogs);
                setTotalPages(data.totalPages);

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load blogs"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchBlogs();

    }, [search, category, sort, page]);

    // ===============================
    // Reset page when filter changes
    // ===============================
    useEffect(() => {

        setPage(1);

    }, [search, category, sort]);

    return (

        <div>

            {/* Heading */}

            <h1 className="mb-10 text-center text-4xl font-bold">

                Latest Blogs

            </h1>

            {/* Filters */}

            <div className="mb-10 grid gap-4 md:grid-cols-3">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />

                {/* Category */}

                <CategorySelect
                    categories={categories}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                {/* Sort */}

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                >

                    <option value="latest">

                        Latest

                    </option>

                    <option value="oldest">

                        Oldest

                    </option>

                </select>

            </div>

            {/* Loading */}

            {loading ? (

                <h2 className="py-20 text-center text-2xl">

                    Loading blogs...

                </h2>

            ) : blogs.length === 0 ? (

                <h2 className="py-20 text-center text-xl">

                    No blogs found.

                </h2>

            ) : (

                <>

                    {/* Blog Grid */}

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {blogs.map((blog) => (

                            <BlogCard
                                key={blog._id}
                                blog={blog}
                            />

                        ))}

                    </div>

                    {/* Pagination */}

                    <div className="mt-12 flex items-center justify-center gap-4">

                        <button
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                            className="rounded-lg border px-5 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            Previous

                        </button>

                        <span className="font-semibold">

                            Page {page} of {totalPages}

                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                            className="rounded-lg border px-5 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            Next

                        </button>

                    </div>

                </>

            )}

        </div>

    );

}

export default Home;
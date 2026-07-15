import { useEffect, useState } from "react";

import { getBlogs } from "../../services/blogService";
import BlogCard from "../../components/BlogCard/BlogCard";

function Home() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBlogs = async () => {

            try {

                const data = await getBlogs();

                setBlogs(data.blogs);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchBlogs();

    }, []);

    if (loading) {
        return (
            <h1 className="text-center text-2xl">
                Loading blogs...
            </h1>
        );
    }

    return (

        <div>

            <h1 className="mb-8 text-center text-4xl font-bold">
                Latest Blogs
            </h1>

            {blogs.length === 0 ? (
                <h2 className="text-center text-xl">
                    No blogs found.
                </h2>
            ) : (

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                        />
                    ))}

                </div>

            )}

        </div>

    );

}

export default Home;
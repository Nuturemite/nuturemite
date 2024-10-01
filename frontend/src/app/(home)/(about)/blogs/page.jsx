import { getBlogs } from "@/service/data";
import { IMAGE_URL } from "@/constants";
import Link from "next/link";
import Head from "next/head";
export const metadata = {
  title: "Blogs",
  description: "Read our latest blogs on Nuturemite",
  keywords: "Blogs, Nuturemite, Health, Wellness",
};
const BlogPage = async () => {
  const { data: blogs } = await getBlogs();
  if (blogs.length === 0) return <div>No blogs found</div>;

  return (
    <div className="md:mt-10 mt-4">
      <h1 className="h2-primary md:px-10 px-4">Latest Blogs</h1>
      <div className="md:p-10 p-4 space-y-10">
        {blogs?.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

const BlogCard = ({ image, title, slug, tags, desc }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={tags.join(", ")} />
      </Head>
      <Link href={`/blogs/${slug}`}>
        <div className="flex md:flex-row flex-col overflow-hidden ">
          <img src={`${IMAGE_URL}/${image}`} alt={title} className="w-full md:w-1/3 object-cover" />
          <div className="p-4 w-full md:w-2/3">
            <h2 className="h3-primary">{title}</h2>
            <p className="text-gray-700 mb-2">{desc}</p>
            <div>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs font-semibold mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPage;

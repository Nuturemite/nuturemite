"use client";
import { useBlog } from "@/lib/data";
import Loader from "@/components/shared/loader";
import { IMAGE_URL } from "@/constants";

const BlogPage = ({ params }) => {
  const { blog, isLoading } = useBlog(params.slug);
  if (isLoading) return <div><Loader /></div>;
  return (
    <div className="p-4">
      <img src={`${IMAGE_URL}/${blog.image}`} alt={blog.title} className="w-full h-auto mb-4" />
      <h1 className="h2-primary">{blog.title}</h1>
      <h2 className="h3-primary mb-2">{blog.desc}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogPage;
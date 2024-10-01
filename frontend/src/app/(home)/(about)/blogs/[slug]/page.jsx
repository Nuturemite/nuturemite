import { IMAGE_URL } from "@/constants";
import { getBlog } from "@/service/data";
import Head from "next/head";
const BlogPage = async ({ params }) => {
  const { data: blog } = await getBlog(params.slug);
  return (
    <div className="p-4">
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.desc} />
        <meta name="keywords" content={blog.tags.join(", ")} />
      </Head>
      <img src={`${IMAGE_URL}/${blog.image}`} alt={blog.title} className="w-full h-auto mb-4" />
      <h1 className="h2-primary">{blog.title}</h1>
      <h2 className="h3-primary mb-2">{blog.desc}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogPage;

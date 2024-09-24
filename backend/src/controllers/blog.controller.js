import { Blog } from "../models/model.js";
import slugify from "slugify";

export const createBlog = async (req, res) => {
  try {
    const slug = await createSlug(req.body.title);
    req.body.slug = slug;
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({ message: "Blog created successfully!", data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().select("-content").sort("-_id");
    res.status(200).json({ data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    res.status(200).json({ data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
    res.status(200).json({ message: "Blog updated successfully!", data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createSlug = async name => {
  const slug = slugify(name, { lower: true, strict: true, trim: true });
  const blog = await Blog.findOne({ slug });
  if (blog) {
    return slugify(name + " " + Date.now(), { lower: true, strict: true, trim: true });
  }
  return slug;
};

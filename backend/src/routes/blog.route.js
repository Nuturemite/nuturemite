import { Router } from "express";
import { createBlog, getBlogs, getBlogBySlug, updateBlog, deleteBlog } from "../controllers/blog.controller.js";
import isAuth  from '../middlewares/auth.js';

const router = Router();

router.post("/", isAuth, createBlog);
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.put("/:slug", isAuth, updateBlog);
router.delete("/:id", isAuth, deleteBlog);

export default router;
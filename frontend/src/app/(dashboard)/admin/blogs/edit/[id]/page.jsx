"use client";
import React from "react";
import BlogForm from "@/components/forms/BlogForm";
import { useBlog } from "@/lib/data";
import Loader from "@/components/shared/loader";

export default function page({ params }) {
  const { blog, isLoading } = useBlog(params.id);
  if (isLoading) return <Loader/>;
  return <BlogForm params={params} blog={blog} update />;
}

"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../ui/separator";
import { tst } from "@/lib/utils";
import ImageUpload from "@/components/ui/image-upload";
import Editor from "@/components/shared/common/editor";

const initialData = {
  title: "",
  content: "",
  tags: "",
  images: "",
  content: "",
};

function BlogForm({ update, params, blog }) {
  const [formData, setFormData] = useState(initialData);
  const [images, setImages] = useState([]);
  const [pending, setPending] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (update && blog) {
      setFormData({
        ...blog,
        tags: blog.tags.join(" "),
      });
    }
    setImages([blog?.image] || []);
  }, [update, blog]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(" "),
        image: images[0],
      };
      if (!update) {
        await api.post("/blogs", payload, {});
      } else {
        await api.put(`/blogs/${params.id}`, payload, {});
      }
      tst.success(update ? "Blog updated successfully" : "Blog created successfully");
    } catch (err) {
      tst.error(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="p-2 md:p-10 md:max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div className="grid gap-8 py-4">
        <div>
          <Label htmlFor="title" className="mb-2 block">
            Title
          </Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            id="title"
            disabled={pending}
            placeholder="Blog Title"
            required
            minLength="3"
          />
        </div>
        <div>
          <Label htmlFor="desc" className="mb-2 block">
            Description
          </Label>
          <Textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            disabled={pending}
            id="desc"
            placeholder="Blog Description"
            minLength="10"
            className="min-h-[10rem]"
          />
        </div>
        <div>
          <Label htmlFor="content" className="mb-2 block">
            Content
          </Label>
          <Editor
            value={formData.content}
            onChange={value => setFormData(prevState => ({ ...prevState, content: value }))}
          />
        </div>
        <Separator />
        <div>
          <Label htmlFor="tags" className="mb-2 block">
            Tags
          </Label>
          <Input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            id="tags"
            disabled={pending}
            placeholder="Blog Tags"
            required
          />
        </div>
        <Separator />
        <div>
          <Label htmlFor="images" className="mb-2 block">
            Upload Images
          </Label>
          <ImageUpload
            images={images}
            setImages={setImages}
            imageUploading={imageUploading}
            setImageUploading={setImageUploading}
          />
        </div>
        <Separator />
        <Button type="submit" className="mt-6" pending={pending}>
          {update ? "Update Blog" : "Create Blog"}
        </Button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </form>
  );
}

export default BlogForm;

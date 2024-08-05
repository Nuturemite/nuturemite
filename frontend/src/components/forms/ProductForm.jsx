"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/lib/data";
import { tst } from "@/lib/utils";
import ImageUpload from "@/components/ui/image-upload";
import MultiSelect from "../ui/multi-select";

const initialData = {
  name: "",
  description: "",
  basePrice: "",
  price: "",
  sku: "",
  categories: "",
  images: [],
};

function ProductForm({ update, params, product }) {
  const { categories } = useCategories();
  const [formData, setFormData] = useState(initialData);
  const [images, setImages] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (update && product) {
      setFormData({
        name: product.name,
        description: product.description,
        basePrice: product.basePrice,
        price: product.price,
        sku: product.sku,
        categories: product.categories.map(cat => ({ value: cat._id, label: cat.name })),
      });
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);

    try {
      const payload = {
        ...formData,
        images: images.map(image => image.image),
        categories: formData.categories.map(cat => cat.value),
      };
      if (!update) {
        await api.post("/products", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        tst.success("Product created successfully");
      } else {
        await api.put(`/products/${params.id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        tst.success("Product updated successfully");
      }
      setError(null);
    } catch (err) {
      tst.error(err);
    } finally {
      setPending(false);
    }
  };


  return (
    <form className="p-10 max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div className="grid gap-8 py-4">
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="name"
            disabled={pending}
            placeholder="Product Name"
            required
            minLength="3"
          />
        </div>
        <div>
          <Label htmlFor="description" className="mb-2 block">
            Description
          </Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={pending}
            id="description"
            placeholder="Product Description"
            minLength="10"
          />
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <Label htmlFor="basePrice" className="mb-2 block">
              MRP
            </Label>
            <Input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
              id="basePrice"
              disabled={pending}
              placeholder="Product MRP"
              required
              min="1"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="price" className="mb-2 block">
              Sales Price
            </Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              id="price"
              disabled={pending}
              placeholder="Sales Price"
              min="0"
            />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <Label htmlFor="sku" className="mb-2 block">
              SKU
            </Label>
            <Input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              id="sku"
              disabled={pending}
              placeholder="SKU"
            />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <Label htmlFor="categories" className="mb-2 block">
              Category
            </Label>
            <MultiSelect
              value={formData.categories}
              options={categories?.map(cat => ({ label: cat.name, value: cat._id }))}
              onChange={selOptions => setFormData({ ...formData, categories: selOptions })}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="images" className="mb-2 block">
            Upload Images
          </Label>
          <ImageUpload images={images} setImages={setImages} />
        </div>
        {error && (
          <div className="text-red-500 px-2 py-3 border border-red-300 text-sm mt-2">{error}</div>
        )}
        <Button disabled={pending} pending={pending} type="submit">
          {!update ? "Add Product" : "Update Product"}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;

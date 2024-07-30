"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/data";
import { Textarea } from "@/components/ui/textarea";
import { tst } from "@/lib/utils";
import api from "@/lib/api";
import Loader from "@/components/shared/loader";
import Joi from "joi";
import UploadImage from "@/components/shared/uploadimage";
import CustomSelect from "@/components/ui/custrom-select";

const productSchema = Joi.object({
  name: Joi.string().trim().min(3).required().messages({
    "string.base": `Name should be a type of 'text'`,
    "string.empty": `Name cannot be an empty`,
    "string.min": `Name should have a minimum length of {#limit}`,
    "any.required": `Name is a required`,
  }),
  description: Joi.string()
    .trim()
    .optional()
    .allow(null || "")
    .min(10)
    .messages({
      "string.base": `Description should be a type of 'text'`,
      "string.empty": `Description cannot be an empty`,
      "string.min": `Description should have a minimum length of {#limit}`,
    }),
  basePrice: Joi.number().min(1).required().messages({
    "number.base": `BasePrice should be a type of 'number'`,
    "number.min": `BasePrice should have a minimum value of {#limit}`,
    "any.required": `BasePrice is a required`,
  }),
  categoryId: Joi.string().required().messages({
    "number.base": `Category ID should be a type of 'number'`,
    "number.integer": `Category ID should be an integer`,
    "any.required": `Category ID is a required`,
  }),
  image: Joi.any(),
}).options({ stripUnknown: true });

function ProductForm({ update, params, product, isLoading }) {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (update && product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        basePrice: product.basePrice,
        image: product.image,
      });
    }
  }, [update, product]);

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFocus = e => {
    const { name } = e.target;
    setFormErrors(prevData => ({
      ...prevData,
      [name]: "",
    }));
    setError(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);

    try {
      const { value, error } = productSchema.validate(formData, { abortEarly: false });

      if (error) {
        const errors = {};
        error.details.forEach(err => {
          errors[err.path[0]] = err.message;
        });
        setFormErrors(errors);
        return;
      }

      if (!update) {
        await api.post("/products", value, { headers: { "Content-Type": "multipart/form-data" } });
        tst.success("Product created successfully");
      } else {
        await api.put(`/products/${params.id}`, value, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        tst.success("Product updated successfully");
      }
      setFormErrors({});
    } catch (err) {
      if (err.response?.data?.message) {
        console.log(err.response.data);
      } else {
        tst.error(err);
      }
    } finally {
      setPending(false);
    }
  };

  if (update && isLoading) return <Loader />;

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
            className={`col-span-3 ${formErrors.name ? "border-red-500" : ""}`}
            onFocus={handleFocus}
          />
          {formErrors.name && <div className="text-red-500 text-sm">{formErrors.name}</div>}
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
            className={`col-span-3 ${formErrors.description ? "border-red-500" : ""}`}
            onFocus={handleFocus}
          />
          {formErrors.description && (
            <div className="text-red-500 text-sm">{formErrors.description}</div>
          )}
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
              className={`col-span-3 ${formErrors.basePrice ? "border-red-500" : ""}`}
              onFocus={handleFocus}
            />
            {formErrors.basePrice && (
              <div className="text-red-500 text-sm">{formErrors.basePrice}</div>
            )}
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <Label htmlFor="category" className="mb-2 block">
              Category
            </Label>
            <CustomSelect
              label="Category"
              name={"categoryId"}
              options={categories}
              value={formData.categoryId}
              onChange={v => setFormData({ ...formData, categoryId: v })}
              error={formErrors.categoryId}
              onFocus={handleFocus}
              placeholder="Select a category"
            />
            {formErrors.categoryId && (
              <div className="text-red-500 text-sm">{formErrors.categoryId}</div>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="image" className="mb-2 block">
            Upload Images
          </Label>
          <UploadImage
            image={formData.image}
            onImageSelect={image => setFormData({ ...formData, image })}
            onImageRemove={() => setFormData({ ...formData, image: null })}
            className={"w-40"}
          />
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

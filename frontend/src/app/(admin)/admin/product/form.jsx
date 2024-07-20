"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProduct, useCategories, useBrands } from "@/lib/data";
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
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": `Quantity should be a type of 'number'`,
    "number.integer": `Quantity should be an integer`,
    "number.min": `Quantity should have a minimum value of {#limit}`,
    "any.required": `Quantity is a required`,
  }),
  price: Joi.number().min(1).required().messages({
    "number.base": `Price should be a type of 'number'`,
    "number.min": `Price should have a minimum value of {#limit}`,
    "any.required": `Price is a required`,
  }),
  discount: Joi.number().min(0).max(100).optional().messages({
    "number.base": `Discount should be a type of 'number'`,
    "number.min": `Discount should have a minimum value of {#limit}`,
    "number.max": `Discount should have a maximum value of {#limit}`,
  }),
  categoryId: Joi.number().integer().required().messages({
    "number.base": `Category ID should be a type of 'number'`,
    "number.integer": `Category ID should be an integer`,
    "any.required": `Category ID is a required`,
  }),
  brandId: Joi.number().integer().required().messages({
    "number.base": `Brand ID should be a type of 'number'`,
    "number.integer": `Brand ID should be an integer`,
    "any.required": `Brand ID is a required`,
  }),
  image: Joi.any(),
}).options({ stripUnknown: true });

function ProductForm({ update, params }) {
  const { product, isLoading } = update
    ? useProduct(params?.id)
    : { product: {}, isLoading: false };
  const { categories } = useCategories();
  const { brands } = useBrands();
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (update && product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        quantity: product.quantity,
        price: product.price,
        discount: product.discount,
        discountNumber: product.discount ? (product.discount / 100) * product.price : "",
        categoryId: product.categoryId,
        brandId: product.brandId,
        image: product.image,
      });
    }
  }, [update, product]);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === "discount") {
      const discountPercent = parseFloat(value);
      const discountNumber = (discountPercent / 100) * formData.price;

      setFormData(prevData => ({
        ...prevData,
        discount: discountPercent,
        discountNumber: discountNumber.toFixed(2),
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
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
        // setError(err.response.data.message);
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
            <Label htmlFor="quantity" className="mb-2 block">
              Quantity
            </Label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              id="quantity"
              disabled={pending}
              placeholder="Product Quantity"
              className={`col-span-3 ${formErrors.quantity ? "border-red-500" : ""}`}
              onFocus={handleFocus}
            />
            {formErrors.quantity && (
              <div className="text-red-500 text-sm">{formErrors.quantity}</div>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="price" className="mb-2 block">
              Price
            </Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              id="price"
              disabled={pending}
              placeholder="Product Price"
              className={`col-span-3 ${formErrors.price ? "border-red-500" : ""}`}
              onFocus={handleFocus}
            />
            {formErrors.price && <div className="text-red-500 text-sm">{formErrors.price}</div>}
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <Label htmlFor="discount" className="mb-2 block">
              Discount (%)
            </Label>
            <Input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              id="discount"
              disabled={pending}
              placeholder="Product Discount"
              className={`col-span-3 ${formErrors.discount ? "border-red-500" : ""}`}
              onFocus={handleFocus}
            />
            {formErrors.discount && (
              <div className="text-red-500 text-sm">{formErrors.discount}</div>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="discountNumber" className="mb-2 block">
              Discount Num
            </Label>
            <Input
              type="text"
              name="discountNumber"
              value={formData.discountNumber}
              onChange={handleChange}
              id="discountNumber"
              disabled={true}
              className="col-span-3"
            />
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
          <div className="flex-1">
            <Label htmlFor="brand" className="mb-2 block">
              Brand
            </Label>
            <CustomSelect
              label="Brand"
              options={brands}
              name={"brandId"}
              value={formData.brandId}
              onChange={v => setFormData({ ...formData, brandId: v })}
              error={formErrors.categoryId}
              onFocus={handleFocus}
              placeholder="Select a brand"
            />
            {formErrors.brandId && <div className="text-red-500 text-sm">{formErrors.brandId}</div>}
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

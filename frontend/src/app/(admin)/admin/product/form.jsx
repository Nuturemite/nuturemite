"use client";
import { useState, useEffect } from "react";
import Joi from "joi";
import api from "@/lib/api";
import Loader from "@/components/shared/loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/lib/data";
import { tst } from "@/lib/utils";
import UploadImage from "@/components/shared/uploadimage";
import CustomSelect from "@/components/ui/custrom-select";

const productSchema = Joi.object({
  name: Joi.string().trim().min(3).required().messages({
    "string.base": `Name should be a type of 'text'`,
    "string.empty": `Name cannot be an empty`,
    "string.min": `Name should have a minimum length of {#limit}`,
    "any.required": `Name is a required`,
  }),
  description: Joi.string().trim().optional().allow(null, "").min(10).messages({
    "string.base": `Description should be a type of 'text'`,
    "string.empty": `Description cannot be an empty`,
    "string.min": `Description should have a minimum length of {#limit}`,
  }),
  basePrice: Joi.number().min(1).required().messages({
    "number.base": `BasePrice should be a type of 'number'`,
    "number.min": `BasePrice should have a minimum value of {#limit}`,
    "any.required": `BasePrice is a required`,
  }),
  price: Joi.number().min(0).optional().messages({
    "number.base": `Price should be a type of 'number'`,
    "number.min": `Price should have a minimum value of {#limit}`,
  }),
  sku: Joi.string().trim().optional().messages({
    "string.base": `SKU should be a type of 'text'`,
    "string.empty": `SKU cannot be an empty`,
  }),
  categoryId: Joi.string().required().messages({
    "string.base": `Category ID should be a type of 'string'`,
    "any.required": `Category ID is a required`,
  }),
  image: Joi.any(),
}).options({ stripUnknown: true });

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(3).optional().messages({
    "string.base": `Name should be a type of 'text'`,
    "string.empty": `Name cannot be an empty`,
    "string.min": `Name should have a minimum length of {#limit}`,
  }),
  description: Joi.string().trim().optional().allow(null, "").min(10).messages({
    "string.base": `Description should be a type of 'text'`,
    "string.empty": `Description cannot be an empty`,
    "string.min": `Description should have a minimum length of {#limit}`,
  }),
  basePrice: Joi.number().min(1).optional().messages({
    "number.base": `BasePrice should be a type of 'number'`,
    "number.min": `BasePrice should have a minimum value of {#limit}`,
  }),
  price: Joi.number().min(0).optional().messages({
    "number.base": `Price should be a type of 'number'`,
    "number.min": `Price should have a minimum value of {#limit}`,
  }),
  sku: Joi.string().trim().optional().messages({
    "string.base": `SKU should be a type of 'text'`,
    "string.empty": `SKU cannot be an empty`,
  }),
  categoryId: Joi.string().optional().messages({
    "string.base": `Category ID should be a type of 'string'`,
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
        price: product.price || "",
        sku: product.sku || "",
        categoryId: product.categoryId || "",
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
      const schema = update ? updateProductSchema : productSchema;
      const { value, error } = schema.validate(formData, { abortEarly: false });

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
      {/* form fields */}
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
            className={`${formErrors.name ? "border-red-500" : ""}`}
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
            className={`${formErrors.description ? "border-red-500" : ""}`}
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
              className={`${formErrors.basePrice ? "border-red-500" : ""}`}
              onFocus={handleFocus}
            />
            {formErrors.basePrice && (
              <div className="text-red-500 text-sm">{formErrors.basePrice}</div>
            )}
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
              className={`${formErrors.price ? "border-red-500" : ""}`}
              onFocus={handleFocus}
            />
            {formErrors.price && <div className="text-red-500 text-sm">{formErrors.price}</div>}
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
              className={`${formErrors.sku ? "border-red-500" : ""}`}
              onFocus={handleFocus}
            />
            {formErrors.sku && <div className="text-red-500 text-sm">{formErrors.sku}</div>}
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
            multiple
            image={formData.image}
            onImageSelect={image => setFormData({ ...formData, image })}
            onImageRemove={() => setFormData({ ...formData, image: null })}
            className={"w-60"}
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

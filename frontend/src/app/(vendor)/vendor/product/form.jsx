"use client";
import Loader from "@/components/shared/loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Joi from "joi";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const VendorProductForm = ({
  productId,
  update,
  vendorProductData,
  vendorProductId,
  productDetails,
}) => {
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const product = update ? vendorProductData : productDetails;
  const [isLoading, setIsLoading] = useState(false);

  const productSchema = Joi.object({
    inventory: Joi.number().integer().required().min(1).messages({
      "number.base": `Inventory should be a type of 'number'`,
      "number.integer": `Inventory should be an integer`,
      "number.min": `Inventory should have a minimum value of {#limit}`,
      "any.required": `Inventory is a required`,
    }),
    price: Joi.number()
      .min(1)
      .max(product?.basePrice || 100)
      .required()
      .messages({
        "number.base": `Price should be a type of 'number'`,
        "number.min": `Price should have a minimum value of {#limit}`,
        "number.max": `Price should have a maximum value of {#limit}`,
        "any.required": `Price is a required`,
      }),
  }).options({ stripUnknown: true });

  useEffect(() => {
    if (update)
      setFormData({
        inventory: vendorProductData?.inventory || 0,
        price: vendorProductData?.price || 0,
      });
  }, [vendorProductId, update]);

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
      value.product = product._id;

      if (!update) {
        await api.post("/vendor-products", value);
        tst.success("Product created successfully");
      } else {
        await api.put(`/vendor-products/${vendorProductId}`, value, {});
        tst.success("Product updated successfully");
      }
      setFormErrors({});
    } catch (err) {
      console.log(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        tst.error(err);
      }
    } finally {
      setPending(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="bg-white flex gap-4 items-center">
        <img src={product?.images[1] || "./noimage.png"} alt={product.name} className="w-40" />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500">Price: {product.basePrice} </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white gap-6 p-4 space-y-6 ">
        <div className="flex-1">
          <Label htmlFor="inventory" className="mb-2 block">
            Inventory
          </Label>
          <Input
            type="number"
            name="inventory"
            value={formData.inventory}
            onChange={handleChange}
            id="inventory"
            disabled={pending}
            placeholder="Product Inventory"
            className={`col-span-3 ${formErrors.inventory ? "border-red-500" : ""}`}
            onFocus={handleFocus}
          />
          {formErrors.inventory && (
            <div className="text-red-500 text-sm">{formErrors.inventory}</div>
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
        {error && <div className="error">{error}</div>}
        <Button pending={pending} className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default VendorProductForm;

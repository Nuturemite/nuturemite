"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/lib/data";
import ImageUpload from "@/components/ui/image-upload";
import MultiSelect from "@/components/ui/multi-select";
import { Separator } from "../ui/separator";
import { tst } from "@/lib/utils";

const initialData = {
  name: "",
  description: "",
  basePrice: "",
  price: "",
  sku: "",
  categories: [],
  vendor: "",
  quantity: "",
  shippingDetails: {
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
  },
  details: [],
  images: [],
};

function ProductForm({ update, params, product }) {
  const { categories } = useCategories();
  const [formData, setFormData] = useState(initialData);
  const [images, setImages] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (update && product) {
      setFormData({
        ...product,
        categories: product.categories.map(cat => ({ value: cat._id, label: cat.name })),
        shippingDetails: {
          ...product.shippingDetails,
          dimensions: { ...(product.shippingDetails?.dimensions || "") },
        },
      });
    }
    setImages(product?.images || []);
  }, [update, product]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShippingChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      shippingDetails: {
        ...formData.shippingDetails,
        dimensions: {
          ...formData.shippingDetails.dimensions,
          [name]: value,
        },
      },
    });
  };

  const handleDetailsChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      details: prevState.details.map((detail, idx) =>
        idx === index ? { ...detail, [name]: value } : detail
      ),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);

    try {
      const payload = {
        ...formData,
        categories: formData.categories.map(cat => cat.value),
        images,
      };
      if (!update) {
        await api.post("/products", payload, {});
      } else {
        await api.put(`/products/${params.id}`, payload, {});
      }
      tst.success(update ? "Product updated successfully" : "Product created successfully");
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
            className="min-h-[10rem]"
          />
        </div>
        <Separator />

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
        <div>
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
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Keywords
          </Label>
          <Input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            id="keywords"
            disabled={pending}
            placeholder="Product Keywords"
            required
            minLength="3"
          />
        </div>
        <Separator />

        <div>
          <Label htmlFor="shippingWeight" className="mb-2 block">
            Shipping Weight {"(gm)"}
          </Label>
          <Input
            type="number"
            name="weight"
            value={formData.shippingDetails.weight}
            onChange={e =>
              setFormData({
                ...formData,
                shippingDetails: { ...formData.shippingDetails, weight: e.target.value },
              })
            }
            id="shippingWeight"
            disabled={pending}
            placeholder="Weight"
          />
          <div className="mt-6">
            <Label htmlFor="shippingDimensions" className="mb-2 block">
              Dimensions (cm)
            </Label>
            <div className="flex gap-6">
              <Input
                type="number"
                name="length"
                value={formData.shippingDetails.dimensions.length}
                onChange={handleShippingChange}
                id="shippingLength"
                disabled={pending}
                placeholder="Length"
              />

              <Input
                type="number"
                name="width"
                value={formData.shippingDetails.dimensions.width}
                onChange={handleShippingChange}
                id="shippingWidth"
                disabled={pending}
                placeholder="Width"
              />

              <Input
                type="number"
                name="height"
                value={formData.shippingDetails.dimensions.height}
                onChange={handleShippingChange}
                id="shippingHeight"
                disabled={pending}
                placeholder="Height"
              />
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <div className="flex mb-4 justify-between items-center">
            <Label htmlFor="details" className="block uppercase">
              Additional Details
            </Label>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                setFormData(prevData => ({
                  ...prevData,
                  details: [...prevData.details, { name: "", value: "" }],
                }))
              }
              disabled={pending}
            >
              Add Detail
            </Button>
          </div>
          {formData.details.map((detail, index) => (
            <div key={index} className="mb-2 space-y-3">
              <div className="grid grid-cols-4">
                <Label htmlFor="details" className="cols-span-1">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={detail.name}
                  onChange={e => handleDetailsChange(index, e)}
                  placeholder="Detail Name"
                  disabled={pending}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4">
                <Label htmlFor="details" className="cols-span-1">
                  Value
                </Label>
                <Textarea
                  type="text"
                  name="value"
                  value={detail.value}
                  onChange={e => handleDetailsChange(index, e)}
                  placeholder="Detail Value"
                  disabled={pending}
                  className="col-span-3"
                />
              </div>
            </div>
          ))}
        </div>
        <Separator />

        <div>
          <Label htmlFor="images" className="mb-2 block">
            Upload Images
          </Label>
          <ImageUpload
            imageUploading={imageUploading}
            setImageUploading={setImageUploading}
            images={images}
            setImages={setImages}
          />
        </div>
        {/* <div>
          <Label htmlFor="images" className="mb-2 block">
            Upload Images
          </Label>
          <SingleFileUpload
            imageUploading={thumbnailUploading}
            setImageUploading={setThumbnailUploading}
            image={thumbnail}
            setImage={setThumbnail}
          />
        </div> */}
        <Separator />

        <Button type="submit" className="mt-6" pending={pending || imageUploading}>
          {update ? "Update Product" : "Create Product"}
        </Button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </form>
  );
}

export default ProductForm;

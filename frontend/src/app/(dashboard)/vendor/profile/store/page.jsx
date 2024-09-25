"use client";
import React, { useState, useEffect } from "react";
import { Input, Label, Button } from "@/components/ui/index";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const StoreForm = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    logoUrl: "",
    bannerUrl: "",
    description: "",
    returnPolicy: "",
    shippingMethods: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const fetchVendorDetails = async () => {
      const response = await api.get("/vendors/me/details");
      setFormData(response.data.data.store);
    };
    fetchVendorDetails();
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      await api.put("/vendors/me/details", {
        store: formData,
      });
      tst.success("Store updated successfully");
    } catch (error) {
      tst.error("Failed to update store");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name.includes("socialMediaLinks")) {
      const field = name.split(".")[1];
      setFormData(prevData => ({
        ...prevData,
        socialMediaLinks: {
          ...prevData.socialMediaLinks,
          [field]: value,
        },
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [formEnabled, setFormEnabled] = useState(false);

  useEffect(() => {
    const checkFormFilled = () => {
      const isSocialMediaLinksFilled = Object.values(formData.socialMediaLinks).some(
        value => value.trim() !== ""
      );
      const isOtherFieldsFilled = Object.entries(formData).some(
        ([key, value]) =>
          key !== "socialMediaLinks" && value.trim() !== ""
      );
      setFormEnabled(isSocialMediaLinksFilled || isOtherFieldsFilled);
    };
    checkFormFilled();
  }, [formData]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 max-w-lg w-full">
        <h2 className="h4-primary">Store Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="storeName" className="w-32">Store Name</Label>
            <Input
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="logoUrl" className="w-32">Logo URL</Label>
            <Input
              id="logoUrl"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="bannerUrl" className="w-32">Banner URL</Label>
            <Input
              id="bannerUrl"
              name="bannerUrl"
              value={formData.bannerUrl}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="description" className="w-32">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="returnPolicy" className="w-32">Return Policy</Label>
            <Input
              id="returnPolicy"
              name="returnPolicy"
              value={formData.returnPolicy}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="shippingMethods" className="w-32">Shipping Methods</Label>
            <Input
              id="shippingMethods"
              name="shippingMethods"
              value={formData.shippingMethods}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <Label htmlFor="socialMediaLinks.facebook" className="w-32">Facebook Link</Label>
            <Input
              id="socialMediaLinks.facebook"
              name="socialMediaLinks.facebook"
              value={formData.socialMediaLinks.facebook}
              onChange={handleInputChange}
              className="flex-1"
            />
            <Label htmlFor="socialMediaLinks.twitter" className="w-32">Twitter Link</Label>
            <Input
              id="socialMediaLinks.twitter"
              name="socialMediaLinks.twitter"
              value={formData.socialMediaLinks.twitter}
              onChange={handleInputChange}
              className="flex-1"
            />
            <Label htmlFor="socialMediaLinks.instagram" className="w-32">Instagram Link</Label>
            <Input
              id="socialMediaLinks.instagram"
              name="socialMediaLinks.instagram"
              value={formData.socialMediaLinks.instagram}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <Button type="submit" className="w-full" disabled={!formEnabled}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StoreForm;

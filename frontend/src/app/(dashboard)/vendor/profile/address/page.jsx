// src/components/AddressForm.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Input, Label, Button } from "@/components/ui/index";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const fetchVendorDetails = async () => {
      const response = await api.get("/vendors/me/details");
      setFormData(response.data.data.address);
    };
    fetchVendorDetails();
  }, []);
  const [formEnabled, setFormEnabled] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      await api.put("/vendors/me/details", {
        address: formData,
      });
      tst.success("Address updated successfully");
    } catch (error) {
      tst.error("Failed to update address");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    setFormEnabled(Object.values(formData).every(value => value.trim() !== ""));
  }, [formData]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 max-w-lg w-full">
        <h2 className="h4-primary">Address Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="street" className="w-32">
              Street
            </Label>
            <Input
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="city" className="w-32">
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="state" className="w-32">
              State
            </Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="postalCode" className="w-32">
              Postal Code
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="country" className="w-32">
              Country
            </Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <Button type="submit" pending={pending} className="w-full " disabled={!formEnabled}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;

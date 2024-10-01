// src/components/ProfilePage.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Input, Label, Button } from "@/components/ui/index";
import api from "@/lib/api";

const ProfilePage = () => {
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    contactNumber: "",
  });
  const [originalData, setOriginalData] = useState({ ...formData });
  const [formEnabled, setFormEnabled] = useState(false);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const fetchVendorDetails = async () => {
      const response = await api.get("/vendors/me/details");
      setFormData(response.data.data);
      setOriginalData(response.data.data);
    };
    fetchVendorDetails();
  }, []);

  useEffect(() => {
    setFormEnabled(JSON.stringify(formData) !== JSON.stringify(originalData));
  }, [formData, originalData]);

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formEnabled) {
      setPending(true);
      setOriginalData(formData);
      try {
        const response = await api.put("/vendors/me/details", formData);
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white  p-6 max-w-lg w-full">
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="image" className="relative">
            <img
              src={image || "/avatar.png"}
              alt="Profile"
              className="w-32 h-32  border-4 border-gray-300 "
            />
            <input
              name="image"
              id="image"
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <h2 className="mt-4 text-2xl font-semibold">{formData.name}</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="name" className="w-32 ">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="contactNumber" className="w-32 ">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="businessName" className="w-32 ">
              Business Name
            </Label>
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <Button type="submit" className="w-full" disabled={!formEnabled}>
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

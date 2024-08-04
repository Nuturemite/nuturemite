// src/components/ProfilePage.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Input, Label, Button } from "@/components/ui/index";

const ProfilePage = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    contactNumber: "",
    email: "",
  });
  const [originalData, setOriginalData] = useState({ ...formData });
  const [formEnabled, setFormEnabled] = useState(false);

  useEffect(() => {
    const fetchedData = {
      username: "JohnDoe",
      contactNumber: "123-456-7890",
      email: "john.doe@example.com",
    };
    setFormData(fetchedData);
    setOriginalData(fetchedData);
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

  const handleSubmit = e => {
    e.preventDefault();
    if (formEnabled) {
      setOriginalData(formData);
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
          <h2 className="mt-4 text-2xl font-semibold">JohnDoe</h2>
          <p className="text-gray-500">User Role: Admin</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="username" className="w-32 ">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="contactNumber" className="w-32 ">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="email" className="w-32 ">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
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

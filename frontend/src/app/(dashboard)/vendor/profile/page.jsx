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
    <div>
      <div className="flex flex-col items-center bg-white p-6">
        <div className="mb-4">
          <label htmlFor="image">
            <img
              src={image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300"
            />
          </label>
          <input
            name="image"
            id="image"
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <Label htmlFor="username" className="w-32">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <Label htmlFor="contactNumber" className="w-32">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-4 ">
              <Label htmlFor="email" className="w-32">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1"
              />
            </div>
          </div>
          <Button type="submit" className="mt-10" disabled={!formEnabled}>
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

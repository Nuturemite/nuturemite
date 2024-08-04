// src/components/BusinessLicenseForm.jsx
"use client";
import React, { useEffect, useState } from "react";
import { Input, Label, Button } from "@/components/ui/index";

const BusinessLicenseForm = () => {
  const [formData, setFormData] = useState({
    licenseNumber: "",
    issuedBy: "",
    issuedDate: "",
    expiryDate: "",
    documentUrl: "",
  });
  const [documentPreview, setDocumentPreview] = useState(null);
  const [formEnabled, setFormEnabled] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevData => ({
        ...prevData,
        documentUrl: e.target.files[0].name,
      }));
      setDocumentPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  useEffect(() => {
    setFormEnabled(
      Object.values(formData).some(value => value.trim() !== "")
    );
  }, [formData]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 max-w-lg w-full">
        <h2 className="h4-primary">Business License Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="licenseNumber" className="w-32 ">License Number</Label>
            <Input
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="issuedBy" className="w-32 ">Issued By</Label>
            <Input
              id="issuedBy"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="issuedDate" className="w-32 ">Issued Date</Label>
            <Input
              id="issuedDate"
              name="issuedDate"
              type="date"
              value={formData.issuedDate}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="expiryDate" className="w-32 ">Expiry Date</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="documentUrl" className="w-32 ">Upload Document</Label>
            <input
              id="documentUrl"
              name="documentUrl"
              type="file"
              accept="application/pdf,application/msword,application/vnd.ms-excel"
              onChange={handleFileChange}
              className="flex-1"
            />
          </div>
          {documentPreview && (
            <div className="mt-4">
              <a href={documentPreview} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Preview Document
              </a>
            </div>
          )}
          <Button type="submit" className="w-full" disabled={!formEnabled}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BusinessLicenseForm;

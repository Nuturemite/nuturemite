"use client";
import React, { useEffect, useState } from "react";
import { Input, Label, Button } from "@/components/ui/index";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const BankAccountForm = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    branchCode: "",
  });
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const fetchVendorDetails = async () => {
      const response = await api.get("/vendors/me/details");
      setFormData(response.data.data.bankAccount);
    };
    fetchVendorDetails();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      await api.put("/vendors/me/details", {
        bankAccount: formData,
      });
      tst.success("Bank account updated successfully");
    } catch (error) {
      tst.error("Failed to update bank account");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const [formEnabled, setFormEnabled] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormEnabled(Object.values(formData).every(value => value.trim() !== ""));
  }, [formData]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 max-w-lg w-full">
        <h2 className="h4-primary">Bank Account Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="accountNumber" className="w-32 ">
              Account Number
            </Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="bankName" className="w-32 ">
              Bank Name
            </Label>
            <Input
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="branchCode" className="w-32 ">
              IFSC Code
            </Label>
            <Input
              id="branchCode"
              name="branchCode"
              value={formData.branchCode}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <Button type="submit" pending={pending} className="w-full" disabled={!formEnabled}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BankAccountForm;

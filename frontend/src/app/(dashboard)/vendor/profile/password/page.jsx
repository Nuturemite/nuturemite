"use client";
import React, { useState, useEffect } from "react";
import { Input, Label, Button } from "@/components/ui/index";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [formEnabled, setFormEnabled] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [pending, setPending] = useState(false);
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordsMatch(false);
      return;
    }
    setPending(true);
    try {
      await api.put("/vendors/me/password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      tst.success("Password updated successfully");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    setFormEnabled(
      formData.currentPassword.trim() !== "" &&
        formData.newPassword.trim() !== "" &&
        formData.confirmNewPassword.trim() !== ""
    );
  }, [formData]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 max-w-lg w-full">
        <h2 className="h4-primary">Change Password Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="currentPassword" className="w-32 ">
              Current Password
            </Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="newPassword" className="w-32 ">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="confirmNewPassword" className="w-32 ">
              Confirm New Password
            </Label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          {!passwordsMatch && <p className="text-red-500">Passwords do not match.</p>}
          <Button type="submit" className="w-full" disabled={!formEnabled} pending={pending}>
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

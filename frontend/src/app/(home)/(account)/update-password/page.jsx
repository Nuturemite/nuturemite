"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import api from "@/lib/api";
import { useUser } from "@/lib/data";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/common/error";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/custrom-select";

export default function UpdatePassword() {
  const { user, isLoading, error } = useUser();
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword != formData.confirmNewPassword) {
      tst.error("Passwords Do not match");
      return;
    }
    try {
      setPending(true);
      await api.put(`/auth/update-password/${user?._id}`, formData);
      tst.success("Password Updated");
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="h2-primary">Update Details</h2>
      <form
        className="space-y-4 w-full bg-white p-4"
        onSubmit={handleSubmit}
        disabled={pending}
      >
        <div>
          <Label htmlFor="name" className="mb-2">
            Current Password
          </Label>
          <Input
            type="password"
            name="currentPassword"
            id="name"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="name" className="mb-2">
            New Password
          </Label>
          <Input
            type="password"
            name="newPassword"
            id="mobile"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="name" className="mb-2">
            Confirm New Password
          </Label>
          <Input
            type="password"
            name="confirmNewPassword"
            id="mobile"
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>

        <Button pending={pending} type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}

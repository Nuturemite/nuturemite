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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPassword({ params }) {
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { token } = params;

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
      toast.error("Passwords Do not match");
      return;
    }
    try {
      setPending(true);
      await api.post(`/auth/reset-password/${token}`, formData);
      tst.success("Password Updated");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  // if (error) return <Error />;

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="h2-primary">Enter New Password</h2>
      <form
        className="space-y-4 w-full bg-white p-4"
        onSubmit={handleSubmit}
        disabled={pending}
      >
        <div>
          <Label htmlFor="name" className="mb-2">
            New Password
          </Label>
          <Input
            type="password"
            name="newPassword"
            id="mobile"
            placeholder="New Password"
            value={formData.newPassword || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="mobile2" className="mb-2">
            Confirm New Password
          </Label>
          <Input
            type="password"
            name="confirmNewPassword"
            id="mobile2"
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword || ""}
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

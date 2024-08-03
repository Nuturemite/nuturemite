"use client";
import { useAuthContext } from "@/context/authprovider";
import { tst } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    role: "user",
  });
  const [pending, setPending] = useState(false);
  const { login } = useAuthContext();
  const router = useRouter();

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleChange = event => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    setFormData(prevData => ({
      ...prevData,
      role: selectedRole === "vendor" ? "vendor" : "user",
    }));
  };

  const handleSignup = async e => {
    e.preventDefault();
    try {
      setPending(true);

      const response = await api.post("/auth/register", formData );
      const user = response.data.user;
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        localStorage.setItem("token", token);
        login();
        if (user.role === "vendor") router.push("/vendor-register");
        else router.push("/");
        toast.success(`Signup ${formData.role} success`);
      }
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex justify-between items-center w-full mb-10 ">
      <div className="w-full  mx-auto max-w-sm p-4 bg-slate-200 border border-slate-300  shadow sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSignup} disabled={pending}>
          <h5 className="text-xl font-medium text-slate-800">Create new Account</h5>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="name@gmail.com"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Your password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="radio"
                name="role"
                id="customer"
                value="user"
                checked={role === "user"}
                onChange={handleRoleChange}
                required
              />
              <Label htmlFor="customer">Login as Customer</Label>
            </div>
            <div className="flex space-x-2">
              <input
                type="radio"
                name="role"
                id="vendor"
                value="vendor"
                checked={role === "vendor"}
                onChange={handleRoleChange}
                required
              />
              <Label htmlFor="vendor">Login as Vendor</Label>
            </div>
          </div>
          <Button className="w-full" pending={pending}>
            Create new account
          </Button>
          <div>
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-700 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

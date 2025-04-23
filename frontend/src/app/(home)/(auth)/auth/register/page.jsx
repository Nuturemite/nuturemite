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
import { Eye, EyeOff } from 'lucide-react';
function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
  });
  const [pending, setPending] = useState(false);
  const { login } = useAuthContext();
  const router = useRouter();
const [showPassword, setShowPassword] = useState(false);
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(prevShow => !prevShow);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      await api.post("/auth/register", formData);
      router.push("/auth/email-sent");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex justify-between items-center w-full mb-10 ">
      <div className="w-full mx-auto max-w-sm p-4 bg-slate-200 border border-slate-300 shadow sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSignup} disabled={pending}>
          <h5 className="text-xl font-medium text-slate-800">
            Create new Account
          </h5>

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
            <Label htmlFor="username">Email</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="user@email.com"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-slate-800"
            >
              Password
            </label>
            <div className="relative">
            <style>
          {`
            /* Hide the browser's default password toggle */
            input::-ms-reveal,
            input::-ms-clear,
            input::-webkit-contacts-auto-fill-button,
            input::-webkit-credentials-auto-fill-button {
              display: none !important;
            }
            
            /* For Webkit browsers like Chrome/Safari */
            input[type="password"]::-webkit-inner-spin-button,
            input[type="password"]::-webkit-outer-spin-button,
            input[type="password"]::-webkit-search-cancel-button,
            input[type="password"]::-webkit-search-decoration {
              -webkit-appearance: none;
              margin: 0;
            }
            
            /* Additional rule to hide the password reveal button in Chrome/Edge */
            input[type="password"]::-webkit-textfield-decoration-container {
              visibility: hidden;
            }
          `}
        </style>
 <input
               type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-slate-300 border border-slate-300 text-slate-700 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-slate-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-600 hover:text-slate-800 white"
          onClick={togglePasswordVisibility}
          tabIndex="-1"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
            </div>
           
          </div>

          <Button className="w-full" pending={pending}>
            Create new account
          </Button>
          <div>
            Want to become a vendor?{" "}
            <Link
              href="/vendor-register"
              className="text-blue-700 hover:underline"
            >
              Click here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

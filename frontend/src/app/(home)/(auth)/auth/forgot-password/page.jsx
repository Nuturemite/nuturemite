"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authprovider";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCartContext } from "@/context/cartprovider";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const response = await api.post("/auth/forgot-password", formData);
      router.push("/auth/email-sent");
      tst.success("Please Check your mail");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex justify-between items-center  w-full ">
      <div className="w-full  mx-auto max-w-sm p-4 bg-slate-200 border border-slate-400  shadow sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSignin}>
          <h5 className="text-xl font-medium text-slate-800">
            Forgot Password?
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-slate-800"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="bg-slate-300 border border-slate-300 text-slate-700 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <Button className="w-full" pending={pending}>
            Send Reset Email
          </Button>
          <div className="text-sm text-center font-medium text-slate-800">
            <Link
              href="/auth/login"
              className="text-blue-700 text-center hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

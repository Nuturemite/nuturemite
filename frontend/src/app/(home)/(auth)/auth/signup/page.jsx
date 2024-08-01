"use client";
import PendingButton from "@/components/shared/loadbtn";
import { useAuthContext } from "@/context/authprovider";
import { tst } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
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

  const handleSignup = async e => {
    e.preventDefault();
    try {
      setPending(true);
      const response = await api.post("/auth/register", formData);
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        localStorage.setItem("token", token);
      }
      login();
      router.push("/");
      toast.success("Signup success");
      setPending(false);
    } catch (error) {
      setPending(false);
      tst.error(error);
    }
  };

  return (
    <div className="flex justify-between items-center w-full mb-10 ">
      <div className="w-full  mx-auto max-w-sm p-4 bg-slate-200 border border-slate-300  shadow sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSignup}>
          <h5 className="text-xl font-medium text-slate-800">Create new Account</h5>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-800">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-slate-300 border border-slate-300 text-slate-800 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-600"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-800">
              Your username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="bg-slate-300 border border-slate-300 text-slate-800 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-600"
              placeholder="name@company.com"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-800">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-slate-300 border border-slate-300 text-slate-800 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-600"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button className="w-full" pending={pending}>Create new account</Button>
          <div className="text-sm font-medium text-slate-800">
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

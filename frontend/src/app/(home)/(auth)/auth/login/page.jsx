"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authprovider";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCartContext } from "@/context/cartprovider";
import { Eye, EyeOff } from 'lucide-react';
function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const { login } = useAuthContext();
  const router = useRouter();
  const { emptyCart } = useCartContext();
  const { cart } = useCartContext();

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
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const response = await api.post("/auth/login", formData);
      const user = response.data.user;
      const vendor = response.data.vendor;
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        localStorage.setItem("token", token);
      }
      login();
      if (cart.length > 0) await api.post("/cart/save", { cartItems: cart });
      emptyCart();
      if ((user.role === "vendor" && vendor) || user.role === "admin")
        router.push("/vendor");
      else if (user.role === "vendor") router.push("/vendor-register");
      else router.push("/");
      tst.success("Signin success");
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
            Sign in to our platform
          </h5>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-slate-800"
            >
              Email
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-slate-300 border border-slate-300 text-slate-700 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="Enter your email"
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
          <div className="flex items-start">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-700 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Button className="w-full" pending={pending}>
            Login to your Account
          </Button>
          <div className="text-sm font-medium text-slate-800">
            Not registered?{" "}
            <Link
              href="/auth/register"
              className="text-blue-700 hover:underline"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

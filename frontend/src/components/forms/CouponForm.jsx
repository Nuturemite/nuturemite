"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const initialCouponData = {
  code: "",
  description: "",
  discount: "",
  expiryDate: "",
};

const generateCouponCode = () => {
  return 'COUPON-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function CouponForm() {
  const [couponData, setCouponData] = useState(initialCouponData);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setCouponData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);

    try {
      await api.post("/coupons", couponData);
      tst.success("Coupon created successfully");
      setCouponData(initialCouponData);
    } catch (err) {
      tst.error(err.message || "Failed to create coupon");
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="p-2 md:p-10 md:max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div className="grid gap-6 py-4">
        <div>
          <Label htmlFor="code" className="mb-2 block">
            Coupon Code
          </Label>
         <div className="flex items-center gap-2 ">
            <Input
              type="text"
              name="code"
              value={couponData.code}
              onChange={handleChange}
              id="code"
              disabled={pending}
              placeholder="Enter coupon code"
              required
            />
            <Button type="button" onClick={() => setCouponData(prev => ({ ...prev, code: generateCouponCode() }))}>
              Generate Code
            </Button>
         </div>
        </div>

        <div>
          <Label htmlFor="description" className="mb-2 block">
            Description
          </Label>
          <Textarea
            name="desc"
            value={couponData.description}
            onChange={handleChange}
            disabled={pending}
            id="description"
            placeholder="Write a description for the coupon..."
            required
            className="min-h-[6rem]"
          />
        </div>

        <div>
          <Label htmlFor="discount" className="mb-2 block">
            Discount Percentage
          </Label>
          <Input
            type="number"
            name="discount"
            value={couponData.discount}
            onChange={handleChange}
            id="discount"
            disabled={pending}
            placeholder="Enter discount percentage"
            required
            min="0"
            max="100"
          />
        </div>

        <div>
          <Label htmlFor="expiryDate" className="mb-2 block">
            Expiry Date
          </Label>
          <Input
            type="date"
            name="expiryDate"
            value={couponData.expiryDate}
            onChange={handleChange}
            id="expiryDate"
            disabled={pending}
            required
          />
        </div>

        <Button type="submit" className="mt-4" pending={pending}>
          Create Coupon
        </Button>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </div>
    </form>
  );
}

export default CouponForm;

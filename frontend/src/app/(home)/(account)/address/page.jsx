"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AddAddress() {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [pending, setPending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      await api.post("/users/address", formData);
      tst.success("Address Added");
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="h2-primary">Add Address</h2>
      <form className="space-y-4 w-full bg-white p-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="street" className="mb-2">
            Street
          </Label>
          <Input
            type="text"
            name="street"
            id="street"
            placeholder="E.g. 123 Main St"
            value={formData.street}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="city" className="mb-2">
            City
          </Label>
          <Input
            type="text"
            name="city"
            id="city"
            placeholder="E.g. New York"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="state" className="mb-2">
            State
          </Label>
          <Input
            type="text"
            name="state"
            id="state"
            placeholder="E.g. NY"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="zip" className="mb-2">
            ZIP Code
          </Label>
          <Input
            type="text"
            name="zip"
            id="zip"
            placeholder="E.g. 10001"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="country" className="mb-2">
            Country
          </Label>
          <Input
            type="text"
            name="country"
            id="country"
            placeholder="E.g. USA"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <Button pending={pending} type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}

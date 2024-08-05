"use client";
import React, { useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomSelect from "../ui/custrom-select";

function UserForm({ onUpdate, user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = e => {
    e.preventDefault();
    onUpdate(user.id, formData);
  };

  return (
    <form onSubmit={handleUpdate}>
      <DialogHeader>
        <DialogTitle>Update user</DialogTitle>
        <DialogDescription>Update user name and role</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="name"
            placeholder="Laptop"
            className="col-span-3"
            disabled={true}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Role
          </Label>
          <CustomSelect
            options={[
              { id: "admin", name: "Admin" },
              { id: "vendor", name: "Vendor" },
              { id: "user", name: "User" },
            ]}
            value={formData.role}
            onChange={value => setFormData({ ...formData, role: value })}
            name="role"
            placeholder="Select a role"
            className={"col-span-3"}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Update User</Button>
      </DialogFooter>
    </form>
  );
}

export default UserForm;

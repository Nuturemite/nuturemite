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

export default function UpdateUser() {
  const { user, isLoading, error } = useUser();
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        gender: user?.gender || "",
        bio: "",
        dateOfBirth: user?.dateOfBirth || "",
        mobile: user?.mobile || "",
      });
    }
  }, [user]);

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
      await api.put("/users/profile", formData);
      tst.success("Profile Updated");
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
      <form className="space-y-4 w-full bg-white p-4" onSubmit={handleSubmit} disabled={pending}>
        <div>
          <Label htmlFor="name" className="mb-2">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="E.g. Anoop Singh"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="name" className="mb-2">
            Mobile
          </Label>
          <Input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="E.g. 9876543210"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="gender" className="mb-2">
            Gender
          </Label>
          <CustomSelect
            options={[
              { id: "male", name: "Male" },
              { id: "female", name: "Female" },
            ]}
            placeholder={"Select your gender"}
            value={formData.gender}
            onChange={value => setFormData({ ...formData, gender: value })}
          />
        </div>
        {/*   <div>
          <Label htmlFor="bio" className="mb-2">
            Bio
          </Label>
          <Textarea
            name="bio"
            id="bio"
            placeholder="Tell us something about yourself..."
            value={formData.bio}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <Label htmlFor="dateOfBirth" className="mb-2">
            Date of Birth
          </Label>
          <Input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={formData.dateOfBirth}
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

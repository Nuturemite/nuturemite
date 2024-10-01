"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const initialBannerData = {
  title: "",
  image: "",
};

function BannerForm() {
  const [bannerData, setBannerData] = useState(initialBannerData);
  const [pending, setPending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setBannerData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);

    try {
      await api.post("/banners", bannerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      tst.success("Banner created successfully");
      setBannerData(initialBannerData);
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="p-2 md:p-10 md:max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div className="grid gap-6 py-4">
        <div>
          <Label htmlFor="image" className="mb-2 block">
            Upload Image
          </Label>
          <Input
            type="file"
            name="image"
            onChange={e => setBannerData(prev => ({ ...prev, image: e.target.files[0] }))}
            id="image"
            disabled={pending}
          />
        </div>

        <div>
          <Label htmlFor="link" className="mb-2 block">
            Link
          </Label>
          <Input
            type="url"
            name="link"
            value={bannerData.link}
            onChange={handleChange}
            id="link"
            disabled={pending}
            placeholder="Enter link for the banner"
          />
        </div>

        <Button type="submit" className="mt-4" pending={pending}>
          Create Banner
        </Button>
      </div>
    </form>
  );
}

export default BannerForm;

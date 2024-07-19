"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

function UploadImage({ className, image, onImageSelect, onImageRemove, ...props }) {
  const handleImageSelect = e => {
    const file = e.target.files[0];
    onImageSelect(file);
  };

  const handleRemoveImage = () => {
    onImageRemove();
  };

  return (
    <div className="relative">
      <label
        htmlFor="file-upload"
        className={cn(
          "border-2 border-dashed w-full aspect-square rounded-lg flex justify-center items-center cursor-pointer",
          className
        )}
      >
        {image ? (
          <div className="relative">
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 m-2 p-1 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Icon icon="ic:baseline-close" width={20} height={20} />
            </button>
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt="Uploaded Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <Icon
            fontSize={40}
            className="text-slate-500"
            icon="fluent:image-28-regular"
          />
        )}
      </label>
      <input
        {...props}
        accept="image/*"
        onChange={handleImageSelect}
        type="file"
        name="image"
        id="file-upload"
        className="hidden"
      />
    </div>
  );
}

export default UploadImage;

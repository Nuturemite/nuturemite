import React, { useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import Image from "next/image";

const SingleFileUpload = ({ image,setImage }) => {
  const [imageUploading, setImageUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const uploadImage = async imageFile => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await api.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (error) {
      console.error("Image upload failed:", error);
      tst.error(error);
    }
  };

  const handleImageChange = async event => {
    setImageUploading(true);
    const file = event.target.files[0];
    if (file) {
      const uploadedImage = await uploadImage(file);
      setImage(uploadedImage);
    }
    setImageUploading(false);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageSrc(null);
  };

  const handleDragOver = event => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = async event => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const uploadedImage = await uploadImage(file);
      setImage(uploadedImage);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md">
      <div className="flex justify-between items-center">
        {imageSrc && (
          <Trash className="w-8 h-8 text-red-500 cursor-pointer" onClick={handleRemoveImage} />
        )}
      </div>
      <div
        className={`flex flex-col items-center justify-center border border-dashed rounded-md p-4 ${
          dragActive ? "bg-gray-200" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imageUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
            <p className="mt-2">Uploading...</p>
          </div>
        ) : imageSrc ? (
          <div className="relative">
            <img src={imageSrc} alt="Uploaded" className="w-48 h-48 object-cover rounded-md" />
          </div>
        ) : (
          <label htmlFor="image-upload" className="cursor-pointer">
            <p className="text-gray-500 text-sm">Drag & drop an image here or click to upload</p>
          </label>
        )}
      </div>
      <input
        type="file"
        id="image-upload"
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default SingleFileUpload;

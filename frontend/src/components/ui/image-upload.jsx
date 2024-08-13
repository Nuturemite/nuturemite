import React, { useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import api from "@/lib/api";
import Image from "next/image";
import { AlertBox } from "./alert-dialog";

const FileImagePlus = ({ images, setImages, imageUploading, setImageUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);

  const handleImageChange = async event => {
    setImageUploading(true);
    try {
      const response = await api.post(
        "/upload/images",
        { images: event.target.files },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImages(prevImages => [...prevImages, ...response.data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveAll = () => {
    setImages([]);
  };

  const handleRemoveImage = index => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleDragStart = index => {
    setDraggedImageIndex(index);
  };

  const handleDragOver = event => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = event => {
    event.preventDefault();
    setDragActive(false);

    const updatedImages = [...images];
    const draggedImage = updatedImages[draggedImageIndex];

    // Remove the dragged image from the original position
    updatedImages.splice(draggedImageIndex, 1);
    const dropIndex = event.target.closest(".image-item").dataset.index; // Get the drop index from the closest element
    updatedImages.splice(dropIndex, 0, draggedImage); // Insert the dragged image at the new position

    setImages(updatedImages);
    setDraggedImageIndex(null); // Reset the dragged image index
  };

  return (
    <div className="bg-white">
      <div className="flex border gap-8 p-4 justify-around border-gray-300">
        <label htmlFor="image-upload">
          <ImagePlus className="w-9 h-9 text-green-500 cursor-pointer" />
        </label>
        <AlertBox onClick={handleRemoveAll}>
          <Trash className="w-9 h-9 text-red-500 cursor-pointer" />
        </AlertBox>
      </div>
      <div className="border-gray-300 border ">
        {imageUploading ? (
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
              <p className="mt-4">Uploading...</p>
            </div>
          </div>
        ) : images.length === 0 ? (
          <div
            className={`p-4 flex flex-col items-center justify-center ${
              dragActive ? "bg-gray-200" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label htmlFor="image-upload" className="flex flex-col items-center">
              <Image width={300} height={300} src="/upload.png" alt="" />
              <p className="text-slate-500 text-sm w-[60%] text-center">
                Drag and drop images here or click to upload
              </p>
            </label>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-10 p-4">
            {images.map((imagesrc, index) => (
              <div
                key={index}
                className="relative image-item"
                data-index={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <img src={imagesrc} alt="Preview" className="w-full" />
                <AlertBox onClick={() => handleRemoveImage(index)}>
                  <Trash size={24} className="absolute top-0 right-0 text-red-500 cursor-pointer" />
                </AlertBox>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
          multiple
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default FileImagePlus;

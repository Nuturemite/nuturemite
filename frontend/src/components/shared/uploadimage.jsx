import React, { useState } from "react";
import { Images, ImagePlus, XCircle } from "lucide-react";
import api from "@/lib/api";

const FileImagePlus = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageChange = async event => {
    const selectedImages = Array.from(event.target.files);
    const uploadedImages = [];

    setUploading(true);

    // const formData = new FormData();
    // formData.append("images", selectedImages);

    try {
      const response = await api.post(
        "/upload/images",
        { images: selectedImages },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      return;

      setUploadedImages(prevImages => [...prevImages, ...response.data.urls]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setImages(prevImages => [...prevImages, ...uploadedImages]);
    setUploading(false);
  };

  const handleRemoveAll = () => {
    setImages([]);
  };

  const handleRemoveImage = index => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white">
      <div className="flex border gap-8 p-4 justify-around border-gray-300">
        <label htmlFor="image-upload">
          <ImagePlus className="w-9 h-9 text-green-600 cursor-pointer" />
        </label>
        <XCircle className="w-9 h-9 text-red-600 cursor-pointer" onClick={handleRemoveAll} />
      </div>
      <div className="border-gray-300 border-b border-x">
        {images.length === 0 && !uploading ? (
          <div className={`p-8 flex flex-col items-center justify-center`}>
            <label htmlFor="image-upload" className="flex flex-col items-center">
              <Images className="h-20 w-20 cursor-pointer text-gray-500 bg-slate-200 p-4 rounded-full mb-4" />
              <p className="text-slate-500">Drag and drop images here or click to upload</p>
            </label>
          </div>
        ) : uploading ? (
          <div className="p-8 flex flex-col items-center justify-center">
            <p className="text-slate-500">Uploading images...</p>
          </div>
        ) : (
          <div className="mt-4 space-y-2 px-4 pb-2">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative flex justify-between items-center">
                <img src={image.url} alt="Preview" className="w-24" />
                <XCircle
                  className="h-8 w-8 text-red-500 font-thin cursor-pointer"
                  onClick={() => handleRemoveImage(index)}
                />
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

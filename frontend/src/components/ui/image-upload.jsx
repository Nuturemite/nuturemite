import React, { useState } from "react";
import { Images, ImagePlus, CircleX, XCircle } from "lucide-react";

const FileImagePlus = ({images,setImages}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    const updatedImages = selectedImages.map((image) => ({
      image,
      preview: URL.createObjectURL(image),
    }));
    setImages((prevImages) => [...prevImages, ...updatedImages]);
  };

  const handleRemoveAll = () => {
    setImages([]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const selectedImages = Array.from(event.dataTransfer.files);
    const updatedImages = selectedImages.map((image) => ({
      image,
      preview: URL.createObjectURL(image),
    }));
    setImages((prevImages) => [...prevImages, ...updatedImages]);
  };

  return (
    <div className="bg-white">
      <div className="flex border gap-8 p-4 justify-around border-gray-300">
        <label htmlFor="image-upload">
          <ImagePlus className="w-9 h-9 text-green-600 cursor-pointer" />
        </label>
        <CircleX className="w-9 h-9 text-red-600 cursor-pointer" onClick={handleRemoveAll} />
      </div>
      <div className="border-gray-300 border-b border-x">
        {images.length === 0 ? (
          <div
            className={`p-8 flex flex-col items-center justify-center ${
              dragActive ? "bg-gray-200" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label htmlFor="image-upload" className="flex flex-col items-center">
              <Images className="h-20 w-20 cursor-pointer text-gray-500 bg-slate-200 p-4 rounded-full mb-4" />
              <p className="text-slate-500">Drag and drop images here or click to upload</p>
            </label>
          </div>
        ) : (
          <div className="mt-4  space-y-2 px-4 pb-2">
            {images.map((imageObj, index) => (
              <div key={index} className="relative flex justify-between items-center">
                <img src={imageObj.preview} alt="Preview" className="w-24" />
                <div className="mt-2 text-sm text-gray-700">
                  <p className="w-20 break-words">{imageObj.image?.name || "Undefined"}</p>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <p className="px-2 py-1 bg-orange-500 text-white">{(imageObj.image?.size / 1024).toFixed(2)} KB</p>
                </div>
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

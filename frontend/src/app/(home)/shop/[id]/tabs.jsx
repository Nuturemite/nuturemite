"use client";
import { Avatar } from "@/components/shared/avatar";
import { useState } from "react";

const ProductDesc = ({ product }) => (
  <div className="py-4">
    <h2 className="text-2xl font-medium">Product Description</h2>
    <p className="mt-4">{product?.description}</p>
  </div>
);

const ProductInfo = ({ product }) => (
  <div className="py-4">
    <h2 className="text-2xl font-medium">{product.name}</h2>
    <ul className="mt-4 space-y-2">
      <li>
        <span className="font-medium">Brand:</span> Nuturemite
      </li>
      <li>
        <span className="font-medium">Type:</span> Supplement
      </li>
      <li>
        <span className="font-medium">MRP:</span> ₹{product.basePrice}
      </li>
      <li>
        <span className="font-medium">Sales Price:</span> ₹{product.price}
      </li>
      <li>
        <span className="font-medium">Description:</span> {product.description}
      </li>
      <li>
        <span className="font-medium">Benefits:</span> {product.benefits}
      </li>
      <li>
        <span className="font-medium">Use Instruction:</span> {product.useInstruction}
      </li>
      <li>
        <span className="font-medium">Safety Precaution:</span> {product.safetyPrecaution}
      </li>
      <li>
        <span className="font-medium">Ingredients:</span> {product.ingredients}
      </li>
    </ul>
    <div className="mt-4">
      <h3 className="text-xl font-medium">Images</h3>
      <div className="flex space-x-2">
        {product.images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Product image ${index + 1}`}
            className="w-24 h-24 object-cover"
          />
        ))}
      </div>
    </div>
  </div>
);

const Reviews = () => (
  <div className="py-4">
    <h2 className="text-2xl font-medium">Reviews</h2>
    <ul className="mt-4 space-y-4">
      <li>
        <div className="flex items-center">
          <Avatar name="John Doe" />
          <div className="ml-4">
            <span className="font-semibold">John Doe</span>
            <p className="mt-1 text-sm text-slate-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptas.
            </p>
          </div>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <Avatar name="Jane Doe" />
          <div className="ml-4">
            <span className="font-semibold">Jane Doe</span>
            <p className="mt-1 text-sm text-slate-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptas.
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

const Tabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState(1);

  // Array of tab data
  const tabs = [
    { id: 1, label: "Description", content: <ProductDesc product={product} /> },
    { id: 2, label: "Information", content: <ProductInfo product={product} /> },
    { id: 3, label: "Reviews", content: <Reviews product={product} /> },
  ];

  const handleTabClick = tabId => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-white mt-6 p-6">
      <ul className="flex flex-wrap text-sm font-medium border-b text-center text-gray-500  border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabs.map(tab => (
          <li key={tab.id} className="me-2">
            <button
              onClick={() => handleTabClick(tab.id)}
              className={`inline-block px-6 py-4 ${
                activeTab === tab.id
                  ? "text-primary bg-gray-100 border-x border-t border-b-white  "
                  : "hover:text-gray-600 hover:bg-gray-50"
              } dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:outline-none`}
              disabled={tab.disabled}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 bg-white ">{tabs.find(tab => tab.id === activeTab)?.content}</div>
    </div>
  );
};

export default Tabs;

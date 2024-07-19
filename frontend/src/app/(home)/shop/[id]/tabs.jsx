"use client";
import { Avatar } from "@/components/shared/avatar";
import { useState } from "react";

const ProductDesc = ({ product }) => (
  <div className="py-4">
    <h2 className="text-2xl font-medium">Product Description</h2>
    <p className="mt-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi id pariatur perferendis qui
      consequatur fugit iure fugiat nobis sit saepe!
    </p>
  </div>
);

const RandomProductInfo = () => (
  <div className="py-4">
    <h2 className="text-2xl font-medium">Random Product Info</h2>
    <ul className="mt-4 space-y-2">
      <li>
        <span className="font-medium">Brand:</span> {["Nike", "Adidas", "Vans"][Math.floor(Math.random() * 3)]}
      </li>
      <li>
        <span className="font-medium">Model:</span> {["Air Force 1", "Yeezy", "Old Skool"][Math.floor(Math.random() * 3)]}
      </li>
      <li>
        <span className="font-medium">Year:</span> {Math.floor(Math.random() * (2022 - 2010 + 1) + 2010)}
      </li>
      <li>
        <span className="font-medium">Type:</span> {["Sneakers", "Boots", "Sandals"][Math.floor(Math.random() * 3)]}
      </li>
    </ul>
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
            <p className="mt-1 text-sm text-slate-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptas.</p>
          </div>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <Avatar name="Jane Doe" />
          <div className="ml-4">
            <span className="font-semibold">Jane Doe</span>
            <p className="mt-1 text-sm text-slate-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptas.</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  // Array of tab data
  const tabs = [
    { id: 1, label: "Description", content: <ProductDesc /> },
    { id: 2, label: "Information", content: <RandomProductInfo /> },
    { id: 3, label: "Reviews", content: <Reviews /> },
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

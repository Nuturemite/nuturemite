"use client";
import { Avatar } from "@/components/shared/avatar";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow,TableHeader } from '@/components/ui/table';
const ProductDesc = ({ product }) => (
  <div className="py-4">
    <h2 className="text-2xl font-medium">Product Description</h2>
    <p className="mt-4">{product?.description}</p>
  </div>
);

const ProductInfo = ({ product }) => (
  <div className="py-4">
    <h2 className="text-2xl font-medium">{product.name}</h2>
    <Table className="mt-4 w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Attribute</TableHead>
          <TableHead className="font-medium">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Brand:</TableCell>
          <TableCell>Nuturemite</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Type:</TableCell>
          <TableCell>Supplement</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">MRP:</TableCell>
          <TableCell>₹{product.basePrice}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Sales Price:</TableCell>
          <TableCell>₹{product.price}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Description:</TableCell>
          <TableCell>{product.description}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Benefits:</TableCell>
          <TableCell>{product.benefits}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Use Instruction:</TableCell>
          <TableCell>{product.useInstruction}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Safety Precaution:</TableCell>
          <TableCell>{product.safetyPrecaution}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Ingredients:</TableCell>
          <TableCell>{product.ingredients}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
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

import React from 'react';

const ReviewComponent = ({ reviews }) => (
  <div className="py-4">
    <h2 className="text-2xl font-medium">Customer Reviews</h2>
    {reviews.map((review, index) => (
      <div key={index} className="mt-4 border-b pb-4">
        <div className="flex items-center">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.56-.955L10 0l2.952 5.955 6.56.955-4.756 4.635 1.122 6.545z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">{review.date}</span>
        </div>
        <h3 className="mt-2 font-medium">{review.title}</h3>
        <p className="mt-1">{review.content}</p>
        <div className="mt-2 text-sm text-gray-500">by {review.author}</div>
      </div>
    ))}
  </div>
);

const reviews = [
  {
    rating: 4,
    date: 'July 28, 2024',
    title: 'Great Product!',
    content: 'I really liked this product. It has great features.',
    author: 'Anoop Singh',
  },
  // Add more reviews here
];


const Tabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState(1);

  // Array of tab data
  const tabs = [
    { id: 1, label: "Description", content: <ProductDesc product={product} /> },
    { id: 2, label: "Information", content: <ProductInfo product={product} /> },
    { id: 3, label: "Reviews", content: <ReviewComponent reviews={reviews} product={product} /> },
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

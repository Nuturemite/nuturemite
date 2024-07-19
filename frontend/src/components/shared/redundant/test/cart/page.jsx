"use client"

import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';

const Cart = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-2">
          <div className="overflow-x-auto mb-5">
            <Table className="min-w-full bg-white text-center">
              <TableHeader className="bg-gray-800 text-white">
                <TableRow>
                  <TableHead className="py-2">Products</TableHead>
                  <TableHead className="py-2">Price</TableHead>
                  <TableHead className="py-2">Quantity</TableHead>
                  <TableHead className="py-2">Total</TableHead>
                  <TableHead className="py-2">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-100">
                    <TableCell className="py-4 px-2 flex items-center justify-center">
                      <img src={`img/product-${item}.jpg`} alt="" className="w-12 h-12 object-cover mr-2" />
                      <span>Product Name</span>
                    </TableCell>
                    <TableCell className="py-4 px-2">$150</TableCell>
                    <TableCell className="py-4 px-2">
                      <div className="flex items-center justify-center">
                        <Button className="btn btn-primary btn-minus">
                          <Minus />
                        </Button>
                        <input
                          type="text"
                          className="form-input w-12 text-center mx-2"
                          defaultValue="1"
                        />
                        <Button className="btn btn-primary btn-plus">
                          <Plus />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-2">$150</TableCell>
                    <TableCell className="py-4 px-2">
                      <Button className="btn btn-danger">
                        <X />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <h5 className="text-lg font-semibold mb-3">
            <span className="py-1 px-2 rounded">Cart Summary</span>
          </h5>
          <div className="bg-gray-100 p-5 rounded">
            <div className="border-b pb-2">
              <div className="flex justify-between mb-3">
                <h6>Subtotal</h6>
                <h6>$150</h6>
              </div>
              <div className="flex justify-between">
                <h6>Shipping</h6>
                <h6>$10</h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between mt-2">
                <h5>Total</h5>
                <h5>$160</h5>
              </div>
              <Button className="btn btn-primary w-full font-bold py-3 mt-3">Proceed To Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

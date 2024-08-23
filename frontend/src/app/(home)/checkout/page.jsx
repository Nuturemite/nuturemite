"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import OrderSummary from "../cart/OrderSummary";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { tst } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import OutLoader from "@/components/ui/outloader";
import { useSWRConfig } from "swr";

const initialData = {
  fname: "",
  lname: "",
  address: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  email: "",
  phone: "",
  paymentMode: "cod",
};

const paymentOptions = [
  { value: "cod", label: "Cash On Delivery" },
  { value: "online", label: "Credit/Debit Card/PhonePe" },
];
export default function Page() {
  const [pending, setPending] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(initialData);
  const [paymentMode, setPaymentMode] = useState("cod");
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handlePaymentOptionChange = e => {
    setPaymentMode(e.target.value);
  };

  const formDetails = [
    [
      { label: "First Name", value: "fname", section: "billing" },
      { label: "Last Name", value: "lname", section: "billing" },
    ],
    [
      { label: "Email", value: "email", section: "billing" },
      { label: "Phone", value: "phone", section: "billing" },
    ],
    { label: "Address", value: "address", section: "billing" },
    [
      { label: "Country", value: "country", section: "shipping" },
      { label: "City", value: "city", section: "shipping" },
    ],
    [
      { label: "State", value: "state", section: "shipping" },
      { label: "Zipcode", value: "zipcode", section: "shipping" },
    ],
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setShippingAddress(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckout = async (e, paymentMode) => {
    e.preventDefault();
    try {
      setPending(true);

      if (paymentMode === "cod") {
        await api.post("/orders/place-order", {
          shippingAddress,
          paymentMode: "cod",
        });
        tst.success("Order placed successfully");
        mutate("/cart");
        router.push("/orders");
      } else {
        const response = await api.post("/payment/create-checkout-session", { shippingAddress });
        const url = response.data.url;
        router.push(url);
      }
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={`${pending && "pointer-events-none opacity-50"}`}>
      <div className="mt-10 pb-10">
        <div className="flex flex-col-reverse md:flex-row gap-20">
          <div className="md:basis-3/5">
            {/* Shipping Details */}
            <h2 className="h2-primary">Shipping Details</h2>
            <div className="bg-white p-6">
              {formDetails.map((section, index) => (
                <div key={index} className="mb-4">
                  {Array.isArray(section) ? (
                    <div className="flex gap-10">
                      {section.map((field, idx) => (
                        <div key={idx} className="w-full">
                          <Label className={"text-slate-600"} htmlFor={field.value}>
                            {field.label}
                          </Label>
                          <Input
                            type="text"
                            id={field.value}
                            name={field.value}
                            value={shippingAddress[field.value] || ""}
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <Label className={"text-slate-600"} htmlFor={section.value}>
                        {section.label}
                      </Label>
                      <Textarea
                        type="text"
                        id={section.value}
                        name={section.value}
                        value={shippingAddress[section.value] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Payment Method  */}
            <div className="w-full mt-12">
              <h2 className="h2-primary">Payment Method</h2>
              <div className="bg-white  p-6 border border-gray-200">
                <div className="space-y-4">
                  {paymentOptions.map(option => (
                    <div
                      key={option.value}
                      className="flex items-center  border-b border-gray-300 last:border-b-0"
                    >
                      <input
                        type="radio"
                        id={`payment-option-${option.value}`}
                        name="payment-option"
                        value={option.value}
                        checked={paymentMode === option.value}
                        onChange={handlePaymentOptionChange}
                        className="h-5 w-5 border-gray-300 focus:ring-tert-100 bg-tert-100 "
                      />
                      <label
                        htmlFor={`payment-option-${option.value}`}
                        className="ml-3 w-full p-4  text-gray-800 text-sm"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                <Button
                  pending={pending}
                  className="w-full mt-2"
                  onClick={e => handleCheckout(e, paymentMode)}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:basis-2/5">
            <h2 className="h2-primary">Order Details</h2>
            <OrderSummary />
          </div>
        </div>
      </div>
      <OutLoader loading={pending} />
    </div>
  );
}

"use client";
import React, { useLayoutEffect, useState } from "react";
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
import { useAuthContext } from "@/context/authprovider";
import { useMyAddresses } from "@/lib/data";
import Loader from "@/components/shared/loader";
import { useCartContext } from "@/context/cartprovider";
import { useCart } from "@/lib/data";
import Link from "next/link";

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
  { value: "phonepe", label: "PhonePe" },
  { value: "razorpay", label: "Credit/Debit Card/Net Banking" },
];
export default function Page() {
  const [pending, setPending] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(initialData);
  const [paymentMode, setPaymentMode] = useState("cod");
  const router = useRouter();
  const { addresses, isLoading: isAddressLoading } = useMyAddresses();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { mutate } = useSWRConfig();
  const { cartItems } = useCart();
  const [coupon, setCoupon] = useState(null);

  // if (cartItems.length === 0) return <EmptyCart />;
  if (isAddressLoading) return <Loader />;

  const handlePaymentOptionChange = (e) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      await api.post("/addresses", shippingAddress);
      await mutate("/my-addresses");
      setShowAddressForm(false);
      tst.success("Address saved successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleCheckout = async (e, paymentMode) => {
    e.preventDefault();
    try {
      setPending(true);
      await api.post("/orders/place-order", {
        shippingAddressId: selectedAddress,
        paymentMode: "cod",
      });
      tst.success("Order placed successfully");
      await mutate("/cart");
      await mutate("/my-orders");
      router.push("/orders");
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const initializeRazorpay = (data) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "Nuturemite",
      description: "Payment for your order",
      image: "https://example.com/favicon.png",
      order_id: data.id,
      handler: async function (res) {
        try {
          const response = await api.post("/payment/verify-razorpay-order", {
            ...res,
            shippingAddressId: selectedAddress,
          });
          if (response.data.success) {
            await mutate("/cart");
            tst.success("Order placed successfully");
            router.push("/orders");
          }
        } catch (error) {
          console.log("something went wrong");
        }
      },
    };
    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  const handleRazorpayOrder = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const response = await api.post("/payment/create-payment", {
        shippingAddressId: selectedAddress,
        paymentMethod: "razorpay",
      });
      initializeRazorpay(response.data.data);
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const handlePhonepeOrder = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const response = await api.post("/payment/create-payment", {
        shippingAddressId: selectedAddress,
        paymentMethod: "phonepe",
      });
      window.open(response.data.data.redirectUrl, "_blank");
    } catch (error) {
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
            {/* Address Selection */}
            <div className="w-full ">
              <h2 className="h2-primary">Select Address</h2>
              <div className="bg-white p-6 border border-gray-200">
                {addresses &&
                  addresses.length > 0 &&
                  addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-center border-b border-gray-300 last:border-b-0"
                    >
                      <input
                        type="radio"
                        id={`address-${address._id}`}
                        name="address"
                        value={address.id}
                        className="h-5 w-5 border-gray-300 focus:ring-tert-100 bg-tert-100"
                        checked={selectedAddress === address._id}
                        onChange={() => setSelectedAddress(address._id)}
                      />
                      <label
                        htmlFor={`address-${address._id}`}
                        className="ml-3 w-full p-4 text-gray-800 text-sm font-medium"
                      >
                        <span className="text-gray-700">{address.address}</span>
                        , <span className="text-gray-700">{address.city}</span>,{" "}
                        <span className="text-gray-700">{address.state}</span>,{" "}
                        <span className="text-gray-700">{address.zipcode}</span>
                        ,{" "}
                        <span className="text-gray-700">{address.country}</span>
                      </label>
                    </div>
                  ))}
                <>
                  {(addresses.length === 0 || showAddressForm) && (
                    <div className="bg-white pt-8">
                      {formDetails.map((section, index) => (
                        <div key={index} className="mb-4">
                          {Array.isArray(section) ? (
                            <div className="flex gap-10">
                              {section.map((field, idx) => (
                                <div key={idx} className="w-full">
                                  <Label
                                    className={"text-slate-600"}
                                    htmlFor={field.value}
                                  >
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
                              <Label
                                className={"text-slate-600"}
                                htmlFor={section.value}
                              >
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
                  )}
                </>
                <div className="flex gap-4">
                  <Button
                    className="mt-4"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                  >
                    {showAddressForm ? "Cancel" : "Add New Address"}
                  </Button>
                  {showAddressForm && (
                    <Button className="mt-4" onClick={handleSaveAddress}>
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method  */}
            <div className="w-full mt-12">
              <h2 className="h2-primary">Payment Method</h2>
              <div className="bg-white  p-6 border border-gray-200">
                <div className="space-y-4">
                  {paymentOptions.map((option) => (
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
                  disabled={pending || !selectedAddress || !paymentMode}
                  className="w-full mt-2"
                  onClick={(e) =>
                    paymentMode === "cod"
                      ? handleCheckout(e, paymentMode)
                      : paymentMode === "phonepe"
                      ? handlePhonepeOrder(e, paymentMode)
                      : handleRazorpayOrder(e, paymentMode)
                  }
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
            {/* <div className="mt-12">
              <h2 className="h2-primary">Apply Coupon</h2>
              <ApplyCoupon coupon={coupon} setCoupon={setCoupon} />
            </div> */}
          </div>
        </div>
      </div>
      <OutLoader loading={pending} />
    </div>
  );
}

const ApplyCoupon = ({ coupon, setCoupon }) => {
  return (
    <div className="flex items-center gap-4 bg-white md:p-6 ">
      <Input type="text" placeholder="Enter coupon code" />
      <Button>Apply Coupon</Button>
    </div>
  );
};

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-screen">
    <p className="text-gray-500">No items in cart</p>
    <div className="mt-4">
      <Link href="/shop">
        <Button variant="outline">Start Shopping</Button>
      </Link>
    </div>
  </div>
);

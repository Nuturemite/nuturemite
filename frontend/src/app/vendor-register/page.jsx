"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import { useAuthContext } from "@/context/authprovider";
import { useRouter } from "next/navigation";

const initialFormValues = {
  name: "",
  businessName: "",
  contactNumber: "",
  taxId: "",
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  bankAccount: {
    accountNumber: "",
    bankName: "",
    branchCode: "",
  },
  businessLicense: {
    licenseNumber: "",
    issuedBy: "",
    issuedDate: "",
    expiryDate: "",
    documentUrl: "",
  },
  store: {
    storeName: "",
    logoUrl: "",
    bannerUrl: "",
    description: "",
    returnPolicy: "",
    shippingMethods: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  },
};

export default function VendorRegistration() {
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState(initialFormValues);
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  // console.log(user);
  // if (isLoading) return;

  // if (user.role !== "vendor") return;
  // if (!user.isVerified) router.push("/vendor-register/in-process");

  const handleChange = e => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    if (nameParts.length === 1) {
      setValues({ ...values, [name]: value });
    } else {
      const [mainKey, subKey, subSubKey] = nameParts;
      setValues(prevValues => ({
        ...prevValues,
        [mainKey]: {
          ...prevValues[mainKey],
          ...(subSubKey
            ? {
                [subKey]: {
                  ...prevValues[mainKey][subKey],
                  [subSubKey]: value,
                },
              }
            : {
                [subKey]: value,
              }),
        },
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);
    try {
      await api.post("/auth/register/vendor", values);
      tst.success("Vendor registered successfully");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const formSections = [
    {
      heading: "Personal Details",
      fields: [
        { label: "Name", name: "name", type: "text", required: true },
        { label: "Email", name: "email", type: "email", required: true },
        { label: "Password", name: "password", type: "password", required: true },
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Contact Number", name: "contactNumber", type: "text", required: true },
        { label: "GST ID", name: "gstin", type: "text", required: true },
      ],
    },
    {
      heading: "Address Details",
      fields: [
        { label: "Street", name: "address.street", type: "text", required: true },
        { label: "City", name: "address.city", type: "text", required: true },
        { label: "State", name: "address.state", type: "text", required: true },
        { label: "Postal Code", name: "address.postalCode", type: "text", required: true },
        { label: "Country", name: "address.country", type: "text", required: true },
      ],
    },
    {
      heading: "Bank Details",
      fields: [
        {
          label: "Account Number",
          name: "bankAccount.accountNumber",
          type: "text",
          required: true,
        },
        { label: "Bank Name", name: "bankAccount.bankName", type: "text", required: true },
        { label: "Branch Code", name: "bankAccount.branchCode", type: "text", required: true },
      ],
    },
    {
      heading: "Business License Details",
      fields: [
        {
          label: "License Number",
          name: "businessLicense.licenseNumber",
          type: "text",
          required: true,
        },
        { label: "Issued By", name: "businessLicense.issuedBy", type: "text", required: true },
        { label: "Issued Date", name: "businessLicense.issuedDate", type: "date", required: true },
        { label: "Expiry Date", name: "businessLicense.expiryDate", type: "date", required: true },
        {
          label: "Document URL",
          name: "businessLicense.documentUrl",
          type: "text",
          required: true,
        },
      ],
    },
    {
      heading: "Store Details",
      fields: [
        { label: "Store Name", name: "store.storeName", type: "text" },
        { label: "Logo URL", name: "store.logoUrl", type: "text" },
        { label: "Banner URL", name: "store.bannerUrl", type: "text" },
        { label: "Description", name: "store.description", type: "text" },
        { label: "Return Policy", name: "store.returnPolicy", type: "text" },
        { label: "Shipping Methods", name: "store.shippingMethods", type: "text" },
        { label: "Facebook", name: "store.socialMediaLinks.facebook", type: "text" },
        { label: "Twitter", name: "store.socialMediaLinks.twitter", type: "text" },
        { label: "Instagram", name: "store.socialMediaLinks.instagram", type: "text" },
      ],
    },
  ];

  return (
    <div className="w-full mb-40 max-w-4xl mt-10 mx-auto bg-white p-10">
      {/* <h2 className="h3-primary">Vendor Registration</h2> */}
      <form onSubmit={handleSubmit}>
        {formSections.map((section, index) => (
          <div key={index} className="mb-16">
            <h3 className="h4-primary">{section.heading}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {section.fields.map(field => (
                <div key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.label}
                    name={field.name}
                    required={field.required}
                    value={field.name.split(".").reduce((acc, part) => acc[part], values)}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button className="px-20" type="submit" disabled={pending} pending={pending}>
          Submit
        </Button>
      </form>
    </div>
  );
}

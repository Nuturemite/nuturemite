"use client";
import React, { useState } from "react";
import { useVendor } from "@/lib/data";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";

const renderTableRows = data => {
  return Object.entries(data).map(([key, value]) => (
    <TableRow key={key}>
      <TableCell>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
      <TableCell>{value || "N/A"}</TableCell>
    </TableRow>
  ));
};

const VendorDetails = ({ params }) => {
  const id = params.id;
  const { vendor, isLoading, error } = useVendor(id);
  const [activeTab, setActiveTab] = useState("personal");

  if (isLoading) return <Loader />;
  if (error) return <Error />;
  if (!vendor) return <div>No vendor found</div>;

  return (
    <div className={`container mx-auto p-4 `}>

      <div className="mb-4">
        <div className="flex border-b border-gray-300 bg-white ">
          {["personal", "address", "bank", "license", "store"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-6  ${activeTab === tab ? "border-b-2  border-tert-100 text-tert-100" : "text-gray-600"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/^\w/, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "personal" && (
        <div>
          <h2 className="h4-primary">Personal Information</h2>
          <Table>
            <TableBody>
              {renderTableRows({
                id: vendor._id,
                name: vendor.name,
                businessName: vendor.businessName,
                contactNumber: vendor.contactNumber,
                taxId: vendor.taxId,
                isVerified: vendor.isVerified ? "Yes" : "No",
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {activeTab === "address" && vendor.address && (
        <div>
          <h2 className="h4-primary">Address</h2>
          <Table>
            <TableBody>{renderTableRows(vendor.address)}</TableBody>
          </Table>
        </div>
      )}

      {activeTab === "bank" && vendor.bankAccount && (
        <div>
          <h2 className="h4-primary">Bank Account</h2>
          <Table>
            <TableBody>{renderTableRows(vendor.bankAccount)}</TableBody>
          </Table>
        </div>
      )}

      {activeTab === "license" && vendor.businessLicense && (
        <div>
          <h2 className="h4-primary">Business License</h2>
          <Table>
            <TableBody>{renderTableRows(vendor.businessLicense)}</TableBody>
          </Table>
        </div>
      )}

      {activeTab === "store" && vendor.store && (
        <div>
          <h2 className="h4-primary">Store Details</h2>
          <Table>
            <TableBody>
              {renderTableRows({
                storeName: vendor.store.storeName,
                logoUrl: vendor.store.logoUrl,
                bannerUrl: vendor.store.bannerUrl,
                description: vendor.store.description,
                returnPolicy: vendor.store.returnPolicy,
                shippingMethods: vendor.store.shippingMethods.join(", "),
                ...vendor.store.socialMediaLinks,
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default VendorDetails;

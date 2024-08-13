"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useVendors } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import Error from "@/components/shared/error";
import { Trash, Edit, Eye } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import OutLoader from "@/components/ui/outloader";
import { useSearchParams } from "next/navigation";
import { AlertBox } from "@/components/ui/alert-dialog";
import { tst } from "@/lib/utils";
import { Switch } from "@mui/material";

const VendorList = () => {
  const searchParams = useSearchParams();
  const filters = {
    search: searchParams.get("search"),
    apvStatus: searchParams.get("apvStatus"),
  };
  const apvStatus = searchParams.get("apvStatus");
  const { vendors, error, isLoading, mutate } = useVendors({ limit: 50, ...filters });
  const [pending, setPending] = useState(false);

  if (error) return <Error />;

  const handleVerify = async id => {
    setPending(true);
    try {
      await api.put(`/vendors/${id}`, { apvStatus: "approved" });
      await mutate();
      tst.success("Vendor verified successfully");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleReject = async id => {
    setPending(true);
    try {
      await api.put(`/vendors/${id}`, { apvStatus: "rejected" });
      await mutate();
      tst.success("Vendor has been rejected");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };


  const handleStatus = async (id, active) => {
    try {
      setPending(true);
      await api.put(`/vendors/${id}`, { active: !active });
      await mutate();
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleDelete = async id => {
    try {
      setPending(true);
      await api.delete(`/vendor/${id}`);
      await mutate();
      tst.success("Vendor deleted successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const columns = [
    { key: "name", label: "Name", render: vendor => vendor.name },
    { key: "businessName", label: "Business Name", render: vendor => vendor.businessName },
    { key: "taxId", label: "GST ID", render: vendor => vendor.gstin },
    { key: "contactNumber", label: "Contact Number", render: vendor => vendor.contactNumber },
  ];

  if (apvStatus === "approved") {
    columns.push({
      key: "active",
      label: "Active",
      render: vendor => (
        <Switch onChange={() => handleStatus(vendor._id, vendor.active)} checked={vendor.active} />
      ),
    });
  }

  const actions = vendor => {
    if (apvStatus === "pending")
      return (
        <>
          <AlertBox btnName={"Verify"} onClick={() => handleVerify(vendor._id)}>
            <Button size="xs">Approve</Button>
          </AlertBox>
          <AlertBox btnName={"Reject"} onClick={() => handleReject(vendor._id)}>
            <Button variant={"destructive"} size="xs">
              Reject
            </Button>
          </AlertBox>
          <Link href={`/admin/vendors/${vendor._id}/`}>
            <Button className="bg-green-500" size="xs">
              View
            </Button>
          </Link>
        </>
      );
    else if (apvStatus === "rejected")
      return (
        <>
          <AlertBox btnName={"Verify"} onClick={() => handleVerify(vendor._id)}>
            <Button size="xs">Approve</Button>
          </AlertBox>
          <AlertBox onClick={() => handleDelete(vendor._id)}>
            <Trash className="text-red-600" />
          </AlertBox>
          <Link href={`/admin/vendors/${vendor._id}/`}>
            <Button className="bg-green-500" size="xs">
              View
            </Button>
          </Link>
        </>
      );
    else
      return (
        <>
          <Link href={`/admin/vendors/${vendor._id}/`}>
            <Eye className="text-green-500" />
          </Link>
          <AlertBox onClick={() => handleProductDelete(vendor._id)}>
            <Trash className="text-red-600" />
          </AlertBox>
        </>
      );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <SearchInput className="md:w-60" />
      </div>
      <DataTable
        columns={columns}
        data={vendors}
        isLoading={isLoading}
        actions={actions}
        caption="List of all vendors."
        pending={pending}
      />
      <OutLoader loading={pending} />
    </div>
  );
};

export default VendorList;

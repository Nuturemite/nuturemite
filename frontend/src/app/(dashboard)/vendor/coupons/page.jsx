"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useCoupons } from "@/lib/data";  // Update this import according to your data hook for coupons
import DataTable from "@/components/tables/DataTable";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus, Edit, Trash, Eye } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import { AlertBox } from "@/components/ui/alert-dialog";
import OutLoader from "@/components/ui/outloader";
import { useSearchParams } from "next/navigation";

const CouponList = () => {
  const searchParams = useSearchParams();
  const filters = {
    search: searchParams.get("search"),
  };
  
  const { coupons, error, isLoading, mutate } = useCoupons({ limit: 50, ...filters });
  const [pending, setPending] = useState(false);

  const handleCouponDelete = async id => {
    try {
      setPending(true);
      await api.delete(`/coupons/${id}`);
      await mutate();
      tst.success("Coupon deleted successfully");
    } catch (error) {
      console.error(error);
      tst.error(error.message || "Failed to delete coupon");
    } finally {
      setPending(false);
    }
  };

  const columns = [
    {
      key: "code",
      label: "Coupon Code",
      render: item => item.code,
    },
    {
      key: "description",
      label: "Description",
      render: item => item.description || "-",
    },
    {
      key: "discount",
      label: "Discount",
      render: item => `${item.discount}%`,
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      render: item => new Date(item.expiryDate).toLocaleDateString(),
    },
  ];

  const actions = item => (
    <>
      <Link href={`/vendor/coupons/edit/${item._id}`}>
        <Edit className="text-green-500" />
      </Link>
      <AlertBox onClick={() => handleCouponDelete(item._id)}>
        <Trash className="text-red-600" />
      </AlertBox>
    </>
  );

  if (error) return <Error />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <SearchInput className="md:w-60" />
        <Link href="/vendor/coupons/new">
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={coupons}
        isLoading={isLoading}
        actions={actions}
        caption="List of all coupons."
        pending={pending}
      />
      <OutLoader loading={pending} />
    </div>
  );
};

export default CouponList;

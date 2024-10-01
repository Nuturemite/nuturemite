"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useBanners } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { AlertBox } from "@/components/ui/alert-dialog";
import OutLoader from "@/components/ui/outloader";
import { useSearchParams } from "next/navigation";
import { Switch } from "@mui/material";

const BannerList = () => {
  const searchParams = useSearchParams();
  const filters = {
    search: searchParams.get("search"),
  };
  const { banners, error, isLoading, mutate } = useBanners({ limit: 50, ...filters });
  const [pending, setPending] = useState(false);

  const handleBannerDelete = async id => {
    try {
      setPending(true);
      await api.delete(`/banners/${id}`);
      await mutate();
      tst.success("Banner deleted successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleActiveBanner = async (id, item) => {
    try {
      setPending(true);
      await api.put(`/banners/${id}`, { active: !item.active });
      await mutate();
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  if (error) return <Error />;

  const columns = [
    {
      key: "image",
      label: "Image",
      render: item => <img src={item.image} alt={item.title} width={200} height={200} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: item => <span>{new Date(item.createdAt).toLocaleDateString()}</span>,
    },
    {
        key: "active",
        label: "Active",
        render: item => (
          <Switch checked={item.active} onChange={() => handleActiveBanner(item._id, item)} />
        ),
      },
  ];

  const actions = item => (
    <>
      <AlertBox onClick={() => handleBannerDelete(item._id)}>
        <Trash className="text-red-600" />
      </AlertBox>
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <Link href="/admin/banners/new">
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={banners}
        isLoading={isLoading}
        actions={actions}
        caption="List of all banners."
        pending={pending}
      />
      <OutLoader loading={pending} />
    </div>
  );
};

export default BannerList;

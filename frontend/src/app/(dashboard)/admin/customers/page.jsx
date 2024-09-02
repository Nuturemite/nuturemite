"use client";
import React, { useState } from "react";
import { useCustomers } from "@/lib/data"; 
import DataTable from "@/components/tables/DataTable";
import Error from "@/components/shared/error";
import SearchInput from "@/components/filters/search";
import { Switch } from "@mui/material";
import api from "@/lib/api";

const CustomerList = () => {
  const { customers, error, isLoading } = useCustomers();
  const { mutate } = useCustomers();
  const [pending, setPending] = useState(false);

  if (error) return <Error />;

  const handleActive = async (id, active) => {
    try {
      setPending(true)
      await api.put(`/users/${id}`, { active: !active });
      await mutate();
    } catch (error) {
      await mutate();
      console.log(error);
    }
    finally{
      setPending(false);
    }
  }

  const handleBlocked = async (id, blocked) => {
    try {
      setPending(true);
      await api.put(`/users/${id}`, { blocked: !blocked });
      await mutate();
    } catch (error) {
      console.log(error);
    }
    finally{
      setPending(false);
    }
  }

  const columns = [
    {
      label: "Username",
      render: item => item.username,
    },
    {
      label: "Email",
      render: item => item.email,
    },
    {
      key: "active",
      label: "Active",
      render: item => (
        <Switch onChange={() => handleActive(item._id, item.active)} checked={item.active} />
      ),
    },
    {
      key: "blocked",
      label: "Blocked",
      render: item => (
        <Switch onChange={() => handleBlocked(item._id, item.blocked)} checked={item.blocked} />
      ),
    }
  ];
 
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={customers}
        isLoading={isLoading}
        caption="List of all customers."
        pending={pending}
      />
    </div>
  );
};

export default CustomerList;

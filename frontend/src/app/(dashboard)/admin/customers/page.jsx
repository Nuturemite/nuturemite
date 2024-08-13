"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/lib/data"; 
import DataTable from "@/components/tables/DataTable";
import Error from "@/components/shared/error";
import SearchInput from "@/components/filters/search";
import Link from "next/link";

const CustomerList = () => {
  const { customers, error, isLoading } = useCustomers();
  const [pending, setPending] = React.useState(false);

  if (error) return <Error />;

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
      label: "Gender",
      render: item => item.gender,
    },
  ];

  const actions = item => (
    <>
      <Link href={`/customers/edit/${item.id}/`}>
        <Button variant="outline">View Details</Button>
      </Link>
    </>
  );

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
        actions={actions}
        caption="List of all customers."
        pending={pending}
      />
    </div>
  );
};

export default CustomerList;

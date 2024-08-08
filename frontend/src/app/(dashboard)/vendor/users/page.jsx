"use client";
import React from "react";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import { useUsers } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { Edit, Trash } from "lucide-react";
import SearchInput from "@/components/filters/search";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertBox } from "@/components/ui/alert-dialog";
import UserForm from "@/components/forms/UserForm";

const UserList = ({  }) => {
  const { users, isLoading, error, mutate } = useUsers();

  const handleUserDelete = async id => {
    try {
      await api.delete(`/users/${id}`);
      mutate(users.filter(user => user.id !== id));
      tst.success("User deleted successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  const handleUserUpdate = async (id, formData) => {
    try {
      const res = await api.put(`/users/${id}`, formData);
      mutate(users.map(user => (user.id === id ? { ...user, ...res.data.data } : user)));
      tst.success("User updated successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  if (error) return <p>Error</p>;

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  const actions = user => (
    <div className="flex gap-2">
      <AlertBox onClick={() => handleUserDelete(user.id)}>
        <Trash className="text-red-600 cursor-pointer" />
      </AlertBox>
      <Dialog>
        <DialogTrigger asChild>
          <Edit className="text-green-500 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <UserForm user={user} onUpdate={handleUserUpdate} />
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <SearchInput className="md:w-60" />
      </div>
      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        actions={actions}
        caption="List of all users."
      />
    </div>
  );
};

export default UserList;

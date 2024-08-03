"use client";
import React, { useState } from "react";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import { useUsers } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/tableskeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserForm from "./UserForm";
import SearchInput from "@/components/shared/search";
import { Edit, Trash } from "lucide-react";

const UserList = ({ searchParams }) => {
  const query = searchParams.query;
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
      </div>
      <div className="bg-white px-4">
        <Table>
          <TableCaption>List of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableSkeleton columnCount={4} />
          ) : (
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell >
                    <div className="flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Trash className="text-red-600 cursor-pointer" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleUserDelete(user.id)}
                              className={buttonVariants({ variant: "destructive" })}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Edit className="text-green-500 cursor-pointer" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <UserForm user={user} onUpdate={handleUserUpdate} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default UserList;

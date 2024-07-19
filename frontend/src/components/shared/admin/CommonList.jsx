"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/shared/tableskeleton";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus } from "lucide-react";
import SearchInput from "@/components/shared/search";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
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
import { Edit, Trash } from "lucide-react";

const CommonList = ({
  newEntityLink,
  deleteEndpoint,
  data,
  error,
  isLoading,
  mapFunction,
  tableCaption,
  tableHeaders,
  refetch,
  searchEndpoint
}) => {
  const [pending, setPending] = React.useState(false);

  const handleDelete = async (id) => {
    try {
      setPending(true);
      await api.delete(`${deleteEndpoint}/${id}`);
      refetch();
      tst.success("Deleted successfully");
    } catch (error) {
      console.error(error);
      tst.error(error.message);
    } finally {
      setPending(false);
    }
  };

  if (error) return <Error />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
        <Link href={newEntityLink}>
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <div className="bg-white px-4">
        <div className={`bg-white px-4 ${pending ? 'opacity-50 pointer-events-none' : ''}`}>
          <Table>
            <TableCaption>{tableCaption}</TableCaption>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <TableSkeleton columnCount={tableHeaders.length + 1} />
            ) : (
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    {mapFunction(item)}
                    <TableCell>
                      <div className="flex gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Trash className="text-red-600 cursor-pointer" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
                                className="text-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Link href={`/admin/${searchEndpoint}/edit/${item.id}`}>
                          <Edit className="text-green-500 cursor-pointer" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CommonList;

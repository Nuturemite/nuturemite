"use client";
import { Button } from "@/components/ui/button";
import { useVendors } from "@/lib/data";
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
import Error from "@/components/shared/error";
import SearchInput  from "@/components/filters/search";
import Link  from "next/link";
import { Eye, View } from "lucide-react";
// import Loader from "@/components/shared/loader";

const VendorList = ({ searchParams }) => {
  const query = searchParams.query;
  const { vendors, error, isLoading, mutate } = useVendors({ limit: 50 });

  // if (isLoading) return <Loader />;
  if (error) return <Error />;


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
      </div>
      <div className={`bg-white px-4 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
        <Table>
          <TableCaption>List of all vendors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>Tax ID</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Is Verified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableSkeleton columnCount={7} />
          ) : (
            <TableBody>
              {vendors.map(vendor => (
                <TableRow key={vendor._id}>
                  <TableCell>{vendor._id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.businessName}</TableCell>
                  <TableCell>{vendor.taxId}</TableCell>
                  <TableCell>{vendor.contactNumber}</TableCell>
                  <TableCell>
                    <div
                      className={`text-center ${
                        vendor.isVerified ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      } px-2.5 py-[0.2rem] rounded-md`}
                    >
                      {vendor.isVerified ? "Verified" : "Not Verified"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`text-center ${
                        vendor.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      } px-2.5 py-[0.2rem] rounded-md`}
                    >
                      {vendor.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/vendors/${vendor._id}`}>
                     <Eye className="text-green-500"/>
                    </Link>
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

export default VendorList;

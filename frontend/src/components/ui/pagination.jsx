"use client";
import {Button} from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      const params = new URLSearchParams(searchParams);
      if (page) {
        params.set("page", page);
      } else {
        params.delete("page");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="flex justify-between items-center p-4">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;

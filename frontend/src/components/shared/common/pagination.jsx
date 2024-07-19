import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils"; 

const PaginationComp = ({ totalPages, className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = page => {
    const params = new URLSearchParams(searchParams);

    if (page === currentPage) return;
    if (page < 1 || page > totalPages) return;

    params.set("page", page);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("flex justify-center items-center gap-4", className)}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className="px-4 py-2 border rounded bg-gray-200 disabled:bg-gray-300"
      >
        Previous
      </button>
      <span className="text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className="px-4 py-2 border rounded bg-gray-200 disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComp;
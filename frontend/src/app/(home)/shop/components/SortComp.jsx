import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomSelect from "@/components/ui/custrom-select";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export const SortComp = ({ className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentSort = searchParams.get("sortBy") || "price-low-to-high";

  const options = [
    { id: "price-low-to-high", name: "Price: Low to High" },
    { id: "price-high-to-low", name: "Price: High to Low" },
    { id: "discount", name: "Discount" },
    { id: "latest", name: "Latest" },
  ];

  const handleSortChange = sortOption => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortOption);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Label className="text-slate-500 ">Sort By</Label>
      <CustomSelect
        options={options}
        value={currentSort}
        onChange={handleSortChange}
        placeholder="Select sorting option"
        className="w-min"
      />
    </div>
  );
};

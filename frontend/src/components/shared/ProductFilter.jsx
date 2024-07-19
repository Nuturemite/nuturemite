"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBrands, useCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
function ProductFilter({ className }) {
  const { categories, isLoading } = useCategories();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  let params;
  const handleParamsChange = (name, value) => {
    params = new URLSearchParams(searchParams);
    if (value) params.set(name, value);
    else params.delete(name);
    if (params) router.replace(`${pathname}?${params.toString()}`);
  };

  const clearQuery = () => {
    router.replace(pathname);
  };

  return (
    <div className={cn("flex justify-center gap-10 items-center w-full", className)}>
      <form action="" className="flex justify-between items-center gap-10">
        <div>
          <Select
            onValueChange={value => handleParamsChange("categoryName", value)}
            className="w-full"
          >
            <SelectTrigger className="w-48 pl-4 border-slate-600 rounded-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {isLoading
                ? "Loading..."
                : categories?.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select onValueChange={value => handleParamsChange("sortBy", value)} className="w-full">
            <SelectTrigger className="w-40 pl-4 border-slate-600 rounded-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pricelowtohigh">Price low to high</SelectItem>
              <SelectItem value="pricehightolow">Price high to low</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="discounthightolow">Discount high to low</SelectItem>
              <SelectItem value="discountlowtohigh">Discount low to high</SelectItem>
              <SelectItem value="relevance">Relevance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/*  <div >
          <Label htmlFor="price" className="text-left">
            Price
          </Label>
          <div className="flex gap-4 justify-between">
            <Input
              className="bg-transparent outline-none ring-none border-slate-600"
              type="number"
              name="minprice"
              id="price"
              placeholder="Min"
              defaultValue={searchParams.get("minprice")}
              onChange={e => handleParamsChange(e.target.name, e.target.value)}
            />
            <Input
              className="bg-transparent outline-none ring-none border-slate-600"
              type="number"
              name="maxprice"
              id="price"
              placeholder="Max"
              defaultValue={searchParams.get("maxprice")}
              onChange={e => handleParamsChange(e.target.name, e.target.value)}
            />
          </div>
        </div> */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-10 py-2 border rounded-full text-sm  border-slate-500 outline-none">
            Rating
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="p-4">
              <Label htmlFor="minrating" className="text-left block mb-4">
                Rating
              </Label>
              <div>
                <RadioGroup
                  defaultValue={searchParams.get("minrating")}
                  onValueChange={value => handleParamsChange("minrating", value)}
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="5" id="5" />
                    <Label htmlFor="5">5+ & above</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="4" id="4" />
                    <Label htmlFor="4">4+ & above</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="3" id="3" />
                    <Label htmlFor="3">3+ & above</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="px-10 py-2 border rounded-full text-sm  border-slate-500 outline-none">
            Discount
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="p-4">
              <Label htmlFor="mindiscount" className="text-left mb-4 block">
                Discount
              </Label>
              <div>
                <RadioGroup
                  defaultValue={searchParams.get("mindiscount")}
                  onValueChange={value => handleParamsChange("mindiscount", value)}
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="50" id="50" />
                    <Label htmlFor="50">50% & more</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="40" id="40" />
                    <Label htmlFor="40">40% & more</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="30" id="30" />
                    <Label htmlFor="30">30% & more</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
      <Button
        onClick={clearQuery}
        className=" bg-red-500 hover:bg-red-600 rounded-full px-10 py-4"
        size="sm"
      >
        Clear
      </Button>
    </div>
  );
}

export default ProductFilter;

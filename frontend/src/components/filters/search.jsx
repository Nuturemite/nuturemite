"use client";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

function SearchInput({ className }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    if (value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div class="w-[400px] ">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon fontSize={24} className="text-slate-400" icon="ion:search" />
          </div>
          <Input
            type="search"
            id="default-search"
            className={cn(
              "block w-full p-3 pl-10 text-sm text-slate-900 focus-within:outline-none border border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500 ",
              className
            )}
            placeholder="Search ..."
            onChange={handleSearch}
            defaultValue={searchParams.get("search")?.toString()}
            required
          />
        </div>
      </div>
    </>
  );
}

export default SearchInput;

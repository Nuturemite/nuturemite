import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import SelectComponent from "./SelectComponent";

const FilterComponent = ({ name, options, label }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);
  const fieldValue = params.get(name) || "";

  const handleParamsChange = (name, value) => {
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <SelectComponent
        value={fieldValue}
        onChange={value => handleParamsChange(name, value)}
        options={options}
        label={label}
      />
    </div>
  );
};

export default FilterComponent;

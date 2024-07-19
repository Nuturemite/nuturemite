import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectComponent = ({ value, onChange, options, label }) => {
  return (
    <Select className="w-full mt-1" value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select a ${label || "value"}`} />
      </SelectTrigger>
      <SelectContent>
        {options?.map(option => (
          <SelectItem key={option.id} value={option.name}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;

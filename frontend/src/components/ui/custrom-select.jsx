"use client";
import { cn } from "@/lib/utils";
import React from "react";

const CustomSelect = ({ options, value, onChange, error,name, onFocus, placeholder, className ,...props}) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full text-sm border border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      value={value}
      onChange={e=>onChange(e.target.value)}
      onFocus={onFocus}
      name={name}
      {...props}
    >
      <option value="">
        {placeholder}
      </option>
      {options?.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;

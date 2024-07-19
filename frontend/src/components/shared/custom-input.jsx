import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const CustomInput = ({ 
  type, 
  name, 
  value, 
  onChange, 
  id, 
  disabled, 
  placeholder, 
  className, 
  onFocus,
  error ,
  ...props
}) => (
  <div className="flex-1">
    <Label htmlFor={id} className="mb-2 block">
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </Label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      className={`col-span-3 ${className} ${error ? "border-red-500" : ""}`}
      onFocus={onFocus}
      {...props}
    />
    {error && <div className="text-red-500 text-sm">{error}</div>}
  </div>
);

export default CustomInput;

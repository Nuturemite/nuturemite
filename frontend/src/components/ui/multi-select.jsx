import React, { useState } from "react";

const MultiSelect = ({ options, props, className }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = optionId => {
    setSelectedOptions(prevSelected =>
      prevSelected.includes(optionId)
        ? prevSelected.filter(id => id !== optionId)
        : [...prevSelected, optionId]
    );
  };

  return (
    <div className={cn("w-64 border border-gray-300 rounded-lg p-4", className)}>
      <div className="mb-2 text-gray-700">
        {selectedOptions.length === 0
          ? "Select options"
          : `Selected: ${selectedOptions.join(", ")}`}
      </div>
      <ul className="space-y-2">
        {options.map(option => (
          <li key={option.id} className="flex items-center">
            <input
              type="checkbox"
              id={`option-${option.id}`}
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleSelect(option.id)}
              className="mr-2 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor={`option-${option.id}`} className="text-gray-800">
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelect;

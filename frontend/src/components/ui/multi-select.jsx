import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0px',
    padding: '2px',
    boxShadow: 'none',
    borderColor: '#ccc',
    '&:hover': {
      borderColor: '#aaa',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    borderRadius: '0px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    borderRadius: '0px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    borderRadius: '0px',
    '&:hover': {
      backgroundColor: 'red',
      color: 'white',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '0px',
  }),
  option: (provided) => ({
    ...provided,
    borderRadius: '0px',
    fontSize: '14px',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '14px', // Adjust the font size here
  }),
};

const MultiSelect = ({ options, value, onChange, ...props }) => {
  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      options={options}
      value={value}
      onChange={onChange}
      styles={customStyles}
      {...props}
    />
  );
};

export default MultiSelect;

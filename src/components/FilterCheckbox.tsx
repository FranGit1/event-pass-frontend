import React from 'react';

interface FilterCheckboxProps {
  value: number;
  selected: boolean;
  onChange: () => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ value, selected, onChange }) => {
  return (
    <label
      key={value}
      className={`px-5 py-1 rounded-full text-primary border-1 border-primary mx-2 text-center hover:(text-gray bg-secondary-light) ${
        selected && 'bg-primary text-white hover:(bg-primary text-white)'
      }`}
    >
      <input
        type="checkbox"
        value={value}
        checked={selected}
        onChange={onChange}
        className="absolute opacity-0 cursor-pointer h-0 w-0"
      />
      {value}
    </label>
  );
};

export default FilterCheckbox;

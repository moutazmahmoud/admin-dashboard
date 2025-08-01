import React, { useState, useRef, useEffect } from "react";

import ChevronDownIcon from "@/assets/icons/icon_chevron-down.svg?react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative min-w-[6.5rem] text-text/50">
      <div
        className="flex cursor-pointer items-center justify-between rounded-[0.25rem] border border-[#D5D5D5] bg-[#FCFDFD] px-0.75 py-[0.375] text-center  font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.label || (
          <span>{placeholder}</span>
        )}

        <span className="ml-0.5">
          <ChevronDownIcon
            className={`h-[0.625rem] w-[0.625rem] transition-transform duration-200 ease-in-out ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={` cursor-pointer px-1 py-0.5 hover:bg-gray-100 ${
                option.value === value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="mb-3 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 shadow-sm transition-colors hover:border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default SelectDropdown;

import * as React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface ShadSelectInputProps {
  label: string;
  optionTitle: string;
  options: SelectOption[];
  selectedOption: string | string[]; // Supports both single and multiple selections
  setSelectedOption: (value: string | string[]) => void;
  initialData?: string | string[];
}

export default function ShadSelectInput({
  label,
  optionTitle,
  options,
  selectedOption,
  setSelectedOption,
}: ShadSelectInputProps) {
  // Handle single or multiple selections
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const values = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setSelectedOption(values.length > 1 ? values : values[0]);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <select
        multiple // Enables multi-select
        value={Array.isArray(selectedOption) ? selectedOption : [selectedOption]}
        onChange={handleChange}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">{optionTitle}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

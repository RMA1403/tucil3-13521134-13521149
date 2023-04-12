import React from "react";
import clsx from "clsx";

interface DropdownOptions {
  value: string;
  text: string;
}

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: DropdownOptions[];
}

export default function Dropdown({
  label,
  options,
  className,
  ...props
}: DropdownProps): JSX.Element {
  return (
    <div
      className={clsx(
        "w-full flex justify-between items-center",
        className !== undefined && className
      )}
    >
      <h4 className="text-xl font-bold">{label}</h4>
      <select
        className="rounded-[4px] border-2 w-1/2 border-[#A1A6B4] text-gray-700 px-4 outline-none py-2"
        {...props}
      >
        {options.map(({ value, text }) => (
          <option key={`option-${value}`} value={value}>{text}</option>
        ))}
      </select>
    </div>
  );
}

export type { DropdownOptions };

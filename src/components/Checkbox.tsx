import React from "react";
import CheckMarkIcon from "@/assets/icons/checkmark.svg?react";

type CheckboxWithLabelProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
};

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  checked,
  onChange,
  label,
  id,
}) => {
  return (
    <label
      className="relative flex cursor-pointer items-center gap-[0.75rem]"
      htmlFor={id}
    >
      <div className="relative h-6 w-6 rounded-[0.375rem] border-[1px] border-[#A3A3A3] peer-checked:border-blue-600">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute inset-0 opacity-0"
        />
        <div
          className={`pointer-events-none absolute inset-0 flex h-6 w-6  items-center justify-center opacity-0 peer-checked:opacity-100`}
        >
          <CheckMarkIcon className=" h-3 w-3 text-white " />
        </div>
      </div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};

export default CheckboxWithLabel;

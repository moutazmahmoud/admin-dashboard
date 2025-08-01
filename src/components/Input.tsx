import React from "react";

type InputFieldProps = {
  type?: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  classes?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  classes,
  error,
}) => {
  return (
    <div className={`${classes ? classes : ""}`}>
      <input
        type={type}
        name={name}
        id={name}
        className={`border-[1px] w-full rounded-[0.5rem] border-solid border-[#D8D8D8] bg-[#F1F4F9] p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;

import React from "react";

type InputFieldProps = {
  type?: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  classes?: string;
  id?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  id,
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
        id={id}
        className={`w-full rounded-[0.5rem] border-[1px] border-solid border-[#D8D8D8] bg-[#F1F4F9] p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;

import { classNames } from "@/utils/other";
import React from "react";

const TextField = ({
  onChange,
  value,
  type,
  disabled,
  placeholder,
  className,
  containerClassName,
  name,
  required,
  pattern,
  error,
}) => {
  return (
    <div className={`w-full mb-5 ${containerClassName}`}>
      <input
        type={type}
        disabled={disabled}
        required={required}
        value={value}
        name={name}
        pattern={pattern}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames(
          `w-full bg-[inherit] border ${error ? "border-error" : "border-gray"
          }   rounded-lg hover:border-primary ring-primary focus:ring-1 focus-visible:ring-1 font-[400] text-[17px] p-3  placeholder-[#757474]`,
          className
        )}
      />
      {error && <p className="text-red text-[12px] font-[300]">{error}</p>}
    </div>
  );
};

export default TextField;

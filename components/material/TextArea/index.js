import { classNames } from "@/utils/other";
import React from "react";

const TextArea = ({
  onChange,
  value,
  type,
  placeholder,
  className,
  name,
  required,
  pattern,
}) => {
  return (
    <textarea
      type={type}
      required={required}
      value={value}
      name={name}
      pattern={pattern}
      rows={4}
      placeholder={placeholder}
      onChange={onChange}
      className={classNames(
        "w-full border bg-[inherit]   rounded-lg hover:border-primary ring-primary focus:ring-1 focus-visible:ring-1 font-[400] text-[17px] p-3",
        className
      )}
    />
  );
};

export default TextArea;

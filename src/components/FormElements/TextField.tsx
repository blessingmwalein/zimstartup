import { classNames } from "@/util/other";
import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    error?: string;
    icon?: React.ReactNode;
    containerClassName?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            onChange,
            value,
            type = "text",
            disabled = false,
            placeholder = "",
            className = "",
            containerClassName = "",
            name,
            required = false,
            pattern,
            error,
            icon,
            ...rest
        },
        ref
    ) => {
        return (
            <div className={`w-full mb-5 ${containerClassName}`}>
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={type}
                        disabled={disabled}
                        required={required}
                        value={value}
                        name={name}
                        pattern={pattern}
                        placeholder={placeholder}
                        onChange={onChange}
                        className={classNames(
                            `w-full p-3 border ${error ? "border-error" : "border-gray-600"} rounded-md ${icon ? "pl-10" : ""
                            } placeholder-[#757474]`,
                            className
                        )}
                        {...rest}
                    />
                </div>
                {error && <p className="text-error text-[13px] font-[300]">{error}</p>}
            </div>
        );
    }
);

TextField.displayName = "TextField";

export default TextField;

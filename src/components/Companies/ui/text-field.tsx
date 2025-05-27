"use client"

import React from "react"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  error?: string
  icon?: React.ReactNode
  containerClassName?: string
  label?: string
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
      label,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={`w-full ${containerClassName}`}>
        {label && <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">{icon}</div>}
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
            className={`w-full rounded-[10px] border ${error ? "border-red-500" : "border-gray-300"} p-3 py-4 ${
              icon ? "pl-10" : ""
            } placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
            {...rest}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

TextField.displayName = "TextField"

export default TextField

"use client"

import React from "react"
import { africanPhonePrefixes } from "./phonePrefixes"

interface PhoneNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  onChange?: (value: string) => void
  value?: string
  error?: string
  icon?: React.ReactNode
  containerClassName?: string
  label?: string
  prefixOptions?: string[]
  prefix?: string
  onPrefixChange?: (prefix: string) => void
}

const PhoneNumberInput = React.forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  (
    {
      onChange,
      value = "",
      disabled = false,
      placeholder = "",
      className = "",
      containerClassName = "",
      name,
      required = false,
      error,
      icon,
      label,
      prefixOptions,
      prefix = "+263",
      onPrefixChange,
      ...rest
    },
    ref,
  ) => {
    // Remove leading zeros and non-numeric characters
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value.replace(/\D/g, "")
      if (input.startsWith("0")) input = input.slice(1)
      if (input.length > 9) input = input.slice(0, 9) // Zim numbers are 9 digits after prefix
      onChange && onChange(input)
    }

    const prefixes = prefixOptions || africanPhonePrefixes;
    return (
      <div className={`w-full ${containerClassName}`}>
        {label && <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          {/* {icon && <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">{icon}</div>} */}
          <div className={`flex items-center w-full rounded-[10px] border ${error ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500`}>
            <select
              className="bg-transparent outline-none px-3 py-4 text-gray-700 font-medium rounded-l-[10px] focus:outline-none"
              value={prefix}
              onChange={e => onPrefixChange && onPrefixChange(e.target.value)}
              disabled={prefixes.length === 1}
              style={{ minWidth: 80 }}
            >
              {prefixes.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="h-8 w-px bg-gray-300 mx-2" />
            <input
              ref={ref}
              type="tel"
              disabled={disabled}
              required={required}
              value={value}
              name={name}
              placeholder={placeholder || "7XXXXXXXX"}
              onChange={handleInputChange}
              className={`flex-1 bg-transparent py-4 px-2 rounded-r-[10px] border-0 focus:ring-0 placeholder-gray-400 ${icon ? "pl-6" : ""} ${className}`}
              pattern="[0-9]{9}"
              maxLength={9}
              {...rest}
            />
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

PhoneNumberInput.displayName = "PhoneNumberInput"

export default PhoneNumberInput 
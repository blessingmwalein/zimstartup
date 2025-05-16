"use client"

import { useEffect, useRef } from "react"
import { Controller } from "react-hook-form"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import { Calendar } from "lucide-react"

interface CustomDatePickerProps {
  control: any
  name: string
  rules?: any
  label: string
  placeholder?: string
  error?: string
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  control,
  name,
  rules,
  label,
  placeholder,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => {
          useEffect(() => {
            if (inputRef.current) {
              flatpickr(inputRef.current, {
                defaultDate: value,
                dateFormat: "M j, Y",
                onChange: (selectedDates) => {
                  if (selectedDates.length > 0) {
                    onChange(selectedDates[0])
                  }
                },
              })
            }
          }, [inputRef])

          return (
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <Calendar className="h-5 w-5" />
              </div>
              <input
                id={name}
                ref={(el) => {
                  inputRef.current = el
                  ref(el)
                }}
                className={`w-full rounded-[10px] border py-4 ${
                  error ? "border-red-500" : "border-gray-300"
                } bg-white p-3 pl-10 font-normal outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                defaultValue={value}
                placeholder={placeholder || "Select date..."}
                readOnly // prevents keyboard editing
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
          )
        }}
      />
    </div>
  )
}

export default CustomDatePicker

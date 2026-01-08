"use client"

import React from "react"
import { Listbox, Transition } from "@headlessui/react"
import { ChevronDown, Check } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  value: string
  error?: string
  message?: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  icon?: React.ReactNode
}

const Select: React.FC<SelectProps> = ({ options, value, error, message, onChange, placeholder, label, icon }) => {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>}
      <Listbox
        as="div"
        className="relative w-full"
        value={value}
        onChange={(value) => {
          onChange(value)
        }}
      >
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button
                className={`relative flex w-full py-4 items-center rounded-[12px] border ${error ? "border-red-500" : "border-gray-200"
                  } bg-white p-4 text-left shadow-sm transition-all duration-200 hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                {icon && <div className="mr-3 text-gray-400">{icon}</div>}
                <span className={`block flex-1 truncate text-sm ${value ? "text-gray-900" : "text-gray-400"}`}>
                  {options.find((option) => option.value === value)?.label || placeholder}
                </span>
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200" />
              </Listbox.Button>

              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {message && (
                    <div className="flex items-center justify-center py-4">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  )}
                  {options.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      value={option.value}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                            {option.label}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-blue-600"
                                }`}
                            >
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </>
        )}
      </Listbox>
    </div>
  )
}

export default Select

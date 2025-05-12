// External Dependencies
import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdExpandMore } from "react-icons/md";
import { BsCheck } from "react-icons/bs";

const Select = ({
  /* label, */
  options,
  value,
  error,
  message,
  onChange,
  placeholder,
}) => {
  return (
    <Listbox
      as="div"
      className="relative w-full"
      //className={className}
      value={value}
      onChange={(value) => {
        onChange(value);
      }}>
      {({ open }) => (
        <>
          <div className="relative ">
            <span className="inline-block w-full rounded-md shadow-sm">
              <Listbox.Button
                className={`cursor-default relative w-full rounded-md border ${
                  error ? "border-error" : "border-gray"
                }  hover:border-primary bg-[inherit] px-2 py-3 md:px-3  md:py-3 text-left  transition ease-in-out duration-150 flex items-center`}>
                <p className="flex-1 block text-[15px]   md:text-[18px] truncate">
                  {options.find((option) => option.value === value)?.label ||
                    placeholder}
                </p>
                <MdExpandMore className=" text-[25px]  text-[#adadad]" />
              </Listbox.Button>
            </span>
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg mb-11">
              <Transition
                show={open}
                leave="transition duration-100 ease-in"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0">
                <Listbox.Options
                  static
                  className="py-1 overflow-auto text-base rounded-md max-h-[300px] ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {message && (
                    <div className="flex items-center justify-center py-[30px]">
                      <p className="text-[16px]">{message}</p>
                    </div>
                  )}
                  {options.map((option, index) => {
                    return (
                      <Listbox.Option
                        as={React.Fragment}
                        key={index}
                        value={option.value}>
                        {({ active, selected }) => {
                          return (
                            <li
                              className={`${
                                active
                                  ? "text-white bg-[#323254]"
                                  : "text-gray-900"
                              } cursor-default select-none relative py-2 md:py-3 px-3 `}>
                              <div className="flex items-center">
                                <p
                                  className={`${
                                    selected ? "font-semibold" : "font-normal"
                                  } text-[14px]  md:text-[16px] flex-1 truncate`}>
                                  {option.label}
                                </p>
                                {selected && (
                                  <BsCheck
                                    className={`text-[20px]  lg:text-[25px]`}
                                  />
                                )}
                              </div>
                            </li>
                          );
                        }}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>

            {error && (
              <p className="text-error text-[12px] font-[300]">{error}</p>
            )}
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;

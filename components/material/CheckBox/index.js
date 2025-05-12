import React from "react";
import { FaCheck } from "react-icons/fa";

const CheckBox = ({ checked, label, _onChange }) => {
  return (
    <button
      type="button"
      onClick={() => _onChange(label)}
      className="group flex items-center space-x-1 mt-5 ">
      <div
        className={`w-[28px] h-[28px] md:w-[31px] md:h-[31px] border ${
          checked ? "bg-secondary" : "border-[#727372]"
        } rounded-md flex justify-center items-center group-hover:border-primary`}
        style={checked ? { borderColor: "#6CC42A" } : {}}>
        {checked && <FaCheck className="text-white text-[18px]" />}
      </div>
      <div className="w-fit-content">
        <p className="text-[12px] md:text-[15px] text-left leading-tight text-center group-hover:text-primary">
          {label}
        </p>
      </div>
    </button>
  );
};

export default CheckBox;

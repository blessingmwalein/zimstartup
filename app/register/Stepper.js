"use client";

import { usePathname } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const steps = [
  {
    id: "type",
    name: "Type",
  },

  {
    id: "basic",
    name: "Basic info",
  },
  {
    id: "contact-info",
    name: "Contact info",
  },

  {
    id: "credentials",
    name: "Credentials",
  },
  // {
  //   id: "account-verification",
  //   name: "Account",
  //   name1: "Verification",
  // },

  {
    id: "complete",
    name: "Complete",
  },
];

const Stepper = () => {
  const pathname = usePathname();
  const active_step = steps.findIndex(
    (item) => item.id === pathname.split("/")[2]
  );

  const company_reg = useSelector((state) => state.general.company_reg);

  return (
    <div className="flex space-x-1">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex h-[50px] sm:h-[70px] justify-center items-center p-1 flex-1 border-b-[6px] ${
            index < active_step || active_step === 4
              ? "border-secondary bg-[#ededed] "
              : index === active_step
              ? "bg-[#ededed] border-primary"
              : "border-[#6b6b6b]"
          }`}>
          {(index < active_step || active_step === 4) && (
            <FaCheck className=" mr-1 sm:mr-2 text-[17px] sm:text-[22px] text-[#008009] " />
          )}

          <div className="w-[fit-content]">
            <p className="text-[11px] leading-tight text-center md:text-[17px]  font-medium">
              {step.name}
            </p>

            {step.name1 && (
              <p className="text-[11px] leading-tight text-center md:text-[17px]  font-medium">
                {step.name1}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;

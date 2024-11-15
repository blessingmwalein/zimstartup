// components/Stepper.tsx
import React from "react";

interface StepperProps {
  currentStep: number;
  headings: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, headings }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {headings.map((heading, index) => (
        <div
          key={index}
          className={`flex flex-col items-center ${
            index <= currentStep ? "text-blue-500" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full border-2 ${
              index <= currentStep ? "border-blue-500" : "border-gray-400"
            } flex items-center justify-center`}
          >
            <span className="font-medium">{index + 1}</span>
          </div>
          <span className="text-sm mt-2">{heading}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;

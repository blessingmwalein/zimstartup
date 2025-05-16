import React from "react";

interface StepperProps {
  currentStep: number;
  headings: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, headings }) => {
  return (
    <div className="mb-10 w-full">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-gray-200"></div>
        
        {/* Steps */}
        {headings.map((heading, index) => {
          const isActive = index <= currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              {/* Step Label */}
              <div className="absolute top-12 w-32 text-center">
                <span className={`text-xs font-medium ${isActive ? "text-blue-600" : "text-gray-500"}`}>
                  {heading}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;

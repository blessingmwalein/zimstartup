import type React from "react"

interface StepperProps {
  currentStep: number;
  headings: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, headings }) => {
  return (
    <div className="mb-8 overflow-x-auto pb-4">
      <div className="grid  grid-cols-4 gap-4">
        {headings.map((heading, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={index}
              className={`flex flex-col items-center gap-2 rounded-2xl px-3 py-4 font-medium transition-all ${isActive || isCompleted
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600"
                }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform ${isActive || isCompleted
                  ? "bg-white/20 text-white"
                  : "bg-blue-600/10 text-blue-600"
                  }`}
              >
                {isCompleted ? <span className="text-xl">✓</span> : <span className="text-lg font-bold">{index + 1}</span>}
              </div>
              <span className="text-center text-xs leading-tight font-semibold uppercase tracking-wider">
                {heading}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper

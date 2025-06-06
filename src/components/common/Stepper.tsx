import type React from "react"

interface StepperProps {
  currentStep: number
  headings: string[]
}

const Stepper: React.FC<StepperProps> = ({ currentStep, headings }) => {
  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-center ">
        {headings.map((heading, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep

          return (
            <div key={index} className="flex items-center">
              {/* Step Badge and Label */}
              <div className="flex items-center space-x-3">
                {/* Step Circle */}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {heading}
                </span>
              </div>

              {/* Connector Line */}
              {index < headings.length - 1 && <div className="mx-6 h-px w-16 bg-gray-200"></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Stepper

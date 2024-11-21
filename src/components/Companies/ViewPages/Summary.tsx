import Link from "next/link";
import React from "react";
import ReactApexChart from "react-apexcharts";


const CompanySummaryTab: React.FC<any> = () => {
  // Extract the first and last letters of the abbreviations
  const series = [75, 25];

  return (
    <main className="w-full space-y-6 rounded-lg bg-white p-4 shadow-md">
      {/* Pie Chart (Replace with actual chart component as needed) */}
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-black">
              <span> Invested </span>
              <span> 75% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-black">
              <span> Left to be funded </span>
              <span> 25% </span>
            </p>
          </div>
        </div>
      </div>

      {/* Invest Now Button */}
      <div className="text-center">
        <button className="rounded-lg bg-blue-500 px-8 py-2 font-semibold text-black hover:bg-blue-600">
          Invest Now
        </button>
      </div>

      {/* Overview Text */}
      <div className="text-gray-700">
        <h3 className="mb-2 text-xl font-semibold">Overview</h3>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis
          eros eget nisl malesuada ultrices. Ut aliquam ligula non venenatis
          viverra. Phasellus eu nulla at arcu ultrices efficitur.
        </p>
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <p className="text-gray-600">Additional content goes here...</p>
        {/* Add more content as needed */}
      </div>
    </main>
  );
};

export default CompanySummaryTab;

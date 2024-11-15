"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
  labels: ["Desktop", "Tablet", "Mobile", "Unknown"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ViewCompany: React.FC = () => {
  const series = [75, 25];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full ">
        <Breadcrumb pageName="View Company" />

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Sidebar for Navigation */}
          <aside className="w-full rounded-lg bg-gray-100 p-4 lg:w-1/5">
            <h2 className="mb-4 text-lg font-semibold">Sections</h2>
            <ul className="space-y-2">
              <li className="cursor-pointer rounded p-2 hover:bg-gray-200">
                Summary/Overview
              </li>
              <li className="cursor-pointer rounded p-2 hover:bg-gray-200">
                Documents/Reports
              </li>
              <li className="cursor-pointer rounded p-2 hover:bg-gray-200">
                Company News
              </li>
              <li className="cursor-pointer rounded p-2 hover:bg-gray-200">
                Directors & CEOs
              </li>
              <li className="cursor-pointer rounded p-2 hover:bg-gray-200">
                About the Company
              </li>
            </ul>
          </aside>

          {/* Main Content Area */}
          <main className="w-full space-y-6 rounded-lg bg-white p-4 shadow-md">
            {/* Pie Chart (Replace with actual chart component as needed) */}
            <div className="mb-2">
              <div id="chartThree" className="mx-auto flex justify-center">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="donut"
                />
              </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
              <div className="w-full px-8 sm:w-1/2">
                <div className="flex w-full items-center">
                  <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
                  <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                    <span> Invested </span>
                    <span> 75% </span>
                  </p>
                </div>
              </div>
              <div className="w-full px-8 sm:w-1/2">
                <div className="flex w-full items-center">
                  <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
                  <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                    <span> Left to be funded </span>
                    <span> 25% </span>
                  </p>
                </div>
              </div>
             
            </div>

            {/* Invest Now Button */}
            <div className="text-center">
              <button className="rounded-lg bg-blue-500 px-8 py-2 font-semibold text-white hover:bg-blue-600">
                Invest Now
              </button>
            </div>

            {/* Overview Text */}
            <div className="text-gray-700">
              <h3 className="mb-2 text-xl font-semibold">Overview</h3>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent quis eros eget nisl malesuada ultrices. Ut aliquam
                ligula non venenatis viverra. Phasellus eu nulla at arcu
                ultrices efficitur.
              </p>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <p className="text-gray-600">Additional content goes here...</p>
              {/* Add more content as needed */}
            </div>
          </main>

          {/* Optional Ad Section */}
        
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewCompany;

import Spinner from "@/components/common/Loader/spinner";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import UploadCompanyDialog from "../Modals/UploadCompanyLogo";
import DateDisplay from "@/components/common/Formatter/Date";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
const options: ApexOptions = {
    chart: {
        fontFamily: "Satoshi, sans-serif",
        type: "donut",
    },
    colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
    labels: ["Blessing", "Tendai", "Denzel", "Unknown"],
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
const ViewCompanyProfile: React.FC = () => {
    const { combinedCompanyData, status } = useSelector(
        (state: any) => state.company,
    );

    const series = [75, 25, 25];


    // Extract the company data
    const companyData = combinedCompanyData?.company_data || {};
    const contactData = combinedCompanyData?.company_contact_details || {};
    const stockMarketData = combinedCompanyData?.stock_market_details || {};

    if (status === "loading") {
        return (
            <div className="flex h-100 items-center justify-center">
                <Spinner
                    color="border-t-blue-500"
                    size="h-12 w-12"
                    alignCenter={true}
                />
            </div>
        );
    }

    return (
        <main className="w-full space-y-6 rounded-lg bg-white p-6 shadow-md">
            {/* <header className="flex items-center justify-between border-b pb-4">
        <h1 className="text-lg font-medium">Company Profile</h1>
        <button className="rounded-md bg-primary px-4 py-2 text-white">
          + Add Employee
        </button>
      </header> */}

            <div className="grid grid-cols-12 gap-6">
                {/* Left Section */}
                <div className="relative col-span-4 border-r pr-6">
                    {/* Edit Button */}

                    {/* Company Overview */}
                    <div className="space-y-4">

                        {/* About Section */}
                        <div className="space-y-1">



                            {/* <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Contact</h3>

                            </div> */}

                            <p className="flex flex-col items-start py-1 text-gray-500">
                                {/* Icon and Label */}
                                <div className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                        />
                                    </svg>
                                    <span className="text-base font-medium text-gray-500">Email:</span>
                                </div>
                                {/* Value */}
                                <span className="text-base font-medium text-gray-800 ml-7">
                                    {contactData.email || "N/A"}
                                </span>
                            </p>

                            <p className="flex flex-col items-start py-1 text-gray-500">
                                {/* Icon and Label */}
                                <div className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
                                        />
                                    </svg>
                                    <span className="text-base font-medium text-gray-500">Website:</span>
                                </div>
                                {/* Value */}
                                <span className="text-base font-medium text-gray-800 ml-7">
                                    {companyData.website || "N/A"}
                                </span>
                            </p>

                            <p className="flex flex-col items-start py-1 text-gray-500">
                                {/* Icon and Label */}
                                <div className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
                                        />
                                    </svg>
                                    <span className="text-base font-medium text-gray-500">Work email:</span>
                                </div>
                                {/* Value */}
                                <span className="text-base font-medium text-gray-800 ml-7">
                                    {contactData.work_email || "N/A"}
                                </span>
                            </p>

                            <p className="flex flex-col items-start py-1 text-gray-500">
                                {/* Icon and Label */}
                                <div className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                        />
                                    </svg>
                                    <span className="text-base font-medium text-gray-500">Phone:</span>
                                </div>
                                {/* Value */}
                                <span className="text-base font-medium text-gray-800 ml-7">
                                    {contactData.phone1 || "N/A"}
                                </span>
                            </p>
                            <p className="flex flex-col items-start py-1 text-gray-500">
                                {/* Icon and Label */}
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>


                                    <span className="text-base font-medium text-gray-500">Listed Date:</span>
                                </div>
                                {/* Value */}
                                <span className="text-base font-medium text-gray-800 ml-7">
                                    {/* {stockMarketData.listed_date || "N/A"} */}
                                    <DateDisplay date={stockMarketData.listed_date} />
                                </span>
                            </p>
                            <p className="flex flex-col items-start py-1 text-gray-500">
                                {/* Icon and Label */}
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>


                                    <span className="text-base font-medium text-gray-500">Year End:</span>
                                </div>
                                {/* Value */}
                                <span className="text-base font-medium text-gray-800 ml-7">
                                    <DateDisplay date={stockMarketData.financial_year_end} />

                                </span>
                            </p>
                            <p className="flex flex-col items-start py-1 text-gray-500">
                                {/* Icon and Label */}
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
                                    <span className="text-base font-medium text-gray-500">Transfer Secretary</span>
                                </div>
                                {/* Value */}
                                <span className="text-base font-medium text-gray-800 ml-7">
                                    {stockMarketData.transfer_secretary || "N/A"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="col-span-8 space-y-6">
                    <div className="mb-2">
                        <div id="chartThree" className="mx-auto flex justify-center">
                            <ReactApexChart options={options} series={series} type="donut" />
                        </div>
                    </div>

                    <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                        <div className="w-full px-8 sm:w-1/3">
                            <div className="flex w-full items-center">
                                <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
                                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-black">
                                    <span> Blessing </span>
                                    <span> 75% </span>
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-8 sm:w-1/3">
                            <div className="flex w-full items-center">
                                <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
                                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-black">
                                    <span> Tendai</span>
                                    <span> 25% </span>
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-8 sm:w-1/3">
                            <div className="flex w-full items-center">
                                <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
                                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-black">
                                    <span> Denzel</span>
                                    <span> 25% </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Invest Now Button */}
                    <div className="text-center">
                        <button className="rounded-lg bg-orange-500 px-8 py-2 font-semibold text-white hover:bg-oranage-600">
                            Invest Now
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ViewCompanyProfile;

import React from "react";
import { useSelector } from "react-redux";
import Spinner from "@/components/common/Loader/spinner";
import { PreviousFunds } from "../../../../state/models/stock";
import MoneyDisplay from "@/components/common/MoneyDisplay";
import DateDisplay from "@/components/common/Formatter/Date";

// Define the interface for Previous Funds Data

const ViewCompanyFunds: React.FC = () => {
    const { combinedCompanyData, status } = useSelector(
        (state: any) => state.company,
    );

    const previousFundsDetails: PreviousFunds =
        combinedCompanyData?.previous_funds || {};

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
        <main className="relative w-full rounded-lg bg-white p-6 shadow-md">


            {/* Previous Funds Information Grid */}
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>

                        <label className="text-base text-gray-600">Investor Type</label>
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {previousFundsDetails.investor_type || "N/A"}
                    </p>
                    <hr className="my-2" />
                </div>

                {/* Date of Funds */}
                <div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                            />
                        </svg>

                        <label className="text-base text-gray-600">Date of Funds</label>
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {
                            previousFundsDetails.date_of_funds ?
                                <DateDisplay date={previousFundsDetails.date_of_funds} /> : "N/A"}
                    </p>
                    <hr className="my-2" />
                </div>

                {/* Investor Information */}
                <div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                            />
                        </svg>

                        <label className="text-base text-gray-600">
                            Investor Information
                        </label>
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {previousFundsDetails.investor_information || "N/A"}
                    </p>
                    <hr className="my-2" />
                </div>

                {/* Investment Type */}
                <div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                            />
                        </svg>

                        <label className="text-base text-gray-600">Investment Type</label>
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {previousFundsDetails.investment_type || "N/A"}
                    </p>
                    <hr className="my-2" />
                </div>

                {/* Investment Currency */}
                <div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <label className="text-base text-gray-600">
                            Investment Currency
                        </label>
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {previousFundsDetails.investment_currency || "N/A"}
                    </p>
                    <hr className="my-2" />
                </div>

                {/* Investment Amount */}
                <div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                            />
                        </svg>

                        <label className="text-base text-gray-600">Investment Amount</label>
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {
                            previousFundsDetails.investment_amount ?
                                <MoneyDisplay amount={previousFundsDetails.investment_amount} /> : "N/A"}
                    </p>
                    <hr className="my-2" />
                </div>

                {/* Company Valuation */}
                <div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>

                        <label className="text-base text-gray-600">
                            Company Valuation Currency
                        </label>
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {previousFundsDetails.company_valuation_currency ? <span className="me-2 rounded border border-blue-400 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400">
                            {" "}
                            {previousFundsDetails.company_valuation_currency}
                        </span> : "N/A"}
                    </p>
                    <hr className="my-2" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
                            />
                        </svg>

                        <label className="text-base text-gray-600">Company Valuation</label>
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {previousFundsDetails.company_valuation ?
                            <MoneyDisplay amount={previousFundsDetails.company_valuation} /> : `N/A`}
                    </p>
                    <hr className="my-2" />
                </div>

                {/* Valuation Date */}
                <div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                            />
                        </svg>

                        <label className="text-base text-gray-600">Valuation Date</label>
                    </div>
                    <p className="text-base font-medium text-gray-700">
                        {previousFundsDetails.valuation_date ?
                            <DateDisplay date={previousFundsDetails.valuation_date} /> : `N/A`}
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ViewCompanyFunds;

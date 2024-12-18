import Spinner from "@/components/common/Loader/spinner";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import UploadCompanyDialog from "../Modals/UploadCompanyLogo";
import MoneyDisplay from "@/components/common/MoneyDisplay";

const TopCompanyWidget: React.FC = () => {
    const { combinedCompanyData, status } = useSelector(
        (state: any) => state.company
    );

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
        <main className="w-full space-y-6">
            <div className="space-y-4">
                {/* Header Section */}
                <div className="flex items-center justify-between  space-x-4">

                    <div>
                        <h1 className="text-4xl font-semibold text-gray-800">
                            {companyData.company_name || "Company Name"}
                        </h1>
                        <h4 className="text-2xl font-semibold text-gray-500">
                            Active : {stockMarketData.exchange_name || "ZSE"}
                        </h4>
                        <p className="mt-2 text-lg text-orange-500">
                            {companyData.sector || ""} | {companyData.location || "Zimbabwe "} | {stockMarketData.exchange_country || "Harare"}
                        </p>
                        {/* <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                            {companyData.status || "Status"}
                        </span> */}
                    </div>

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-md bg-gray-200 text-4xl font-bold text-gray-700">
                        {/* Abbreviations */}
                        {companyData.company_abbreviations || "NA"}

                        {/* Camera Icon */}
                        <div className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700">
                            <UploadCompanyDialog />
                        </div>
                    </div>
                </div>

                {/* Stock Details Section */}
                <div className="grid grid-cols-1 gap-6 r md:grid-cols-2 lg:grid-cols-3">


                    {/* Share Price */}
                    <div className="space-y-1">
                        <h4 className="text-base font-medium text-gray-600">Current Market Cap(USD)</h4>
                        <p className="text-2xl font-semibold text-gray-800">
                        {stockMarketData.current_market_cap && <MoneyDisplay amount={stockMarketData.current_market_cap} />}

                        </p>
                    </div>

                    {/* Market Cap */}
                    <div className="space-y-1">
                        <h4 className="text-base font-medium text-gray-600">Listing Capital({stockMarketData.listing_currency ?? "USD"})</h4>
                        <p className="text-2xl font-semibold text-gray-800">
                            {stockMarketData.listing_capital && <MoneyDisplay amount={stockMarketData.listing_capital} />}
                        </p>
                    </div>

                    {/* Company Status */}
                    <div className="space-y-1">
                        <h4 className="text-base font-medium text-gray-600">Todays Volume</h4>
                        <p className="text-2xl font-semibold text-gray-800">
                            {companyData.todays_volume ? companyData.todays_volume : "1K"}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TopCompanyWidget;

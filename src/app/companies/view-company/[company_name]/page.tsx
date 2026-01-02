"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Building2,
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  MapPin,
} from "lucide-react";

import ViewCompanyDetails from "@/components/Companies/ViewPages/ViewCompanyDetails";
import ViewStockMarketDetails from "@/components/Companies/ViewPages/ViewStockMarketDetails";
import ViewPreviousFundsDetails from "@/components/Companies/ViewPages/ViewPreviousFunds";
import ViewCompanyDocuments from "@/components/Companies/Dashboard/ViewCompanyDocuments";
import ViewCompanyRequest from "@/components/Companies/ViewPages/ViewCompanyRequest";
import { fetchCompanyDataCombined, fetchCompanyDocuments } from "@/state/slices/companySlice";
import { AppDispatch } from "@/state/store";
import TopCompanyWidget from "@/components/Companies/Dashboard/TopWidget";
import ViewCompanyProfile from "@/components/Companies/Dashboard/ViewCompanyProfile";
import ViewCompanyFunds from "@/components/Companies/Dashboard/ViewCompanyFunds";
import ViewCompanyStockMarket from "@/components/Companies/Dashboard/ViewCompanyStockMarket";

const ViewCompany: React.FC = ({ params }: any) => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        status,
        error: reduxError,
        combinedCompanyData: CompanyCombinedResponse,
        customerData,
    } = useSelector((state: any) => state.company);

    const getCompanyCombinedData = async (companyName: string) => {
        try {
            await dispatch(fetchCompanyDataCombined(companyName)).unwrap();
        } catch (err: any) {
            console.log("Error:", err);
        }
    };

    //fetch comapany documents
    const getCompanyDocuments = async (companyId: number) => {
        try {
            await dispatch(fetchCompanyDocuments(companyId)).unwrap();
        } catch (err: any) {
            console.log("Error:", err);
        }
    };

    useEffect(() => {
        const fetchCompanyDataAndDocuments = async () => {
            const companyName = params.company_name;
            if (companyName) {
                const decodedCompanyName = decodeURIComponent(companyName);
                try {
                    // Fetch combined company data and get the response directly
                    const companyData = await dispatch(
                        fetchCompanyDataCombined(decodedCompanyName),
                    ).unwrap();

                    // Print company data
                    console.log("Company Data:", companyData);

                    // Extract companyId from the fetched data
                    const companyId = companyData?.company_data?.company_id;
                    if (companyId) {
                        await getCompanyDocuments(companyId);
                    } else {
                        console.log("Company ID is not available.");
                    }
                } catch (err) {
                    console.error("Error during fetching data:", err);
                }
            }
        };

        fetchCompanyDataAndDocuments();
    }, [params.company_name, dispatch]); // Inc

    const pages = [
        {
            name: "Company Profile",
            tab: <ViewCompanyProfile />,
        },
        {
            name: "Stock Market",
            tab: <ViewCompanyStockMarket />,
        },
        {
            name: "Funds",
            tab: <ViewCompanyFunds />,
        },
        {
            name: "Documents & Reports",
            tab: <ViewCompanyDocuments />,
        },
    ];

    return (
        <DefaultLayout>
            <div className="mx-auto max-w-full p-4">
                {/* Company Header Widget */}
                <div className="mb-6">
                    <TopCompanyWidget />
                </div>

                {/* Tabs Section */}
                <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
                    <TabGroup>
                        {/* Tab Navigation - Card Style */}
                        <div className="p-4">
                            <TabList className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4">
                                {pages.map(({ name }) => (
                                    <Tab
                                        key={name}
                                        className={({ selected }) =>
                                            `flex flex-col items-center gap-2 rounded-lg px-4 py-4 font-medium transition-all ${
                                                selected
                                                    ? "bg-primary text-white shadow-md"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-meta-4 dark:text-gray-400 dark:hover:bg-opacity-80"
                                            }`
                                        }
                                    >
                                        {({ selected }) => (
                                            <span className="text-center text-sm">{name}</span>
                                        )}
                                    </Tab>
                                ))}
                            </TabList>
                        </div>

                        {/* Tab Content */}
                        <TabPanels className="border-t border-stroke dark:border-strokedark">
                            {pages.map(({ name, tab }) => (
                                <TabPanel key={name} className="p-6">
                                    {tab}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ViewCompany;

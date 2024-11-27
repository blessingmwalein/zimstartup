"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CompanySummaryTab from "@/components/Companies/ViewPages/Summary";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../../state/store";
import { CompanyCombinedResponse } from "../../../../../../state/models/company";
import { useEffect } from "react";
import {
  fetchCompanyDataCombined,
  fetchCompanyDocuments,
} from "../../../../../../state/slices/companySlice";
import ViewCompanyDetails from "@/components/Companies/ViewPages/ViewCompanyDetails";
import ViewStockMarketDetails from "@/components/Companies/ViewPages/ViewStockMarketDetails";
import ViewPreviousFundsDetails from "@/components/Companies/ViewPages/ViewPreviousFunds";
import ViewCompanyDocuments from "@/components/Companies/ViewPages/ViewCompanyDocuments";

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
      name: "Summary Details",
      tab: <ViewCompanyDetails />,
      icon: (
        <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
            fill=""
          />
          <path
            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
            fill=""
          />
          <path
            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
            fill=""
          />
          <path
            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
            fill=""
          />
        </svg>
      ),
    },

    {
      name: "Stock Market",
      tab: <ViewStockMarketDetails />,
      icon: (
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
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
      ),
    },
    {
      name: "Previous Funds",
      tab: <ViewPreviousFundsDetails />,
      icon: (
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
      ),
    },
    {
      name: "Directors & CEOs",
      tab: <h2 />,
      icon: (
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
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
    },
    {
      name: "Documents",
      tab: <ViewCompanyDocuments />,
      icon: (
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
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full ">
        <div className="px-6 py-4">
          <Breadcrumb pageName="View Company" />
        </div>
        <div className="w-full ">
          <TabGroup>
            <TabList className="flex w-full gap-4 border-b border-gray-300 px-4">
              {pages.map(({ name, icon }) => (
                <Tab
                  key={name}
                  className={({ selected }) =>
                    `flex items-center justify-center gap-2 px-1 py-2 text-center text-base  ${
                      selected
                        ? "border-b-2 border-orange-500 font-semibold text-orange-500"
                        : "font-normal text-gray-600 hover:bg-gray-100"
                    } `
                  }
                >
                  <div className="text-lg">{icon}</div>
                  <span>{name}</span>
                </Tab>
              ))}
            </TabList>

            {/* Divider between title and content */}
            <TabPanels>
              {pages.map(({ name, tab }) => (
                <TabPanel key={name} className="rounded-xl bg-gray-50 p-4">
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

"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CompanySummaryTab from "@/components/Companies/ViewPages/Summary";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";

const ViewCompany: React.FC = () => {
  const pages = [
    {
      name: "Summary/Overview",
      tab: <CompanySummaryTab />,
    },
    {
      name: "Documents/Reports",
      tab: <h2 />,
    },
    {
      name: "Company News",
      tab: <h2 />,
    },
    {
      name: "Directors & CEOs",
      tab: <h2 />,
    },
    {
      name: "About the Company",
      tab: <h2 />,
    },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full">
        <Breadcrumb pageName="View Company" />
        <div className="w-full ">
          <TabGroup>
            <TabList className="flex w-full gap-4 border-b border-gray-300">
              {pages.map(({ name }) => (
                <Tab
                  key={name}
                  className="flex-1 rounded-t-md py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <div className="mt-2 border-b border-gray-300"></div>{" "}
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

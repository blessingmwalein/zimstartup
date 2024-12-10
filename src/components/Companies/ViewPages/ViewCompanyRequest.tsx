import Spinner from "@/components/common/Loader/spinner";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import UploadCompanyDialog from "../Modals/UploadCompanyLogo";

const ViewCompanyRequest: React.FC = () => {
  const { combinedCompanyData, status } = useSelector(
    (state: any) => state.company,
  );

  // Extract the company data
  const companyData = combinedCompanyData?.company_data || {};
  const contactData = combinedCompanyData?.company_contact_details || {};

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
        {/* Right Section */}
        <div className="col-span-12 space-y-6">
          {/* Job Information */}
          <section>
            <header className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Company Funds Requests</h3>
              <Link
                href={`${companyData.company_name}/add-request`}
                className="rounded-md bg-primary px-4 py-2 text-white"
              >
                + Add Request
              </Link>
            </header>
            <table className="mt-4 w-full rounded-lg border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">Division</th>
                  <th className="px-4 py-2 text-left">Manager</th>
                  <th className="px-4 py-2 text-left">Hire Date</th>
                  <th className="px-4 py-2 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Engineering</td>
                  <td className="px-4 py-2">Software</td>
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">2024-04-01</td>
                  <td className="px-4 py-2">{companyData.location}</td>
                </tr>
                {/* Add rows dynamically as required */}
              </tbody>
            </table>
          </section>

          {/* Compensation */}
          {/* <section>
            <header className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Compensation</h3>
              <button className="text-primary underline">View All</button>
            </header>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between text-sm">
                <span>1200 USD per month</span>
                <span>Effective on 2024-01-01</span>
              </li>
              
            </ul>
          </section> */}

          {/* Activity */}
          {/* <section>
            <header className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Activity</h3>
              <button className="text-primary underline">View All</button>
            </header>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center space-x-2 text-sm">
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">John Miller</p>
                  <p className="text-gray-500">Last login on July 13, 2024</p>
                </div>
              </li>
             
            </ul>
          </section> */}
        </div>
      </div>
    </main>
  );
};

export default ViewCompanyRequest;

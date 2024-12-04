import Spinner from "@/components/common/Loader/spinner";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const ViewCompanyDetails: React.FC = () => {
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
        {/* Left Section */}
        <div className="relative col-span-4 border-r pr-6">
          {/* Edit Button */}

          {/* Company Overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-700">
                {companyData.company_abbreviations}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {companyData.company_name}
                </h2>
                <p className="text-gray-600">
                  {companyData.company_short_description}
                </p>
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                  {companyData.status}
                </span>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">General</h3>
                <Link
                  href={`/profile/companies/view-company/${companyData.company_name}/edit-details`}
                  className="items-center justify-center  p-2 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487a2.25 2.25 0 0 1 3.182 3.182l-9.056 9.056-3.49 1.165a1.125 1.125 0 0 1-1.348-1.348l1.165-3.49 9.056-9.056z"
                    />
                  </svg>
                </Link>
              </div>

              <p className="flex items-center space-x-2  py-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                  />
                </svg>

                <span className="text-base font-medium text-gray-500">
                  Sector:
                </span>
                <span className="text-base font-medium text-gray-800">
                  {companyData.sector}
                </span>
              </p>
              <p className="flex items-center space-x-2  py-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span className="text-base font-medium text-gray-500">
                  Location:
                </span>
                <span className="text-base font-medium text-gray-800">
                  {companyData.location}
                </span>
              </p>
              <p className="flex items-center space-x-2  py-1 text-gray-500 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
                  />
                </svg>

                <span className="text-base font-medium text-gray-500">
                  Website:
                </span>
                <span className="text-base font-medium text-gray-800">
                  {companyData.website}
                </span>
              </p>

              <div className="py-2">
                <hr />
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Contact</h3>
                <Link
                  href={`/profile/companies/view-company/${companyData.company_name}/edit-contact-details`}
                  className="items-center  justify-center p-2  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487a2.25 2.25 0 0 1 3.182 3.182l-9.056 9.056-3.49 1.165a1.125 1.125 0 0 1-1.348-1.348l1.165-3.49 9.056-9.056z"
                    />
                  </svg>
                </Link>
              </div>

              <p className="flex items-center space-x-2  py-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <span className="text-base font-medium text-gray-500">
                  Email:
                </span>
                <span className="text-base font-medium text-gray-800">
                  {contactData.email}
                </span>
              </p>
              <p className="flex items-center space-x-2  py-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <span className="text-base font-medium text-gray-500">
                  Work email:
                </span>
                <span className="text-base font-medium text-gray-800">
                  {contactData.work_email}
                </span>
              </p>
              <p className="flex items-center space-x-2  py-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <span className="text-base font-medium text-gray-500">
                  Phone 1:
                </span>
                <span className="text-base font-medium text-gray-800">
                  {contactData.phone1}
                </span>
              </p>
              <p className="flex items-center space-x-2  py-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <span className="text-base font-medium text-gray-500">
                  Phone 2:
                </span>
                <span className="text-base font-medium text-gray-800">
                  {contactData.phone2}
                </span>
              </p>
              <p className="flex items-center space-x-2  py-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <span className="text-base font-medium text-gray-500">
                  Phone 3:
                </span>
                <span className="text-base font-medium text-gray-800">
                  {contactData.phone3}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-8 space-y-6">
          {/* Job Information */}
          <section>
            <header className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Shareholders</h3>
              <Link
                href={`${companyData.company_name}/add-shareholder`}
                className="rounded-md bg-primary px-4 py-2 text-white"
              >
                + Add Shareholder
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

export default ViewCompanyDetails;

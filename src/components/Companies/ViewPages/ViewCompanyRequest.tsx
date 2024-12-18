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

  // Dummy Company Requests
  const dummyRequests = [
    {
      company_id: 102,
      request_type: "Funds Allocation",
      status: "Pending",
      created_at: "2024-12-18",
    },
    {
      company_id: 103,
      request_type: "Resource Approval",
      status: "Approved",
      created_at: "2024-12-15",
    },
  ];

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


      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6">
          {/* Job Information */}

          {/* Dummy Company Requests */}
          <section>
            <header className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Dummy Company Requests</h3>
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
                  <th className="px-4 py-2 text-left">Company ID</th>
                  <th className="px-4 py-2 text-left">Request Type</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {dummyRequests.map((request, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{request.company_id}</td>
                    <td className="px-4 py-2">{request.request_type}</td>
                    <td className="px-4 py-2">{request.status}</td>
                    <td className="px-4 py-2">{request.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ViewCompanyRequest;

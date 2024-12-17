"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WalletOverView from "@/components/Wallet/OverViewCard";
import React from "react";
import { useSelector } from "react-redux";

const WalletDashboard: React.FC = () => {
  const { status, error: reduxError, user, customerData } = useSelector(
    (state: any) => state.auth
  );

  // Mock transaction data (replace this with actual data from your state or API)
  const transactions = [
    { id: 1, date: "2024-12-08", description: "Payment to Vendor A", amount: "-$250.00", status: "Completed" },
    { id: 2, date: "2024-12-07", description: "Refund from Vendor B", amount: "+$100.00", status: "Pending" },
    { id: 3, date: "2024-12-06", description: "Transfer to Savings", amount: "-$500.00", status: "Completed" },
    { id: 4, date: "2024-12-05", description: "Salary Credit", amount: "+$2000.00", status: "Completed" },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full px-4 mt-6">
        <Breadcrumb pageName="Wallet Dashboard" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
            <div className="flex w-full flex-row">
              {/* Wallet Overview Card */}
              <div className="w-full">
                <WalletOverView />
              </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Recent Transactions
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 dark:bg-boxdark dark:text-gray-400">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                        Date
                      </th>
                      <th className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                        Description
                      </th>
                      <th className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                        Amount
                      </th>
                      <th className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b dark:border-strokedark">
                        <td className="px-4 py-2">{transaction.date}</td>
                        <td className="px-4 py-2">{transaction.description}</td>
                        <td className="px-4 py-2">{transaction.amount}</td>
                        <td
                          className={`px-4 py-2 font-medium ${
                            transaction.status === "Completed"
                              ? "text-green-500"
                              : transaction.status === "Pending"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default WalletDashboard;

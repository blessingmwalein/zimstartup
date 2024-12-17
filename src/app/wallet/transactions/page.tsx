"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Transactions: React.FC = () => {
  const { status, error: reduxError } = useSelector((state: any) => state.auth);

  // Mock transaction data (replace with actual data from your state or API)
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-12-08", description: "Payment to Vendor A", amount: "-$250.00", status: "Completed" },
    { id: 2, date: "2024-12-07", description: "Refund from Vendor B", amount: "+$100.00", status: "Pending" },
    { id: 3, date: "2024-12-06", description: "Transfer to Savings", amount: "-$500.00", status: "Completed" },
    { id: 4, date: "2024-12-05", description: "Salary Credit", amount: "+$2000.00", status: "Completed" },
  ]);

  const handleViewMore = () => {
    console.log("Load more transactions");
    // Logic to fetch more transactions
  };

  const handleEdit = (id: number) => {
    console.log("Edit transaction with ID:", id);
    // Logic to edit transaction
  };

  const handleDelete = (id: number) => {
    console.log("Delete transaction with ID:", id);
    // Logic to delete transaction
  };

  const handleExportCSV = () => {
    console.log("Exporting to CSV");
    // Logic to export transactions to CSV
  };

  const handleExportPDF = () => {
    console.log("Exporting to PDF");
    // Logic to export transactions to PDF
  };

  return (
    <DefaultLayout>
      <div className="mx-auto mt-6 max-w-full px-4">
        <Breadcrumb pageName="Transactions" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
            {/* Export Buttons */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-black dark:text-white">
                Recent Transactions
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={handleExportCSV}
                  className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none"
                >
                  Export CSV
                </button>
                <button
                  onClick={handleExportPDF}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none"
                >
                  Export PDF
                </button>
              </div>
            </div>

            {/* Transactions Table */}
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
                    <th className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                      Actions
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
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(transaction.id)}
                            className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 focus:outline-none"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 focus:outline-none"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View More Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleViewMore}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Transactions;

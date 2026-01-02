"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store";
import { fetchUserWatchList } from "@/state/slices/companySlice";
import Link from "next/link";
import { X, Building2, Calendar, FileText, CheckCircle2 } from "lucide-react";

interface WatchlistItem {
  watchlist_status: boolean;
  company_id: number;
  watchlist_date: string;
  company_abbreviations: string;
  company_name: string;
  company_start_date: string;
  request_type: string;
  request_status: string;
}

const WatchListTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedItem, setSelectedItem] = useState<WatchlistItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    status,
    error: reduxError,
    watchlist_details = [],
  } = useSelector((state: any) => state.company);

  useEffect(() => {
    if (user?.national_id) {
      dispatch(fetchUserWatchList(user.national_id));
    }
  }, [user, dispatch]);

  const handleViewDetails = (item: WatchlistItem) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Total ({watchlist_details.length}) Companies
      </h4>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Company Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Request Type
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Request Status
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Watchlist Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {watchlist_details.map((item: WatchlistItem, key: number) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.company_name}
                  </h5>
                  <p className="text-sm text-gray-500">{item.company_abbreviations}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.request_type}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      item.request_status === "APPROVED"
                        ? "bg-success text-success"
                        : item.request_status === "PENDING"
                        ? "bg-warning text-warning"
                        : "bg-danger text-danger"
                    }`}
                  >
                    {item.request_status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      item.watchlist_status
                        ? "bg-success text-success"
                        : "bg-danger text-danger"
                    }`}
                  >
                    {item.watchlist_status ? "Active" : "Inactive"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="hover:text-primary"
                      title="View Details"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>

                    <Link
                      href={`/companies/${item.company_id}`}
                      className="hover:text-primary"
                      title="Go to Company Page"
                    >
                      <Building2 className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {status === "loading" && <p className="p-4">Loading watchlist...</p>}
        {reduxError && <p className="p-4 text-red-500">Error: {reduxError}</p>}
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
            onClick={closeDrawer}
          />

          {/* Drawer Panel */}
          <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white shadow-xl transition-transform dark:bg-boxdark">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Watchlist Details
              </h3>
              <button
                onClick={closeDrawer}
                className="hover:bg-gray-100 dark:hover:bg-meta-4 rounded-lg p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            {selectedItem && (
              <div className="p-6">
                {/* Company Info */}
                <div className="mb-6 rounded-lg border border-stroke bg-gray-50 p-4 dark:border-strokedark dark:bg-meta-4">
                  <div className="mb-3 flex items-center">
                    <Building2 className="mr-2 h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold text-black dark:text-white">
                      {selectedItem.company_name}
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Abbreviation:</span>
                      <span className="font-medium text-black dark:text-white">
                        {selectedItem.company_abbreviations}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Company ID:</span>
                      <span className="font-medium text-black dark:text-white">
                        {selectedItem.company_id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Request Information */}
                <div className="mb-6">
                  <h5 className="mb-3 flex items-center text-base font-semibold text-black dark:text-white">
                    <FileText className="mr-2 h-4 w-4" />
                    Request Information
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-sm text-gray-500">Request Type</label>
                      <p className="font-medium text-black dark:text-white">
                        {selectedItem.request_type}
                      </p>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-gray-500">Status</label>
                      <span
                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                          selectedItem.request_status === "APPROVED"
                            ? "bg-success text-success"
                            : selectedItem.request_status === "PENDING"
                            ? "bg-warning text-warning"
                            : "bg-danger text-danger"
                        }`}
                      >
                        {selectedItem.request_status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="mb-6">
                  <h5 className="mb-3 flex items-center text-base font-semibold text-black dark:text-white">
                    <Calendar className="mr-2 h-4 w-4" />
                    Important Dates
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-sm text-gray-500">Company Start Date</label>
                      <p className="font-medium text-black dark:text-white">
                        {formatDate(selectedItem.company_start_date)}
                      </p>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-gray-500">Added to Watchlist</label>
                      <p className="font-medium text-black dark:text-white">
                        {formatDate(selectedItem.watchlist_date)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Watchlist Status */}
                <div className="mb-6">
                  <h5 className="mb-3 flex items-center text-base font-semibold text-black dark:text-white">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Watchlist Status
                  </h5>
                  <span
                    className={`inline-flex rounded-full bg-opacity-10 px-4 py-2 text-sm font-medium ${
                      selectedItem.watchlist_status
                        ? "bg-success text-success"
                        : "bg-danger text-danger"
                    }`}
                  >
                    {selectedItem.watchlist_status ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/companies/${selectedItem.company_id}`}
                    className="flex-1 rounded-lg bg-primary px-4 py-3 text-center font-medium text-white transition-colors hover:bg-opacity-90"
                  >
                    View Company Page
                  </Link>
                  <button
                    onClick={closeDrawer}
                    className="flex-1 rounded-lg border border-stroke bg-gray-100 px-4 py-3 font-medium text-black transition-colors hover:bg-gray-200 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:bg-meta-4/80"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WatchListTable;
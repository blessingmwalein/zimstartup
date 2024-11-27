import React from "react";
import { useSelector } from "react-redux";
import Spinner from "@/components/common/Loader/spinner";
import DateDisplay from "@/components/common/Formatter/Date";
import UploadDocumentDialog from "../Modals/UploadCompanyDocument";

const ViewCompanyDocuments: React.FC = () => {
    const { companyDocuments, status } = useSelector(
      (state: any) => state.company,
    );

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
    <main className="relative w-full rounded-lg bg-white p-6 shadow-md">
      {/* Upload Document Button */}
      <UploadDocumentDialog />

      {/* Conditional Rendering */}
      {companyDocuments.length === 0 ? (
        <div className="mt-8 flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-12 w-12 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3H6.75A2.25 2.25 0 0 0 4.5 5.25V18.75A2.25 2.25 0 0 0 6.75 21H17.25A2.25 2.25 0 0 0 19.5 18.75V9H15.75Z"
            />
          </svg>
          <p className="mt-4 text-sm text-gray-500">
            No documents uploaded yet.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 py-4 sm:grid-cols-2 lg:grid-cols-3">
          {companyDocuments.map((doc: any) => (
            <div
              key={doc.id}
              className="relative flex flex-row items-center gap-3 rounded-lg border border-gray-200 bg-white p-8 transition duration-300 hover:shadow-lg"
            >
              {/* Document Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700">
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>

              {/* File Details */}
              <div className="flex flex-col">
                <h3 className="truncate text-sm font-medium text-gray-800">
                  {doc.document_name.split(".")[0]}
                </h3>
                <span className="text-xs text-gray-500">File Size: 1.2MB</span>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 flex flex-col items-center justify-between bg-gray-900 bg-opacity-75 p-4 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                <h3 className="text-sm font-medium">{doc.document_name}</h3>
                <p className="text-xs">
                  Uploaded On: <DateDisplay date={doc.created_at} />
                </p>
                <div className="mt-2 flex gap-4">
                  {/* Edit Button */}
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700"
                    aria-label="Edit"
                  >
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  {/* Delete Button */}
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 hover:bg-red-700"
                    aria-label="Delete"
                  >
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  {/* Download Button */}
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 hover:bg-green-700"
                    aria-label="Download"
                  >
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
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-6-9-3 3m0 0-3-3m3 3V3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ViewCompanyDocuments;

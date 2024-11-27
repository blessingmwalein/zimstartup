import Link from "next/link";
import React from "react";
import { Company } from "../../../state/models/company";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  // Extract the first and last letters of the abbreviations
  const avatarText = `${company.company_abbreviations[0]}${company.company_abbreviations.slice(-1)}`;

  return (
    <Link href={`companies/${company.company_id}`}>
      <div className="relative rounded-lg bg-white p-6 shadow-md">
        {/* Love Icon */}
        <div className="absolute right-2 top-2">
          <button className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-red-500">
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        {/* Card Content */}
        <div className="flex flex-row items-center">
          {/* Circle Avatar */}
          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
            {avatarText}
          </div>

          {/* Company Details */}
          <div className="flex flex-col">
            <p className="mt-2 text-base text-gray-700">
              {company.company_name}
            </p>
            <p className="mt-0.5 flex flex-row text-xs text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 h-4 w-4"
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
              {company.location}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-2 flex flex-row">
          <span className="me-2 items-end rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {company.sector}
          </span>
          {company.request_type && (
            <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
              {company.request_type}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 flex flex-row items-center justify-between">
          <span className="block text-xs font-bold text-gray-700">
            {company.name}
          </span>
          <p className="flex flex-row items-center text-xs text-gray-500">
            <div className="mr-2 h-2 w-2 rounded-full bg-gray-500"></div>
            {company.business_state}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;

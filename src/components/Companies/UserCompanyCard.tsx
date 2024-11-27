import Link from "next/link";
import React, { useState } from "react";
import { Company, UserCompaniesResponse } from "../../../state/models/company";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state/store";
import { addCompanyToWatch } from "../../../state/slices/companySlice";
import { toast } from "react-toastify";

interface CompanyCardProps {
  company: UserCompaniesResponse;
}

const UserCompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  // Extract the first and last letters of the abbreviations for avatar
  const avatarText = `${company.company_abbreviations[0]}${company.company_abbreviations.slice(-1)}`;

  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setError(null);

    const updatePayload = {
      company_id: 102,
      national_id: "632095320E63",
      watchlist_status: true,
    };

    try {
      const response = await dispatch(
        addCompanyToWatch(updatePayload),
      ).unwrap();

      toast.success("Company added to watchlist", {
        position: "bottom-center",
      });
    } catch (err: any) {
      console.log(err);
      setError(err || "Failed to add company to watchlist");
      toast.error(err || "Failed to add company to watchlist", {
        position: "bottom-center",
      });
    }
  };

  return (
    <Link href={"#"}>
      <div className="relative rounded-lg bg-white p-6 shadow-md">
        {/* Love Icon */}
        <div className="absolute right-2 top-2">
          <button
            onClick={onSubmit}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-red-500"
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
            <div className="mt-2 flex flex-row">
              {/* Status Badge */}
              <span
                className={`rounded px-2.5 py-0.5 text-xs font-medium 
                  ${
                    company.status === "PENDING CHECK"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  }`}
              >
                {company.status}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex h-full flex-row justify-between">
          <div className="flex flex-row items-start justify-between">
            <span className="block text-base font-bold text-gray-700">
              {company.company_name}
            </span>
          </div>
          <div className="flex justify-end  space-x-2">
            {/* Website Button */}
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block flex flex-row items-center justify-center rounded-full bg-blue-100 px-4 py-2 text-xs font-medium text-blue-700 hover:bg-blue-200"
            >
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
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              Website
            </a>

            {/* View Button */}
            <Link
              href={`/profile/companies/view-company/${company.company_name}`}
              className="inline-block flex flex-row items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600"
            >
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
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              View
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCompanyCard;

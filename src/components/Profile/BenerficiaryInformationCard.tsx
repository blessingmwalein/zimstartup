import React from 'react';
import { BeneficiaryDetails } from '../../../state/models/customer';
import BeneSvg from './BeneSvg';
import Link from 'next/link';

interface BeneficiaryInformationCardProps {
  beneficiaryDetails: BeneficiaryDetails;
}

const BeneficiaryInformationCard: React.FC<BeneficiaryInformationCardProps> = ({ beneficiaryDetails }) => {
  const fields: (keyof BeneficiaryDetails)[] = [
    "nk_title", "nk_first_name", "nk_last_name", "gender_of_keen",
    "nk_marital_status", "nk_nationality", "reason_of_selection",
    "next_phone_number", "next_phone_number2", "next_telephone",
    "next_email", "nk_address", "nk_city", "nk_country", "redeem_time_months"
  ];

  const missingFields = fields.filter(field => !beneficiaryDetails[field as keyof BeneficiaryDetails]);

  return (
    <div className="relative mx-auto rounded-lg border border-gray-300 p-5 bg-white dark:bg-[#37404F] dark:border-strokedark mb-4">
      <Link
        href="/profile/beneficiaries/update"
        className="absolute top-4 right-4 inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
        Edit
      </Link>

      <h2 className="text-1xl font-normal text-gray-700 dark:text-white mb-4">Beneficiary Information</h2>

      {/* Show alert if all fields are missing */}
      {missingFields.length === fields.length ? (
        <div className="flex flex-col items-center justify-center text-yellow-600 p-4 rounded mb-4">
          <BeneSvg />
          <p className="text-sm text-center mt-1 mb-3">
            Beneficiary information is missing. Please add beneficiary details.
          </p>
          <Link
            href={`/profile/beneficiaries/update`}
            className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
            Add
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {fields.map((field) => {
            if (beneficiaryDetails[field]) {
              return (
                <div key={field}>
                  <label className="text-xs text-gray-600 dark:text-gray-300 capitalize">{field.replace('_', ' ')}</label>
                  <p className="font-normal text-sm text-black dark:text-white">{beneficiaryDetails[field]}</p>
                </div>
              );
            }
            return null; // Skip rendering empty fields
          })}
        </div>
      )}
    </div>
  );
};

export default BeneficiaryInformationCard;

import React from 'react';
import { WorkDetails } from '../../../state/models/customer';
import WorkSvg from './WorkSvg'; // Assuming you have a WorkSvg component for the icon
import Link from 'next/link';

interface WorkInformationCardProps {
  workDetails: WorkDetails;
}

const WorkInformationCard: React.FC<WorkInformationCardProps> = ({ workDetails }) => {
  const fields: (keyof WorkDetails)[] = [
    "ce_employer_name", "employer_country", "status_of_employment", 
    "profession", "sector"
  ];

  const missingFields = fields.filter(field => !workDetails[field as keyof WorkDetails]);

  return (
    <div className="mx-auto rounded-lg border border-gray-300 p-5 bg-white dark:bg-[#37404F] dark:border-strokedark mb-4 relative">
      {/* Edit button aligned to the top right */}
      <Link
        href="/profile/work/update"
        className="absolute top-4 right-4 inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </span>
        Edit
      </Link>

      <h2 className="text-1xl font-normal text-gray-700 dark:text-white mb-4">Work Information</h2>
      
      {/* Show alert if all fields are missing */}
      {missingFields.length === fields.length ? (
        <div className="flex flex-col items-center justify-center text-yellow-600 p-4 rounded mb-4">
          <WorkSvg /> {/* Work icon, replace with your own icon */}
          
          {/* alert text */}
          <p className="text-sm text-center mt-1 mb-3">
            Work information is missing. Please add your work details.
          </p>

          <Link
            href="/profile/work/update"
            className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
            Add
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {fields.map((field) => {
            if (workDetails[field]) {
              return (
                <div key={field}>
                  <label className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                    {field.replace('_', ' ')}
                  </label>
                  <p className="font-normal text-sm text-black dark:text-white">
                    {workDetails[field]}
                  </p>
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

export default WorkInformationCard;

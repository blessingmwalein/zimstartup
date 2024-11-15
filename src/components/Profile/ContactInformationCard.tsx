import React from 'react';
import { ContactDetails } from '../../../state/models/customer';
import ContactSvg from './ContactSvg';
import Link from 'next/link';

interface ContactInformationCardProps {
  contactDetails: ContactDetails;
}

const ContactInformationCard: React.FC<ContactInformationCardProps> = ({ contactDetails }) => {
  const fields: (keyof ContactDetails)[] = [
    "email", "work_email", "phone1", "phone2", "phone3", 
    "address1", "address2", "town", "city", "state", "postal_code"
  ];

  const missingFields = fields.filter(field => !contactDetails[field as keyof ContactDetails]);

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-gray-300 p-5 bg-white dark:bg-[#37404F] dark:border-strokedark mb-4 relative">
      {/* Edit button aligned to the top right */}
      <Link
        href="/profile/contact/update"
        className="absolute top-4 right-4 inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
        Edit
      </Link>

      <h2 className="text-1xl font-normal text-gray-700 dark:text-white mb-4">Contact Information</h2>

      {/* Show alert if all fields are missing */}
      {missingFields.length === fields.length ? (
        <div className="flex flex-col items-center justify-center text-yellow-600 p-4 rounded mb-4">
          <ContactSvg />
          {/* alert text */}
          <p className="text-sm text-center mt-1 mb-3">
            Contact information is missing. Please add contact details.
          </p>
          <Link
            href="/profile/contact/update"
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
            if (contactDetails[field]) {
              return (
                <div key={field}>
                  <label className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                    {field.replace('_', ' ')}
                  </label>
                  <p className="font-normal text-sm text-black dark:text-white">
                    {contactDetails[field]}
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

export default ContactInformationCard;

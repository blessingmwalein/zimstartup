import React from 'react';
import { ContactDetails } from '../../../state/models/customer';
import ContactSvg from './ContactSvg';
import Link from 'next/link';
import VerificationSvg from './VerificationSvg';


const VerificationCard: React.FC<any> = () => {

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-gray-300 p-5 bg-white dark:bg-[#37404F] dark:border-strokedark mb-4 relative">
      {/* Edit button aligned to the top right */}
     

      <h2 className="text-1xl font-normal text-gray-700 dark:text-white mb-4">Identity Verification</h2>

      <div className="flex flex-col items-center justify-center text-yellow-600 p-4 rounded mb-4">
          <VerificationSvg />
          {/* alert text */}
          <p className="text-sm text-center mt-1 mb-3">
            Your identity needs to be verified .
          </p>
          <Link
            href="/profile/contact/update"
            className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg>

            </span>
            Upload Document
          </Link>
        </div>
    </div>
  );
};

export default VerificationCard;

import React from "react";
import { CustomerData } from "../../../state/models/customer";
import InitialsAvatar from "../Header/Avatar";
import CopyToClipboard from "../common/CopyClipBoard";

// Define the types for the CustomerData interface

interface PersonalInformationCardProps {
  customerData: CustomerData;
  onEdit: () => void; // Function for handling edit button click
}

const PersonalInformationCard: React.FC<PersonalInformationCardProps> = ({
  customerData,
  onEdit,
}) => {
  //   if (!customerData || !customerData.customer_data) return null; // Ensure data is available

  //   const {
  //     customerData.first_name,
  //     last_name,
  //     title,
  //     middle_name,
  //     nickname,
  //     national_id,
  //     dob,
  //     gender,
  //     marital_status,
  //     nationality,
  //   } = customerData.customer_data;

  return (
    <div className="relative mx-auto rounded-lg border border-gray-300 bg-white  p-5 dark:border-strokedark dark:bg-[#37404F]">
      {/* Edit Button */}
      {/* <button 
        onClick={onEdit} 
        className="absolute top-4 right-4 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Edit
      </button> */}

      <button
        onClick={onEdit}
        className="absolute right-4 top-4 inline-flex items-center justify-center gap-2.5 rounded-md border border-primary  py-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <span>
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </span>
        Edit
      </button>

      {/* Avatar and Title */}
      <div className="mb-4 flex items-center gap-4">
        <InitialsAvatar
          firstName={customerData.first_name}
          lastName={customerData.last_name}
          size="2rem"
        />
        <h2 className="text-1xl font-normal text-gray-700 dark:text-white">
          Personal Information
        </h2>
      </div>

      {/* Personal Information Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Label-Value pairs */}
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">
            Title
          </label>
          <p className="font-normal text-gray-900 dark:text-white">
            {customerData.title}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">
            First Name
          </label>
          <p className="text-sm font-normal text-black dark:text-white">
            {customerData.first_name}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">
            Middle Name
          </label>
          <p className="text-sm font-normal text-black dark:text-white">
            {customerData.middle_name}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">
            Last Name
          </label>
          <p className="text-sm font-normal text-black dark:text-white">
            {customerData.last_name}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">
            Nickname
          </label>
          <p className="text-sm font-normal text-black dark:text-white">
            {customerData.nickname}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">
            National ID
          </label>
          {/* Using the CopyToClipboard component here */}
          <CopyToClipboard value={customerData.national_id} />
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">
            Date of Birth
          </label>
          <p className="text-sm font-normal text-black dark:text-white">
            {new Date(customerData.dob).toLocaleDateString()}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">
            Gender
          </label>
          <p className="text-sm font-normal text-black dark:text-white">
            {customerData.gender}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">
            Marital Status
          </label>
          <p className="text-sm font-normal text-black dark:text-white">
            {customerData.marital_status}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-300">
            Nationality
          </label>
          <p className="text-sm font-normal text-black dark:text-white">
            {customerData.nationality}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationCard;

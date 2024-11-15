"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// New Notifications card
import ContactInformationCard from "@/components/Profile/ContactInformationCard";
import WorkInformationCard from "@/components/Profile/WorkInformationCard";
import BeneficiaryInformationCard from "@/components/Profile/BenerficiaryInformationCard";
import PersonalInformationCard from "@/components/Profile/PersonalDataCard";
import WalletOverView from "@/components/Wallet/OverViewCard";
import { getCustomerData } from "../../../../state/slices/authSlice";
import { AppDispatch } from "../../../../state/store";

// export const metadata: Metadata = {
//   title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

interface User {
  id: number;
  name: string;
  email: string;
}

const ProfileWork: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, error: reduxError, user, customerData } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      getCustomerInfo();
    }
  }, [user]);

  const getCustomerInfo = async () => {
    try {
      await dispatch(getCustomerData(user.national_id)).unwrap();
    } catch (err: any) {
      console.log('Error:', err);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full px-4"> {/* Ensure full width */}
        <Breadcrumb pageName="Employee" />
        {customerData ? (
          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
              <div className="flex flex-row w-full">
                {/* Avatar and ProfileWork Header */}
                <div className="w-full">
                
                  <div className="w-full mt-6">
                    <WorkInformationCard workDetails={customerData.work_details} />
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default ProfileWork;

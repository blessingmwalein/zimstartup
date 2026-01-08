"use client";

import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Stepper from "@/components/common/Stepper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppSelector } from "@/state/store";

import CheckCompanyStep from "./components/CheckCompanyStep";
import GeneralDetailsStep from "./components/GeneralDetailsStep";
import ContactDetailsStep from "./components/ContactDetailsStep";
import StockMarketStep from "./components/StockMarketStep";
import FundsDetailsStep from "./components/FundsDetailsStep";

const AddCompany: React.FC = () => {
  const { currentStep } = useAppSelector((state) => state.companyCreation);

  // Stepper headings (excluding the "Check" step 0)
  const headings = ["General Details", "Contact Details", "Stock Market", "Funds & Valuation"];

  return (
    <DefaultLayout>
      <div className="mx-auto mt-4 max-w-full px-4 bg-white">
        <div className="px-8">
          <Breadcrumb pageName="New Company" />
        </div>
        {/* Only show stepper for steps 1 and above */}
        {currentStep > 0 && (
          <div className="mt-8 px-8 bg-white">
            <Stepper currentStep={currentStep - 1} headings={headings} />
          </div>
        )}
        <div className="px-8">
          {currentStep === 0 && <CheckCompanyStep />}
          {currentStep === 1 && <GeneralDetailsStep />}
          {currentStep === 2 && <ContactDetailsStep />}
          {currentStep === 3 && <StockMarketStep />}
          {currentStep === 4 && <FundsDetailsStep />}
        </div>
        <ToastContainer position="bottom-center" />
      </div>
    </DefaultLayout>
  );
};

export default AddCompany;

"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { AppDispatch } from "../../../../../state/store";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkIfCompanyExists } from "../../../../../state/slices/companySlice";
import CustomAlert from "@/components/common/notification/Alert";
import Spinner from "@/components/common/Loader/spinner";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Link from "next/link";

// Define Yup schema for form validation
const schema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
});

const AddCompany: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error: reduxError } = useSelector(
    (state: any) => state.company,
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Set up React Hook Form with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { companyName: string }) => {
    // Clear any previous error alerts before the new submission
    setErrorAlert("");

    try {
      const response = await dispatch(
        checkIfCompanyExists(data.companyName),
      ).unwrap();

      // Show success dialog if the company does not exist
      if (response.message) {
        setCompanyName(data.companyName);
        setDialogMessage(response.message);
        setDialogVisible(true);
      }
    } catch (error: any) {
      // Show error alert if the company already exists
      setErrorAlert(error || "An error occurred.");
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto mt-4  max-w-full">
        <div className="px-4">
          <Breadcrumb pageName="Add Company" />
        </div>

        <section
          className="relative mt-8  bg-center  py-16"
          // style={{
          //   backgroundImage: "url('/backgrounds/company_back.jpg')",
          // }}
        >
          {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
          <div className="relative z-10 flex flex-col items-center space-y-6 text-white">
            <h1 className="text-4xl font-bold text-black">Check if company name exists</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full max-w-4xl items-center overflow-hidden rounded-full bg-white p-3 border-2"
            >
              <div className="pl-4 pr-2 text-gray-500">
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Company Name"
                {...register("companyName")}
                className="flex-grow px-4 py-4 text-gray-700 focus:outline-none"
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">
                  {errors.companyName.message}
                </p>
              )}
              <button
                type="submit"
                className="ml-2 rounded-full bg-blue-500 px-8 py-4 font-semibold text-white hover:bg-blue-600 focus:outline-none"
              >
                {status === "loading" ? (
                  <div className="flex flex-row items-center text-center">
                    <Spinner /> Searching...
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </form>

            <div className="max-w-4xl items-center">
              {errorAlert && (
                <CustomAlert
                  title="Company Search"
                  subtitle={errorAlert}
                  type={"error"}
                />
              )}
            </div>
          </div>
        </section>

        {/* Success Dialog using Headless UI */}
        <Dialog
          open={dialogVisible}
          onClose={() => setDialogVisible(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <DialogPanel className="max-w-lg space-y-4 rounded-md bg-white p-6 text-center shadow-md">
              <DialogTitle className="text-lg font-bold">Success</DialogTitle>
              <div className="p-6">
                <Description>{dialogMessage}</Description>
              </div>
              <Link
                className="mt-6 rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
                href={`/profile/companies/add-company/step-1/${companyName}`}
              >
                Register This Company
              </Link>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mt-10 flex px-8"></main>
      </div>
    </DefaultLayout>
  );
};

export default AddCompany;

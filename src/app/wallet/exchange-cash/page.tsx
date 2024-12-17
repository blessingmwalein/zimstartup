"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WalletOverView from "@/components/Wallet/OverViewCard";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define Yup schema for form validation
const schema = yup.object().shape({
  national_id: yup
    .string()
    .required("National ID is required")
    .matches(/^\d+$/, "National ID must be numeric"),
  target_investor_id: yup
    .string()
    .required("Target Investor ID is required")
    .matches(/^\d+$/, "Target Investor ID must be numeric"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
});

interface ExchangeCashForm {
  national_id: string;
  target_investor_id: string;
  amount: number;
}

const ExchangeCash: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExchangeCashForm>({
    resolver: yupResolver(schema), // Connect Yup schema with react-hook-form
  });

  const onSubmit = (data: ExchangeCashForm) => {
    console.log("Form Data Submitted for Exchange Cash:", data);

    // Perform API request or dispatch Redux action to process cash exchange
    // Example: dispatch(exchangeCash(data));
  };

  return (
    <DefaultLayout>
      <div className="mx-auto mt-6 max-w-full px-4">
        <Breadcrumb pageName="Exchange Cash" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
            <div className="flex w-full flex-row">
              {/* Wallet Overview Card */}
              <div className="w-full">
                <WalletOverView />
              </div>
            </div>

            {/* Exchange Cash Form */}
            <div className="mt-8">
              <h2 className="mb-6 text-lg font-semibold text-black dark:text-white">
                Exchange Cash
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 rounded-lg bg-gray-50 p-6 shadow-lg dark:bg-gray-800"
              >
                {/* National ID Field */}
                <div>
                  <label
                    htmlFor="national_id"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    National ID
                  </label>
                  <input
                    type="text"
                    id="national_id"
                    {...register("national_id")}
                    placeholder="Enter your national ID"
                    className={`w-full rounded border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.national_id ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.national_id && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.national_id.message}
                    </p>
                  )}
                </div>

                {/* Target Investor ID Field */}
                <div>
                  <label
                    htmlFor="target_investor_id"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Target Investor ID
                  </label>
                  <input
                    type="text"
                    id="target_investor_id"
                    {...register("target_investor_id")}
                    placeholder="Enter target investor ID"
                    className={`w-full rounded border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.target_investor_id ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.target_investor_id && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.target_investor_id.message}
                    </p>
                  )}
                </div>

                {/* Amount Field */}
                <div>
                  <label
                    htmlFor="amount"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    {...register("amount")}
                    placeholder="Enter amount"
                    className={`w-full rounded border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.amount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.amount && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                >
                  Exchange Cash
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ExchangeCash;

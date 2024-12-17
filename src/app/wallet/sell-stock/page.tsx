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
  stock_id: yup
    .number()
    .typeError("Stock ID must be a number")
    .required("Stock ID is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than 0")
    .required("Quantity is required"),
});

interface SellStockForm {
  national_id: string;
  stock_id: number;
  quantity: number;
}

const SellStock: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellStockForm>({
    resolver: yupResolver(schema), // Connect Yup schema with react-hook-form
  });

  const onSubmit = (data: SellStockForm) => {
    console.log("Form Data Submitted for Selling Stock:", data);

    // Perform API request or dispatch Redux action to process stock sale
    // Example: dispatch(sellStock(data));
  };

  return (
    <DefaultLayout>
      <div className="mx-auto mt-6 max-w-full px-4">
        <Breadcrumb pageName="Sell Stock" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
            <div className="flex w-full flex-row">
              {/* Wallet Overview Card */}
              <div className="w-full">
                <WalletOverView />
              </div>
            </div>

            {/* Sell Stock Form */}
            <div className="mt-8">
              <h2 className="mb-6 text-lg font-semibold text-black dark:text-white">
                Sell Stock
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

                {/* Stock ID Field */}
                <div>
                  <label
                    htmlFor="stock_id"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Stock ID
                  </label>
                  <input
                    type="number"
                    id="stock_id"
                    {...register("stock_id")}
                    placeholder="Enter stock ID"
                    className={`w-full rounded border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.stock_id ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.stock_id && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.stock_id.message}
                    </p>
                  )}
                </div>

                {/* Quantity Field */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    {...register("quantity")}
                    placeholder="Enter quantity"
                    className={`w-full rounded border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.quantity ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.quantity && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                >
                  Sell Stock
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SellStock;

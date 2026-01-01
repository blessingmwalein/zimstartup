"use client";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WalletOverView from "@/components/Wallet/OverViewCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { submitExchangeCash } from "@/state/slices/walletSlice";
import { AppDispatch } from "@/state/store";
import { toast } from "react-toastify";

// Define Yup schema for form validation
const schema = yup.object().shape({
  national_id: yup
    .string()
    .required("National ID is required"),
  target_investor_id: yup
    .string()
    .required("Target Investor ID is required")
  ,
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
  const dispatch = useDispatch<AppDispatch>();
  const { status, error: walletError } = useSelector((state: any) => state.wallet);

  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);
  const [alertType, setAlertType] = React.useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExchangeCashForm>({
    resolver: yupResolver(schema), // Connect Yup schema with react-hook-form
    defaultValues: {
      national_id: "632095320E63",
    },
  });

  const onSubmit = async (data: ExchangeCashForm) => {
    console.log("Form Data Submitted for Exchange Cash:", data);

    try {
      const response = await dispatch(submitExchangeCash(data)).unwrap();
      console.log("Response:", response);
      if (response.success) {
        toast.success(response.message ?? "Cash exchanged successfully!", {
          position: "bottom-center",
        });

        setAlertMessage(response.message ?? "Cash exchanged successfully!");
        setAlertType("success");
      } else {
        toast.error(response.message ?? "Failed to exchange cash", {
          position: "bottom-center",
        });
        setAlertMessage(response.message ?? "Failed to exchange");
        setAlertType("error");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to exchange cash", {
        position: "bottom-center",
      });
      setAlertMessage(err.message || "Failed to exchange cash");
      setAlertType("error");
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto mt-6 max-w-full px-4">
        <Breadcrumb pageName="Exchange Cash" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
            <div className="flex w-full flex-row">
              <div className="w-full">
                <WalletOverView />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mb-6 text-lg font-semibold text-black dark:text-white">
                Exchange Cash
              </h2>
              {alertMessage && (
                <div
                  className={`mb-4 rounded p-4 text-base ${alertType === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {alertMessage}
                </div>
              )}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 rounded-lg bg-gray-50 shadow-lg dark:bg-gray-800"
              >
                <div>
                  <label
                    htmlFor="target_investor_id"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Target Investor National ID
                  </label>
                  <input
                    type="text"
                    id="target_investor_id"
                    {...register("target_investor_id")}
                    placeholder="Enter target investor ID"
                    className={`w-full rounded border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${errors.target_investor_id ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Enter the national ID of the receiving account's investor.
                  </p>
                  {errors.target_investor_id && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.target_investor_id.message}
                    </p>
                  )}
                </div>

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
                    className={`w-full rounded border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${errors.amount ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.amount && (
                    <p className="mt-2 text-sm text-red-500">{errors.amount.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full rounded px-4 py-2 text-white ${status === "loading"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                    } focus:outline-none`}
                >
                  {status === "loading" ? "Processing..." : "Exchange Cash"}
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

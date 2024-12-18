"use client";

import React, { useEffect, useRef } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WalletOverView from "@/components/Wallet/OverViewCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../../state/store";
import { sellStock } from "../../../../state/services/wallet";
import { submitSellStock } from "../../../../state/slices/walletSlice";
import { fetchAllConfigs } from "../../../../state/slices/configSlice";
import { StockExchangeEntity } from "../../../../state/models/config";

const schema = yup.object().shape({
  national_id: yup
    .string()
    .required("National ID is required"),
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
  const dispatch = useDispatch<AppDispatch>();
  const { status, error: stockError } = useSelector((state: any) => state.wallet);

  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);
  const [alertType, setAlertType] = React.useState<"success" | "error" | null>(null);
  const { industryList, businessStatesList, stockExchangeList } = useSelector(
    (state: any) => state.companyConfig,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellStockForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      national_id: "632095320E63",
    },
  });

  const onSubmit = async (data: SellStockForm) => {
    console.log("Submitting Sell Stock form:", data);

    try {
      const response = await dispatch(submitSellStock(data)).unwrap();
      if (response.success) {
        toast.success(response.message || "Stock sold successfully!", {
          position: "bottom-center",
        });
        setAlertMessage(response.message || "Stock sold successfully!");
        setAlertType("success");
      } else {
        throw new Error(response.message || "Failed to sell stock");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to sell stock", {
        position: "bottom-center",
      });
      setAlertMessage(err.message || "Failed to sell stock");
      setAlertType("error");
    }
  };

  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAllConfigs());
      isFetched.current = true;
    }
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="mx-auto mt-6 max-w-full px-4">
        <Breadcrumb pageName="Sell Stock" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
            <div className="flex w-full flex-row">
              <div className="w-full">
                <WalletOverView />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mb-6 text-lg font-semibold text-black dark:text-white">
                Sell Stock
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
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="stock_id"
                  >
                    Stock Market
                  </label>
                  <select
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    {...register("stock_id")}
                    id="stock_id"
                  >
                    <option value="">Select Stock Market</option>
                    {stockExchangeList?.map(
                      (stock: StockExchangeEntity) => (
                        <option key={stock.name} value={stock.stock_id}>
                          {stock.name}
                        </option>
                      ),
                    )}
                  </select>
                  {errors.stock_id && (
                    <span className="text-xs text-red-500">
                      {errors.stock_id.message}
                    </span>
                  )}
                </div>

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
                    className={`w-full rounded border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${errors.quantity ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.quantity && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.quantity.message}
                    </p>
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
                  {status === "loading" ? "Processing..." : "Sell Stock"}
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

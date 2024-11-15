"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomAlert from "@/components/common/notification/Alert";
import { AppDispatch } from "../../../../../../../state/store";
import Stepper from "@/components/common/Stepper";
import {
  createCompanyContact,
  createStockMarketDetails,
} from "../../../../../../../state/slices/companySlice";

// Yup validation schema
const schema = Yup.object({
  type_of_market: Yup.string().required("Type of Market is required"),
  listed_date: Yup.date().required("Listed Date is required"),
  listing_capital: Yup.number().required("Listing Capital is required"),
  listing_currency: Yup.string().required("Listing Currency is required"),
  delisted_date: Yup.date().required("Delisted Date is required"),
  current_market_cap: Yup.number().required(
    "Current Market Capital is required",
  ),
  financial_year_end: Yup.date().required("Financial Year End is required"),
  transfer_secretary: Yup.string().required("Transfer Secretary is required"),
  reporting_currency: Yup.string().required("Reporting Currency is required"),
  ISIN: Yup.string().required("ISIN is required"),
}).required();

// Main Component
const AddCompanyStockMarketDetails: React.FC = ({ params }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: any) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const company_id = params.company_id;

    setError(null);

    const contactDetailsPayload = {
      ...data,
      stock_id: "None",
      company_id,
    };

    try {
      const response = await dispatch(
        createStockMarketDetails(contactDetailsPayload),
      ).unwrap();

      router.push(`/profile/companies/add-company/${company_id}/step-3`);
    } catch (err: any) {
      setError(err || "Failed to submit company contact details");
    }
  };

  const currentStep = 2;
  const headings = [
    "Step 1: General Details",
    "Step 2: Contact Details",
    "Step 3: Stock Market Details",
    "Step 4: Funds Details",
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Add Company Stock Details" />
        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <Stepper currentStep={currentStep} headings={headings} />
              </div>
              <div className="p-7">
                {error && (
                  <CustomAlert
                    title="Oops, something went wrong"
                    subtitle={error}
                    type={"error"}
                  />
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Row 1 */}
                  <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Type of Market */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="type_of_market"
                      >
                        Type of Market
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("type_of_market")}
                        id="type_of_market"
                        placeholder="Type of Market"
                      />
                      {errors.type_of_market && (
                        <span className="text-xs text-red-500">
                          {errors.type_of_market.message}
                        </span>
                      )}
                    </div>

                    {/* Listed Date */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="listed_date"
                      >
                        Listed Date
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="date"
                        {...register("listed_date")}
                        id="listed_date"
                        placeholder="Listed Date"
                      />
                      {errors.listed_date && (
                        <span className="text-xs text-red-500">
                          {errors.listed_date.message}
                        </span>
                      )}
                    </div>

                    {/* Listing Capital */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="listing_capital"
                      >
                        Listing Capital
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="number"
                        {...register("listing_capital")}
                        id="listing_capital"
                        placeholder="Listing Capital"
                      />
                      {errors.listing_capital && (
                        <span className="text-xs text-red-500">
                          {errors.listing_capital.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Listing Currency */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="listing_currency"
                      >
                        Listing Currency
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("listing_currency")}
                        id="listing_currency"
                        placeholder="Listing Currency"
                      />
                      {errors.listing_currency && (
                        <span className="text-xs text-red-500">
                          {errors.listing_currency.message}
                        </span>
                      )}
                    </div>

                    {/* Delisted Date */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="delisted_date"
                      >
                        Delisted Date
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="date"
                        {...register("delisted_date")}
                        id="delisted_date"
                        placeholder="Delisted Date"
                      />
                      {errors.delisted_date && (
                        <span className="text-xs text-red-500">
                          {errors.delisted_date.message}
                        </span>
                      )}
                    </div>

                    {/* Current Market Capital */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="current_market_cap"
                      >
                        Current Market Capital
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="number"
                        {...register("current_market_cap")}
                        id="current_market_cap"
                        placeholder="Current Market Capital"
                      />
                      {errors.current_market_cap && (
                        <span className="text-xs text-red-500">
                          {errors.current_market_cap.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Financial Year End */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="financial_year_end"
                      >
                        Financial Year End
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="date"
                        {...register("financial_year_end")}
                        id="financial_year_end"
                        placeholder="Financial Year End"
                      />
                      {errors.financial_year_end && (
                        <span className="text-xs text-red-500">
                          {errors.financial_year_end.message}
                        </span>
                      )}
                    </div>

                    {/* Transfer Secretary */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="transfer_secretary"
                      >
                        Transfer Secretary
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("transfer_secretary")}
                        id="transfer_secretary"
                        placeholder="Transfer Secretary"
                      />
                      {errors.transfer_secretary && (
                        <span className="text-xs text-red-500">
                          {errors.transfer_secretary.message}
                        </span>
                      )}
                    </div>

                    {/* Reporting Currency */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="reporting_currency"
                      >
                        Reporting Currency
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("reporting_currency")}
                        id="reporting_currency"
                        placeholder="Reporting Currency"
                      />
                      {errors.reporting_currency && (
                        <span className="text-xs text-red-500">
                          {errors.reporting_currency.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* ISIN */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="ISIN"
                      >
                        ISIN
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("ISIN")}
                        id="ISIN"
                        placeholder="ISIN"
                      />
                      {errors.ISIN && (
                        <span className="text-xs text-red-500">
                          {errors.ISIN.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="mt-6 flex justify-end">
                    <button
                      className="mr-3 rounded-md bg-warning px-3 py-3 text-white"
                      type="button"
                      onClick={() =>
                        router.push(`/profile/companies/${params.company_id}`)
                      }
                    >
                      Add Details Later
                    </button>
                    <button
                      className="rounded-md bg-primary px-3 py-3 text-white"
                      type="submit"
                    >
                      Save & Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddCompanyStockMarketDetails;

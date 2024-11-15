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
import { createCompanyPreviousFunds } from "../../../../../../../state/slices/companySlice";

// Yup validation schema
const schema = Yup.object({
  investor_type: Yup.string().required("Investor Type is required"),
  investor_information: Yup.string().required("Investor Information is required"),
  investment_type: Yup.string().required("Investment Type is required"),
  date_of_funds: Yup.date().required("Date of Funds is required"),
  investment_amount: Yup.number().required("Investment Amount is required"),
  investment_currency: Yup.string().required("Investment Currency is required"),
  company_valuation: Yup.number().required("Company Valuation is required"),
  company_valuation_currency: Yup.string().required("Company Valuation Currency is required"),
  valuation_date: Yup.date().required("Valuation Date is required"),
}).required();

// Main Component
const AddCompanyFundsDetails: React.FC = ({ params }: any) => {
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
      company_id,
    };

    try {
      const response = await dispatch(
        createCompanyPreviousFunds(contactDetailsPayload),
      ).unwrap();

      router.push(`/profile/companies/add-company/${company_id}/step-3`);
    } catch (err: any) {
      setError(err || "Failed to submit company contact details");
    }
  };

  const currentStep = 3;
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
                    {/* Investor Type */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="investor_type"
                      >
                        Investor Type
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("investor_type")}
                        id="investor_type"
                        placeholder="Investor Type"
                      />
                      {errors.investor_type && (
                        <span className="text-xs text-red-500">
                          {errors.investor_type.message}
                        </span>
                      )}
                    </div>

                    {/* Investor Information */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="investor_information"
                      >
                        Investor Information
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("investor_information")}
                        id="investor_information"
                        placeholder="Investor Information"
                      />
                      {errors.investor_information && (
                        <span className="text-xs text-red-500">
                          {errors.investor_information.message}
                        </span>
                      )}
                    </div>

                    {/* Investment Type */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="investment_type"
                      >
                        Investment Type
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("investment_type")}
                        id="investment_type"
                        placeholder="Investment Type"
                      />
                      {errors.investment_type && (
                        <span className="text-xs text-red-500">
                          {errors.investment_type.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Date of Funds */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="date_of_funds"
                      >
                        Date of Funds
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="date"
                        {...register("date_of_funds")}
                        id="date_of_funds"
                        placeholder="Date of Funds"
                      />
                      {errors.date_of_funds && (
                        <span className="text-xs text-red-500">
                          {errors.date_of_funds.message}
                        </span>
                      )}
                    </div>

                    {/* Investment Amount */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="investment_amount"
                      >
                        Investment Amount
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="number"
                        {...register("investment_amount")}
                        id="investment_amount"
                        placeholder="Investment Amount"
                      />
                      {errors.investment_amount && (
                        <span className="text-xs text-red-500">
                          {errors.investment_amount.message}
                        </span>
                      )}
                    </div>

                    {/* Investment Currency */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="investment_currency"
                      >
                        Investment Currency
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("investment_currency")}
                        id="investment_currency"
                        placeholder="Investment Currency"
                      />
                      {errors.investment_currency && (
                        <span className="text-xs text-red-500">
                          {errors.investment_currency.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Company Valuation */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="company_valuation"
                      >
                        Company Valuation
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="number"
                        {...register("company_valuation")}
                        id="company_valuation"
                        placeholder="Company Valuation"
                      />
                      {errors.company_valuation && (
                        <span className="text-xs text-red-500">
                          {errors.company_valuation.message}
                        </span>
                      )}
                    </div>

                    {/* Company Valuation Currency */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="company_valuation_currency"
                      >
                        Company Valuation Currency
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("company_valuation_currency")}
                        id="company_valuation_currency"
                        placeholder="Company Valuation Currency"
                      />
                      {errors.company_valuation_currency && (
                        <span className="text-xs text-red-500">
                          {errors.company_valuation_currency.message}
                        </span>
                      )}
                    </div>

                    {/* Valuation Date */}
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="valuation_date"
                      >
                        Valuation Date
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="date"
                        {...register("valuation_date")}
                        id="valuation_date"
                        placeholder="Valuation Date"
                      />
                      {errors.valuation_date && (
                        <span className="text-xs text-red-500">
                          {errors.valuation_date.message}
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

export default AddCompanyFundsDetails;
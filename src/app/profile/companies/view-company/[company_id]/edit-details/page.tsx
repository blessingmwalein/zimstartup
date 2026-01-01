"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CustomAlert from "@/components/common/notification/Alert";
import { AppDispatch } from "../../../../../../../state/store";
import {
  createNewCompany,
  fetchCompanyDataCombined,
  submitUpdateCompanyDetails,
} from "@/state/slices/companySlice";
import Stepper from "@/components/common/Stepper";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import { fetchAllConfigs } from "@/state/slices/configSlice";
import {
  BusinessState,
  CompanyIndustry,
  StockExchangeEntity,
} from "../../../../../../../state/models/config";
import { CreateCompanyRequest } from "../../../../../../../state/models/company";
import Link from "next/link";
// Yup validation schema
const schema = Yup.object({
  company_abbreviations: Yup.string().required(
    "Company abbreviation is required",
  ),
  company_name: Yup.string().required("Company name is required"),
  company_start_date: Yup.date().required("Company start date is required"),
  company_short_description: Yup.string().required(
    "Company short description is required",
  ),
  industry_id: Yup.string().required("Industry is required"),
  stock_id: Yup.string().required("Stock Market is required"),
  location: Yup.string().required("Location is required"),
  website: Yup.string().url("Invalid URL").required("Website is required"),
  employees: Yup.number()
    .positive("Employees must be a positive number")
    .required("Number of employees is required"),
  business_state_id: Yup.string().required("Business state is required"),
}).required();

interface EditCompanyGeneralDetailsProps {
  params: {
    company_name?: string;
  };
}

// Update the component to use the new props type
const EditCompanyGeneralDetails: React.FC<EditCompanyGeneralDetailsProps> = ({
  params,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: any) => state.auth);
  const { industryList, businessStatesList, stockExchangeList } = useSelector(
    (state: any) => state.companyConfig,
  );

  const { combinedCompanyData, status } = useSelector(
    (state: any) => state.company,
  );

  // Extract the company data
  const companyData = useMemo(
    () => combinedCompanyData?.company_data || {},
    [combinedCompanyData],
  );
  const contactData = useMemo(
    () => combinedCompanyData?.company_contact_details || {},
    [combinedCompanyData],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (companyData) {
      setValue(
        "company_abbreviations",
        companyData.company_abbreviations || "",
      );
      setValue("company_name", companyData.company_name || "");
      setValue("company_start_date", companyData.company_start_date || "");
      setValue(
        "company_short_description",
        companyData.company_short_description || "",
      );
      setValue("industry_id", companyData.industry_id || "");
      setValue("stock_id", companyData.stock_id || "");
      setValue("location", companyData.location || "");
      setValue("website", companyData.website || "");
      setValue("employees", companyData.employees || "");
      setValue("business_state_id", companyData.business_state_id || "");
    }
  }, [companyData, setValue]);

  const onSubmit = async (data: any) => {
    setError(null);

    const updatePayload: CreateCompanyRequest = {
      ...data,
      company_start_date: format(
        new Date(data.company_start_date),
        "yyyy-MM-dd",
      ),
    };

    try {
      const response = await dispatch(
        submitUpdateCompanyDetails({
          data: updatePayload,
          companyId: companyData.company_id,
        }),
      ).unwrap();

      if (response.data) {
        toast.success("Company details updated successfully", {
          position: "bottom-center",
        });
        router.push(`/profile/companies/view-company/${params.company_name}`);
      } else {
        toast.error("Something went wrong", {
          position: "bottom-center",
        });
      }
    } catch (err: any) {
      setError(err || "Failed to update company details");
      toast.error(err || "Failed to update company details", {
        position: "bottom-center",
      });
    }
  };

  const getCompanyCombinedData = useCallback(
    async (companyName: string) => {
      try {
        await dispatch(fetchCompanyDataCombined(companyName)).unwrap();
      } catch (err: any) {
        console.error("Error:", err);
      }
    },
    [dispatch], // Add dependencies here, such as 'dispatch' if necessary
  );

  // Get company data
  useEffect(() => {
    if (params.company_name) {
      getCompanyCombinedData(params.company_name);
    }
  }, [getCompanyCombinedData, params.company_name]);

  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAllConfigs());
      isFetched.current = true;
    }
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="mx-auto mt-4 max-w-270">
        <Breadcrumb pageName="Edit Company Details" />
        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-7">
                {error && (
                  <CustomAlert
                    title="Oops, something went wrong"
                    subtitle={error}
                    type={"error"}
                  />
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Company Information */}
                  <div className="mb-6 border-b pb-6">
                    <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
                      Company Information
                    </h4>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="company_abbreviations"
                        >
                          Company Abbreviations
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("company_abbreviations")}
                          id="company_abbreviations"
                          placeholder="Company Abbreviation"
                        />
                        {errors.company_abbreviations && (
                          <span className="text-xs text-red-500">
                            {errors.company_abbreviations.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="company_name"
                        >
                          Company Name
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("company_name")}
                          id="company_name"
                          placeholder="Company Name"
                        />
                        {errors.company_name && (
                          <span className="text-xs text-red-500">
                            {errors.company_name.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Company Start Date & Description */}
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="company_start_date"
                        >
                          Company Start Date
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="date"
                          {...register("company_start_date")}
                          id="company_start_date"
                        />
                        {errors.company_start_date && (
                          <span className="text-xs text-red-500">
                            {errors.company_start_date.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="company_short_description"
                        >
                          Company Short Description
                        </label>
                        <textarea
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          {...register("company_short_description")}
                          id="company_short_description"
                          placeholder="Company Short Description"
                        />
                        {errors.company_short_description && (
                          <span className="text-xs text-red-500">
                            {errors.company_short_description.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Industry and Stock Information */}
                  <div className="mb-6 border-b pb-6">
                    <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
                      Industry & Stock Information
                    </h4>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="industry_id"
                        >
                          Industry
                        </label>
                        <select
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          {...register("industry_id")}
                          id="industry_id"
                        >
                          <option value="">Select Industry</option>
                          {industryList?.map((industry: CompanyIndustry) => (
                            <option
                              key={industry.sector}
                              value={industry.sector}
                            >
                              {industry.sector}
                            </option>
                          ))}
                        </select>
                        {errors.industry_id && (
                          <span className="text-xs text-red-500">
                            {errors.industry_id.message}
                          </span>
                        )}
                      </div>

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
                              <option key={stock.name} value={stock.name}>
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
                    </div>
                  </div>

                  {/* Location, Website, Employees, Business State */}
                  <div className="mb-6 border-b pb-6">
                    <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
                      Additional Company Information
                    </h4>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="location"
                        >
                          Location
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("location")}
                          id="location"
                          placeholder="Location"
                        />
                        {errors.location && (
                          <span className="text-xs text-red-500">
                            {errors.location.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="website"
                        >
                          Website
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="url"
                          {...register("website")}
                          id="website"
                          placeholder="Website"
                        />
                        {errors.website && (
                          <span className="text-xs text-red-500">
                            {errors.website.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="employees"
                        >
                          Employees
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="number"
                          {...register("employees")}
                          id="employees"
                          placeholder="Employees"
                        />
                        {errors.employees && (
                          <span className="text-xs text-red-500">
                            {errors.employees.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="business_state_id"
                        >
                          Business State
                        </label>
                        <select
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          {...register("business_state_id")}
                          id="business_state_id"
                        >
                          <option value="">Select Business State</option>
                          {businessStatesList?.map((state: BusinessState) => (
                            <option key={state.id} value={state.state_name}>
                              {state.state_name}
                            </option>
                          ))}
                        </select>
                        {errors.business_state_id && (
                          <span className="text-xs text-red-500">
                            {errors.business_state_id.message}
                          </span>
                        )}

                        {/* <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("business_state_id")}
                          id="business_state_id"
                          placeholder="Business State"
                        />
                        {errors.business_state_id && (
                          <span className="text-xs text-red-500">
                            {errors.business_state_id.message}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6 flex justify-end">
                    <Link
                      href={`/profile/companies/view-company/${params.company_name}`}
                      className="mr-3 inline-flex items-center justify-center rounded-md bg-danger px-5 py-2.5 text-base font-semibold text-white hover:bg-opacity-90"
                    >
                      Back
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-base font-semibold text-white hover:bg-opacity-90"
                    >
                      Save Changes
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

export default EditCompanyGeneralDetails;

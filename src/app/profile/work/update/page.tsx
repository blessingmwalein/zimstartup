"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomAlert from "@/components/common/notification/Alert";
import { AppDispatch } from "../../../../../state/store";
import {
  getCustomerData,
  updateEmploymentInformationAsync,
} from "../../../../../state/slices/authSlice";

// Updated validation schema based on the new interface
const schema = Yup.object({
  employer_name: Yup.string().required("Employer name is required"),
  employer_country: Yup.string().required("Employer country is required"),
  status_of_employment: Yup.string().required("Employment status is required"),
  profession: Yup.string().required("Profession is required"),
  sector: Yup.string().required("Sector is required"),
}).required();

const CreateEmployementDetails: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const {
    status,
    error: reduxError,
    user,
    customerData,
  } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      getCustomerInfo();
    }
  }, [user]);

  const getCustomerInfo = async () => {
    try {
      await dispatch(getCustomerData(user.national_id)).unwrap();
    } catch (err: any) {
      console.log("Error:", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      employer_name: customerData?.work_details?.["ce_employer_name"] || "",
      employer_country: customerData?.work_details?.employer_country || "",
      status_of_employment:
        customerData?.work_details?.status_of_employment || "",
      profession: customerData?.work_details?.profession || "",
      sector: customerData?.work_details?.sector || "",
    },
  });

  // Populate form with the existing customer data
  useEffect(() => {
    if (customerData?.work_details) {
      const employerName =
        customerData?.work_details?.["ce_employer_name"] || "";
      setValue("employer_name", employerName || "");
      setValue(
        "employer_country",
        customerData.work_details.employer_country || "",
      );
      setValue(
        "status_of_employment",
        customerData.work_details.status_of_employment || "",
      );
      setValue("profession", customerData.work_details.profession || "");
      setValue("sector", customerData.work_details.sector || "");
    }
  }, [customerData, setValue]);

  const onSubmit = async (data: any) => {
    setError(null);

    const {
      employer_name,
      employer_country,
      status_of_employment,
      profession,
      sector,
    } = data;

    const updatePayload = {
      national_id: user.national_id,
      employer_name,
      employer_country,
      status_of_employment,
      profession,
      sector,
      last_updated_by: "user", // Hardcoded, can be changed as necessary
    };

    try {
      await dispatch(updateEmploymentInformationAsync(updatePayload)).unwrap();
      router.push("/profile/work");
    } catch (err: any) {
      setError(err.message || "Failed to update employment details");
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto p-6">
        <Breadcrumb pageName="Update Employment Details" />
        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Employment Information
                </h3>
              </div>
              <div className="p-7">
                {error && (
                  <CustomAlert
                    title="Oops something went wrong"
                    subtitle={error}
                    type={"error"}
                  />
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="employer_name"
                      >
                        Employer Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("employer_name")}
                        id="employer_name"
                        placeholder="Company Name"
                      />
                      {errors.employer_name && (
                        <span className="text-xs text-red-500">
                          {errors.employer_name.message as String}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="employer_country"
                      >
                        Employer Country
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("employer_country")}
                        id="employer_country"
                        placeholder="Country Name"
                      />
                      {errors.employer_country && (
                        <span className="text-xs text-red-500">
                          {errors.employer_country.message as String}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="status_of_employment"
                      >
                        Employment Status
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("status_of_employment")}
                        id="status_of_employment"
                        placeholder="Employment Status"
                      />
                      {errors.status_of_employment && (
                        <span className="text-xs text-red-500">
                          {errors.status_of_employment.message as String}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="profession"
                      >
                        Profession
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("profession")}
                        id="profession"
                        placeholder="Profession"
                      />
                      {errors.profession && (
                        <span className="text-xs text-red-500">
                          {errors.profession.message as String}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="sector"
                      >
                        Sector
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("sector")}
                        id="sector"
                        placeholder="Sector"
                      />
                      {errors.sector && (
                        <span className="text-xs text-red-500">
                          {errors.sector.message as String}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  >
                    Update Employment Details
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateEmployementDetails;

"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import CustomAlert from "@/components/common/notification/Alert";
import Stepper from "@/components/common/Stepper";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../../../../../state/store";
import { submitUpdateContactDetails } from "@/state/slices/companySlice";
import Link from "next/link";

// Yup validation schema
const schema = Yup.object({
  instagram: Yup.string().nullable(),
  linkedin: Yup.string().nullable(),
  twitter: Yup.string().nullable(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  work_email: Yup.string()
    .email("Invalid email address")
    .required("Work email is required"),
  phone1: Yup.number().required("Phone number 1 is required"),
  phone2: Yup.number()

    .nullable(),

  phone3: Yup.number()

    .nullable(),
  address: Yup.string().required("Address is required"),
  address_city: Yup.string().required("City is required"),
  state_code: Yup.number().required("State code is required"),
  region: Yup.string().required("Region is required"),
  country: Yup.string().required("Country is required"),
}).required();

// Main Component
const EditContactDetails: React.FC = ({ params }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: any) => state.auth);

  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const companyName = params.company_name;
    if (companyName) {
      const decodedCompanyName = decodeURIComponent(companyName); // Decode the encoded string
      setCompanyName(decodedCompanyName); // Set the decoded value in the form
    }
  }, [params.company_name, setCompanyName]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  useEffect(() => {
    if (contactData) {
      // Set the default values in the form
      setValue("email", contactData.email || "");
      setValue("work_email", contactData.work_email || "");
      setValue("phone1", contactData.phone1 || "");
      setValue("phone2", contactData.phone2 || "");
      setValue("phone3", contactData.phone3 || "");
      setValue("instagram", contactData.instagram || "");
      setValue("linkedin", contactData.linkedin || "");
      setValue("twitter", contactData.twitter || "");
      setValue("address", contactData.address || "");
      setValue("address_city", contactData.address_city || "");
      setValue("state_code", contactData.state_code || "");
      setValue("region", contactData.region || "");
      setValue("country", contactData.country || "");
    }
  }, [contactData, setValue]);

  const onSubmit = async (data: any) => {
    const company_id = companyData.company_id;
    // console.log(params.company_id);
    // return;
    setError(null);

    // Include the company_id in the contactDetailsPayload
    const contactDetailsPayload = {
      ...data,
      company_id: companyData.company_id,
      // Add the company_id to the payload
    };

    try {
      // Dispatch the action to create contact details
      const response = await dispatch(
        submitUpdateContactDetails({
          data: contactDetailsPayload,
          companyId: company_id,
        }),
      ).unwrap();

      // Redirect to the next step using the company_id from the response
      if (response.data) {
        toast.success("Company contact details updated successful", {
          position: "bottom-center",
        });
        router.push(`/profile/companies/view-company/${params.company_name}`);
      } else {
        toast.error("Something went wrong", {
          position: "bottom-center",
        });
      }
    } catch (err: any) {
      setError(err || "Failed to submit company contact details");
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto mt-4 max-w-270">
        <Breadcrumb pageName="Update Company Contact Details" />
        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              {/* company name */}
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h2 className="text-xl font-semibold text-black ">
                  {companyName}
                </h2>
              </div>
              {/* <div className="border-b border-stroke px-7 py-4 dark:border-strokedark"></div> */}
              <div className="p-7">
                {error && (
                  <CustomAlert
                    title="Oops, something went wrong"
                    subtitle={error}
                    type={"error"}
                  />
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Email Information (2 in a row) */}
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 dark:text-white">
                      Email Information
                    </h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="email"
                          {...register("email")}
                          id="email"
                          placeholder="Email"
                        />
                        {errors.email && (
                          <span className="text-xs text-red-500">
                            {errors.email.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="work_email"
                        >
                          Work Email
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="email"
                          {...register("work_email")}
                          id="work_email"
                          placeholder="Work Email"
                        />
                        {errors.work_email && (
                          <span className="text-xs text-red-500">
                            {errors.work_email.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Phone Numbers (3 in a row) */}
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 dark:text-white">
                      Phone Numbers
                    </h3>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phone1"
                        >
                          Phone Number 1
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("phone1")}
                          id="phone1"
                          placeholder="Phone Number 1"
                        />
                        {errors.phone1 && (
                          <span className="text-xs text-red-500">
                            {errors.phone1.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phone2"
                        >
                          Phone Number 2
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("phone2")}
                          id="phone2"
                          placeholder="Phone Number 2"
                        />
                        {errors.phone2 && (
                          <span className="text-xs text-red-500">
                            {errors.phone2.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phone3"
                        >
                          Phone Number 3
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("phone3")}
                          id="phone3"
                          placeholder="Phone Number 3"
                        />
                        {errors.phone3 && (
                          <span className="text-xs text-red-500">
                            {errors.phone3.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Information */}
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 dark:text-white">
                      Social Media Information
                    </h3>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {/* Instagram */}
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="instagram"
                        >
                          Instagram
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("instagram")}
                          id="instagram"
                          placeholder="Instagram Handle"
                        />
                        {errors.instagram && (
                          <span className="text-xs text-red-500">
                            {errors.instagram.message}
                          </span>
                        )}
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="linkedin"
                        >
                          LinkedIn
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("linkedin")}
                          id="linkedin"
                          placeholder="LinkedIn Handle"
                        />
                        {errors.linkedin && (
                          <span className="text-xs text-red-500">
                            {errors.linkedin.message}
                          </span>
                        )}
                      </div>

                      {/* Twitter */}
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="twitter"
                        >
                          Twitter
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("twitter")}
                          id="twitter"
                          placeholder="Twitter Handle"
                        />
                        {errors.twitter && (
                          <span className="text-xs text-red-500">
                            {errors.twitter.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 dark:text-white">
                      Address Information
                    </h3>
                    <div className="mt-4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="address"
                      >
                        Address
                      </label>

                      <textarea
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        {...register("address")}
                        id="address"
                        placeholder="Company address"
                      />
                      {errors.address && (
                        <span className="text-xs text-red-500">
                          {errors.address.message}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="address_city"
                        >
                          City
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("address_city")}
                          id="address_city"
                          placeholder="City"
                        />
                        {errors.address_city && (
                          <span className="text-xs text-red-500">
                            {errors.address_city.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="region"
                        >
                          Region
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("region")}
                          id="region"
                          placeholder="Region"
                        />
                        {errors.region && (
                          <span className="text-xs text-red-500">
                            {errors.region.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="state_code"
                        >
                          State Code
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("state_code")}
                          id="state_code"
                          placeholder="263"
                        />
                        {errors.state_code && (
                          <span className="text-xs text-red-500">
                            {errors.state_code.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="country"
                      >
                        Country
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("country")}
                        id="country"
                        placeholder="Country"
                      />
                      {errors.country && (
                        <span className="text-xs text-red-500">
                          {errors.country.message}
                        </span>
                      )}
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
                      className="rounded-md bg-primary px-3 py-3 text-white"
                      type="submit"
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

export default EditContactDetails;

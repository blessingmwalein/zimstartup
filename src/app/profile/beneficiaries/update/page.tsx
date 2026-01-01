"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createNextOfKinAsync, updateContactInformationAsync } from "@/state/slices/authSlice";
import CustomAlert from "@/components/common/notification/Alert";

// Yup validation schema
const schema = Yup.object({
  next_of_keen_national_id: Yup.string().required("Next of keen National ID is required"),
  status: Yup.string().required("Status is required"),
  gender_of_keen: Yup.string().required("Gender is required"),
  title: Yup.string().required("Title is required"),
  first_name: Yup.string().required("First Name is required"),
  middle_name: Yup.string(),
  last_name: Yup.string().required("Last Name is required"),
  national_id: Yup.string().required("National ID is required"),
  marital_status: Yup.string().required("Marital Status is required"),
  nationality: Yup.string().required("Nationality is required"),
  reason_of_selection: Yup.string().required("Reason for selection is required"),
  next_phone_number: Yup.number().required("Phone Number 1 is required"),
  next_phone_number2: Yup.number(),
  next_telephone: Yup.number(),
  next_email: Yup.string().email("Invalid email format").required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  redeem_time_months: Yup.number().required("Redeem time is required"),
  last_updated_by: Yup.string().required("Last Updated By is required"),
}).required();

// Main Component
const UpdateContactDetails: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: any) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setError(null);

    const updatePayload = {
      ...data,
    };

    try {
      await dispatch(createNextOfKinAsync(updatePayload)).unwrap();
      router.push("/profile/contact");
    } catch (err: any) {
      setError(err.message || "Failed to update contact information");
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto p-4">
        <Breadcrumb pageName="Update Beneficiary Details" />
        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Beneficiary Information</h3>
              </div>
              <div className="p-7">
                {error && <CustomAlert title="Oops, something went wrong" subtitle={error} type={"error"} />}

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Personal Information */}
                  <div className="border-b pb-6 mb-6">
                    <h4 className="text-lg font-medium text-black dark:text-white mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="next_of_keen_national_id">
                          Next of Keen National ID
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("next_of_keen_national_id")}
                          id="next_of_keen_national_id"
                          placeholder="Next of Keen National ID"
                        />
                        {errors.next_of_keen_national_id && <span className="text-red-500 text-xs">{errors.next_of_keen_national_id.message}</span>}
                      </div>

                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="status">
                          Status
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("status")}
                          id="status"
                          placeholder="Status"
                        />
                        {errors.status && <span className="text-red-500 text-xs">{errors.status.message}</span>}
                      </div>
                    </div>

                    {/* Gender & Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="gender_of_keen">
                          Gender of Keen
                        </label>
                        <select
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          {...register("gender_of_keen")}
                          id="gender_of_keen"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.gender_of_keen && <span className="text-red-500 text-xs">{errors.gender_of_keen.message}</span>}
                      </div>

                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="title">
                          Title
                        </label>
                        <select
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          {...register("title")}
                          id="title"
                        >
                          <option value="">Select Title</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Ms">Ms</option>
                          <option value="Dr">Dr</option>
                        </select>
                        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border-b pb-6 mb-6">
                    <h4 className="text-lg font-medium text-black dark:text-white mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="first_name">
                          First Name
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("first_name")}
                          id="first_name"
                          placeholder="First Name"
                        />
                        {errors.first_name && <span className="text-red-500 text-xs">{errors.first_name.message}</span>}
                      </div>

                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="middle_name">
                          Middle Name
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("middle_name")}
                          id="middle_name"
                          placeholder="Middle Name"
                        />
                      </div>

                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="last_name">
                          Last Name
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...register("last_name")}
                          id="last_name"
                          placeholder="Last Name"
                        />
                        {errors.last_name && <span className="text-red-500 text-xs">{errors.last_name.message}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Marital Status & Nationality */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="marital_status">
                        Marital Status
                      </label>
                      <select
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        {...register("marital_status")}
                        id="marital_status"
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                      {errors.marital_status && <span className="text-red-500 text-xs">{errors.marital_status.message}</span>}
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="nationality">
                        Nationality
                      </label>
                      <select
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        {...register("nationality")}
                        id="nationality"
                      >
                        <option value="">Select Nationality</option>
                        <option value="Zimbabwean">Zimbabwean</option>
                        <option value="South African">South African</option>
                        {/* Add more nationalities here */}
                      </select>
                      {errors.nationality && <span className="text-red-500 text-xs">{errors.nationality.message}</span>}
                    </div>
                  </div>

                  {/* Reason and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="reason_of_selection">
                        Reason for Selection
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("reason_of_selection")}
                        id="reason_of_selection"
                        placeholder="Reason for Selection"
                      />
                      {errors.reason_of_selection && <span className="text-red-500 text-xs">{errors.reason_of_selection.message}</span>}
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="next_phone_number">
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("next_phone_number")}
                        id="next_phone_number"
                        placeholder="Phone Number"
                      />
                      {errors.next_phone_number && <span className="text-red-500 text-xs">{errors.next_phone_number.message}</span>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mt-6">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="next_email">
                      Email
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      type="email"
                      {...register("next_email")}
                      id="next_email"
                      placeholder="Email"
                    />
                    {errors.next_email && <span className="text-red-500 text-xs">{errors.next_email.message}</span>}
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full rounded bg-primary py-3 px-4.5 text-white focus:outline-none"
                    >
                      Submit
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

export default UpdateContactDetails;

"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../state/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateContactInformationAsync } from "../../../../../state/slices/authSlice";
import CustomAlert from "@/components/common/notification/Alert";

const schema = Yup.object({
  email: Yup.string().email("Invalid email format"),
  work_email: Yup.string().email("Invalid email format"),
  phone1: Yup.number().required(),
  phone2: Yup.number(),
  phone3: Yup.number(),
  address1: Yup.string().required(),
  address2: Yup.string(),
  town: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  postal_code: Yup.number().required(),
}).required();

const UpdateContactDetails: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: any) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const africanCountries = [
    "Nigeria", "Kenya", "South Africa", "Egypt", "Ghana", "Uganda", "Algeria", "Morocco", "Ethiopia", "Tanzania",
    "Congo", "Angola", "Sudan", "Mozambique", "Madagascar", "Cameroon", "Côte d'Ivoire", "Niger", "Burkina Faso", "Mali"
  ];

  const onSubmit = async (data: any) => {
    setError(null);

    const { email, work_email, phone1, phone2, phone3, address1, address2, town, city, state, postal_code } = data;

    const updatePayload = {
      national_id: user.national_id,
      email,
      work_email,
      phone1,
      phone2,
      phone3,
      address1,
      address2,
      town,
      city,
      state,
      postal_code,
      last_updated_by: "user",
    };

    try {
      await dispatch(updateContactInformationAsync(updatePayload)).unwrap();
      router.push("/profile/contact");
    } catch (err: any) {
      setError(err.message || "Failed to update contact information");
    }
  };
  


  return (
    <DefaultLayout>
      <div className="mx-auto p-6">
        <Breadcrumb pageName="Update Contact Details" />
        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Contact Information
                  
                </h3>
              </div>
              <div className="p-7">
                {error && <CustomAlert title="Opps something went wrong" subtitle={error} type={"error"}></CustomAlert>}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="email"
                        {...register("email")}
                        id="email"
                        placeholder="example@gmail.com"
                      />
                      {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="work_email">
                        Work Email
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="email"
                        {...register("work_email")}
                        id="work_email"
                        placeholder="work@example.com"
                      />
                      {errors.work_email && <span className="text-red-500 text-xs">{errors.work_email.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phone1">
                        Phone Number 1
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("phone1")}
                        id="phone1"
                        placeholder="+1234567890"
                      />
                      {errors.phone1 && <span className="text-red-500 text-xs">{errors.phone1.message}</span>}
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phone2">
                        Phone Number 2
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("phone2")}
                        id="phone2"
                        placeholder="+1234567891"
                      />
                      {errors.phone2 && <span className="text-red-500 text-xs">{errors.phone2.message}</span>}
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phone3">
                        Phone Number 3
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("phone3")}
                        id="phone3"
                        placeholder="+1234567892"
                      />
                      {errors.phone3 && <span className="text-red-500 text-xs">{errors.phone3.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="address1">
                        Address Line 1
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("address1")}
                        id="address1"
                        placeholder="123 Main St"
                      />
                      {errors.address1 && <span className="text-red-500 text-xs">{errors.address1.message}</span>}
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="address2">
                        Address Line 2
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("address2")}
                        id="address2"
                        placeholder="Apartment, Suite, Unit, etc."
                      />
                      {errors.address2 && <span className="text-red-500 text-xs">{errors.address2.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="town">
                        Town
                      </label>
                      <select
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        {...register("town")}
                        id="town"
                      >
                        <option value="">Select Town</option>
                        {africanCountries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.town && <span className="text-red-500 text-xs">{errors.town.message}</span>}
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="city">
                        City
                      </label>
                      <select
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        {...register("city")}
                        id="city"
                      >
                        <option value="">Select City</option>
                        {africanCountries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="state">
                        State
                      </label>
                      <select
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        {...register("state")}
                        id="state"
                      >
                        <option value="">Select State</option>
                        {africanCountries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.state && <span className="text-red-500 text-xs">{errors.state.message}</span>}
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="postal_code">
                        Postal Code
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...register("postal_code")}
                        id="postal_code"
                        placeholder="12345"
                      />
                      {errors.postal_code && <span className="text-red-500 text-xs">{errors.postal_code.message}</span>}
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      type="submit"
                      className="py-3 px-7 rounded bg-primary text-white font-medium"
                    >
                      Update Contact Details
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

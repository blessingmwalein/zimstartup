"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// Shareholder Details Schema
const shareholderSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  title: Yup.string().required("Title is required"),
  dob: Yup.date().required("Date of Birth is required"),
  marital_status: Yup.string().required("Marital status is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  nationality: Yup.string().required("Nationality is required"),
});

// Position Schema
const positionSchema = Yup.object({
  overall_position: Yup.string().required("Overall position is required"),
  position: Yup.string().required("Position is required"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().nullable(),
  is_current: Yup.boolean(),
});

// Education Schema
const educationSchema = Yup.object({
  institution: Yup.string().required("Institution is required"),
  education_type: Yup.string().required("Education type is required"),
  field_of_study: Yup.string().required("Field of study is required"),
  year_obtained: Yup.number().required("Year obtained is required").min(1900),
});

// Employment Schema
const employmentSchema = Yup.object({
  company_name: Yup.string().required("Company name is required"),
  position: Yup.string().required("Position is required"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().nullable(),
  achievements: Yup.string(),
  reason_for_leaving: Yup.string(),
});

// Public Info Schema
const publicInfoSchema = Yup.object({
  public_profile: Yup.string().required("Public profile is required"),
});

// Awards Schema
const awardsSchema = Yup.object({
  award: Yup.string().required("Award is required"),
  year: Yup.number().required("Year is required").min(1900),
  description: Yup.string(),
});

const AddCompanyShareholder: React.FC = () => {
  const dispatch = useDispatch();

  // State for optional sections
  const [includePosition, setIncludePosition] = useState(false);
  const [includeEducation, setIncludeEducation] = useState(false);
  const [includeEmployment, setIncludeEmployment] = useState(false);
  const [includePublicInfo, setIncludePublicInfo] = useState(false);
  const [includeAwards, setIncludeAwards] = useState(false);

  // React Hook Form for Shareholder Details
  const {
    register: shareholderRegister,
    handleSubmit: shareholderHandleSubmit,
    formState: { errors: shareholderErrors },
  } = useForm({
    resolver: yupResolver(shareholderSchema),
  });

  // React Hook Form for Position
  const {
    register: positionRegister,
    handleSubmit: positionHandleSubmit,
    formState: { errors: positionErrors },
  } = useForm({
    resolver: yupResolver(positionSchema),
  });

  // React Hook Form for Education
  const {
    register: educationRegister,
    handleSubmit: educationHandleSubmit,
    formState: { errors: educationErrors },
  } = useForm({
    resolver: yupResolver(educationSchema),
  });

  // React Hook Form for Employment
  const {
    register: employmentRegister,
    handleSubmit: employmentHandleSubmit,
    formState: { errors: employmentErrors },
  } = useForm({
    resolver: yupResolver(employmentSchema),
  });

  // React Hook Form for Public Info
  const {
    register: publicInfoRegister,
    handleSubmit: publicInfoHandleSubmit,
    formState: { errors: publicInfoErrors },
  } = useForm({
    resolver: yupResolver(publicInfoSchema),
  });

  // React Hook Form for Awards
  const {
    register: awardsRegister,
    handleSubmit: awardsHandleSubmit,
    formState: { errors: awardsErrors },
  } = useForm({
    resolver: yupResolver(awardsSchema),
  });

  // Submit Handlers
  const submitShareholderDetails = async (data: any) => {
    try {
      // await dispatch(createDirectorDetails(data));
      toast.success("Shareholder details added successfully!");
    } catch (err) {
      toast.error("Failed to add shareholder details");
    }
  };

  const submitPositionDetails = async (data: any) => {
    try {
      // await dispatch(addShareholderPosition(data));
      toast.success("Position details added successfully!");
    } catch (err) {
      toast.error("Failed to add position details");
    }
  };

  const submitEducationDetails = async (data: any) => {
    try {
      // await dispatch(addEducationalQualifications(data));
      toast.success("Education details added successfully!");
    } catch (err) {
      toast.error("Failed to add education details");
    }
  };

  const submitEmploymentDetails = async (data: any) => {
    try {
      // await dispatch(addEmploymentHistory(data));
      toast.success("Employment details added successfully!");
    } catch (err) {
      toast.error("Failed to add employment details");
    }
  };

  const submitPublicInfo = async (data: any) => {
    try {
      // await dispatch(addPublicInfo(data));
      toast.success("Public info added successfully!");
    } catch (err) {
      toast.error("Failed to add public info");
    }
  };

  const submitAwardsDetails = async (data: any) => {
    try {
      // await dispatch(addAwards(data));
      toast.success("Awards details added successfully!");
    } catch (err) {
      toast.error("Failed to add awards details");
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto mt-4 max-w-270">
        <Breadcrumb pageName="Add Shareholder" />
        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                {/* <h3 className="font-medium text-black dark:text-white">
                Company Initial Details
              </h3> */}
              </div>
              <div className="p-7">
                <form>
                  {/* Shareholder details */}
                  <div className="mb-6 border-b pb-6">
                    <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
                      Shareholder Details
                    </h4>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="first_name"
                        >
                          First Name
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...shareholderRegister("first_name")}
                          id="first_name"
                          placeholder="First Name"
                        />
                        {shareholderErrors.first_name && (
                          <span className="text-xs text-red-500">
                            {shareholderErrors.first_name.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="last_name"
                        >
                          Last Name
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...shareholderRegister("last_name")}
                          id="last_name"
                          placeholder="Last Name"
                        />
                        {shareholderErrors.last_name && (
                          <span className="text-xs text-red-500">
                            {shareholderErrors.last_name.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Position */}
                  <div className="mb-6 border-b pb-6">
                    <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
                      Position
                    </h4>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="overall_position"
                        >
                          Overall Position
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...positionRegister("overall_position")}
                          id="overall_position"
                          placeholder="Overall Position"
                        />
                        {positionErrors.overall_position && (
                          <span className="text-xs text-red-500">
                            {positionErrors.overall_position.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="position"
                        >
                          Position
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...positionRegister("position")}
                          id="position"
                          placeholder="Position"
                        />
                        {positionErrors.position && (
                          <span className="text-xs text-red-500">
                            {positionErrors.position.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="mb-6 border-b pb-6">
                    <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
                      Qualifications
                    </h4>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="institution"
                        >
                          Institution
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...educationRegister("institution")}
                          id="institution"
                          placeholder="Institution"
                        />
                        {educationErrors.institution && (
                          <span className="text-xs text-red-500">
                            {educationErrors.institution.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="education_type"
                        >
                          Education Type
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...educationRegister("education_type")}
                          id="education_type"
                          placeholder="Education Type"
                        />
                        {educationErrors.education_type && (
                          <span className="text-xs text-red-500">
                            {educationErrors.education_type.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Employment */}
                  <div className="mb-6 border-b pb-6">
                    <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
                      Employment
                    </h4>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                          {...employmentRegister("company_name")}
                          id="company_name"
                          placeholder="Company Name"
                        />
                        {employmentErrors.company_name && (
                          <span className="text-xs text-red-500">
                            {employmentErrors.company_name.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="position"
                        >
                          Position
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...employmentRegister("position")}
                          id="position"
                          placeholder="Position"
                        />
                        {employmentErrors.position && (
                          <span className="text-xs text-red-500">
                            {employmentErrors.position.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-base font-semibold text-white hover:bg-opacity-90"
                    >
                      Save Details
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

export default AddCompanyShareholder;

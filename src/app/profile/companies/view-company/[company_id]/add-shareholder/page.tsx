"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  addEducationalQualifications,
  addEmploymentHistory,
  addNewDirectorPosition,
  createDirectorDetails,
  fetchCompanyDataCombined,
} from "../../../../../../../state/slices/companySlice";
import {
  AddDirectorDetailsRequest,
  AddDirectorPositionRequest,
  AddEducationalQualificationsRequest,
  AddEmploymentHistoryRequest,
  CreateCompanyShareholderRequest,
} from "../../../../../../../state/models/company";
import { AppDispatch } from "../../../../../../../state/store";
import { useRouter } from "next/navigation";

// Your schemas
const shareholderSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  title: Yup.string().required("Title is required"),
  dob: Yup.date().required("Date of Birth is required"),
  marital_status: Yup.string().required("Marital status is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  nationality: Yup.string().required("Nationality is required"),
});

const positionSchema = Yup.object({
  overall_position: Yup.string().required("Overall position is required"),
  position: Yup.string().required("Position is required"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().nullable(),
  is_current: Yup.boolean(),
});

// Add other schemas like educationSchema, employmentSchema, etc.
const educationSchema = Yup.object({
  institution: Yup.string().required("Institution is required"),
  education_type: Yup.string().required("Education type is required"),
  field_of_study: Yup.string().required("Field of study is required"),
  year_obtained: Yup.number().required("Year obtained is required"),
});

// Employment schema
const employmentSchema = Yup.object({
  company_name: Yup.string().required("Company name is required"),
  position: Yup.string().required("Position is required"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().nullable(),
  achievements: Yup.string().required("Achievements are required"),
  reason_for_leaving: Yup.string().required("Reason for leaving is required"),
});
// Other schemas...
// For brevity, only shareholderSchema and positionSchema are shown.
// Add other schemas like educationSchema, employmentSchema, etc.

const AddCompanyShareholder: React.FC = ({ params }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [includePosition, setIncludePosition] = useState(false);
  const [includeEducation, setIncludeEducation] = useState(false);
  const [includeEmployment, setIncludeEmployment] = useState(false);
  const [includePublicInfo, setIncludePublicInfo] = useState(false);
  const [includeAwards, setIncludeAwards] = useState(false);

  // Shareholder Form
  const {
    register: shareholderRegister,
    handleSubmit: shareholderHandleSubmit,
    getValues: getShareholderValues,
    formState: { errors: shareholderErrors },
  } = useForm({
    resolver: yupResolver(shareholderSchema),
  });

  // Position Form
  const {
    register: positionRegister,
    handleSubmit: positionHandleSubmit,
    getValues: getPositionValues,
    formState: { errors: positionErrors },
  } = useForm({
    resolver: yupResolver(positionSchema),
  });

  // education form
  const {
    register: educationRegister,
    handleSubmit: educationHandleSubmit,
    getValues: getEducationValues,
    formState: { errors: educationErrors },
  } = useForm({
    resolver: yupResolver(educationSchema),
  });

  // employment form
  const {
    register: employmentRegister,
    handleSubmit: employmentHandleSubmit,
    getValues: getEmploymentValues,
    formState: { errors: employmentErrors },
  } = useForm({
    resolver: yupResolver(employmentSchema),
  });

  const { combinedCompanyData, status } = useSelector(
    (state: any) => state.company,
  );

  // Extract the company data
  const companyData = useMemo(
    () => combinedCompanyData?.company_data || {},
    [combinedCompanyData],
  );

  // Add similar useForm hooks for other forms...
  // Use getValues for each form to retrieve data as needed.

  const handleSubmitShareholderDetails = async (shareholderData: AddDirectorDetailsRequest) => {
    try {
      const shareholderResponse = await dispatch(createDirectorDetails(shareholderData)).unwrap();
      const employeeId = shareholderResponse.data.employee_id;
  
      if (!employeeId) {
        throw new Error("Failed to retrieve employee ID");
      }
  
      return employeeId;
    } catch (err) {
      console.error("Error submitting shareholder details: ", err);
      toast.error("Failed to save shareholder details. Please try again.");
      throw err;
    }
  };
  
  const handleSubmitPositionDetails = async (
    positionData: AddDirectorPositionRequest,
  ) => {
    try {
      await dispatch(addNewDirectorPosition(positionData)).unwrap();
      toast.success("Position details saved successfully!");
    } catch (err) {
      console.error("Error submitting position details: ", err);
      toast.error("Failed to save position details. Please try again.");
      throw err;
    }
  };
  
  const handleSubmitEducationDetails = async (
    educationData: AddEducationalQualificationsRequest,
  ) => {
    try {
      await dispatch(addEducationalQualifications(educationData)).unwrap();
      toast.success("Educational qualifications saved successfully!");
    } catch (err) {
      console.error("Error submitting education details: ", err);
      toast.error("Failed to save educational qualifications. Please try again.");
      throw err;
    }
  };
  
  const handleSubmitEmploymentDetails = async (
    employmentData: AddEmploymentHistoryRequest,
  ) => {
    try {
      await dispatch(addEmploymentHistory(employmentData)).unwrap();
      toast.success("Employment history saved successfully!");
    } catch (err) {
      console.error("Error submitting employment details: ", err);
      toast.error("Failed to save employment history. Please try again.");
      throw err;
    }
  };
  
  const handleSubmitAllForms = async () => {
    try {
      // Step 1: Submit Shareholder Details
      const shareholderData = {
        ...getShareholderValues(),
        company_id: companyData.company_id,
      };
  
      const employeeId = await handleSubmitShareholderDetails(
        shareholderData as AddDirectorDetailsRequest,
      );
  
      // Step 2: Submit Additional Details
      if (includePosition) {
        const positionData = {
          ...getPositionValues(),
          employee_id: employeeId,
        };
        await handleSubmitPositionDetails(positionData as AddDirectorPositionRequest);
      }
  
      if (includeEducation) {
        const educationData = {
          ...getEducationValues(),
          employee_id: employeeId,
        };
        await handleSubmitEducationDetails(educationData as AddEducationalQualificationsRequest);
      }
  
      if (includeEmployment) {
        const employmentData = {
          ...getEmploymentValues(),
          employee_id: employeeId,
        };
        await handleSubmitEmploymentDetails(employmentData as AddEmploymentHistoryRequest);
      }
  
      // Add similar handlers for public info, awards, etc., if needed.
  
      toast.success("All details added successfully!");
      router.push(`/profile/companies/view-company/${params.company_name}`);
    } catch (err) {
      console.error("Error submitting all forms: ", err);
      toast.error("Failed to submit all forms. Please try again.");
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
  return (
    <DefaultLayout>
      <div className="mx-auto p-6">
        <Breadcrumb pageName="Add Shareholder" />
        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {/* company name */}
                  {companyData.company_name} Shareholder Details
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={
                  shareholderHandleSubmit(handleSubmitAllForms)
                }>
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
                      {/* other form fields for details */}
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="title"
                        >
                          Title
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="text"
                          {...shareholderRegister("title")}
                          id="title"
                          placeholder="Title"
                        />
                        {shareholderErrors.title && (
                          <span className="text-xs text-red-500">
                            {shareholderErrors.title.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="dob"
                        >
                          Date of Birth
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="date"
                          {...shareholderRegister("dob")}
                          id="dob"
                          placeholder="Date of Birth"
                        />
                        {shareholderErrors.dob && (
                          <span className="text-xs text-red-500">
                            {shareholderErrors.dob.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="marital_status"
                        >
                          Marital Status
                        </label>
                        {/* selector with Married UnMarried and Other */}
                        <select
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          {...shareholderRegister("marital_status")}
                          id="marital_status"
                        >
                          <option value="">Select Marital Status</option>
                          <option value="Married">Married</option>
                          <option value="UnMarried">UnMarried</option>
                          <option value="UnMarried">Single</option>
                          <option value="Other">Other</option>
                        </select>

                        {shareholderErrors.marital_status && (
                          <span className="text-xs text-red-500">
                            {shareholderErrors.marital_status.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                          {...shareholderRegister("email")}
                          id="email"
                          placeholder="Email"
                        />
                        {shareholderErrors.email && (
                          <span className="text-xs text-red-500">
                            {shareholderErrors.email.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="email"
                        >
                          Nationality
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                          type="nationality"
                          {...shareholderRegister("nationality")}
                          id="nationality"
                          placeholder="Zimbabwean"
                        />
                        {shareholderErrors.nationality && (
                          <span className="text-xs text-red-500">
                            {shareholderErrors.nationality.message}
                          </span>
                        )}
                      </div>
                      {/* natianality */}
                    </div>
                  </div>

                  {/* add position chip icon button */}
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => setIncludePosition(!includePosition)}
                      className="flex items-center gap-2 rounded-md border-2 border-primary px-4 py-2 text-base font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        {includePosition ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12h12"
                          /> // Minus icon
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.75v14.5M4.75 12h14.5"
                          /> // Plus icon
                        )}
                      </svg>
                      {includePosition ? "Remove Position" : "Add Position"}
                    </button>
                  </div>

                  {/* Position */}
                  {includePosition && (
                    <div className="mb-6 mt-6 border-b pb-6">
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
                      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {/* start date */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="start_date"
                          >
                            Start Date
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            type="date"
                            {...positionRegister("start_date")}
                            id="start_date"
                            placeholder="Start Date"
                          />
                          {positionErrors.start_date && (
                            <span className="text-xs text-red-500">
                              {positionErrors.start_date.message}
                            </span>
                          )}
                        </div>

                        {/* end date */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="end_date"
                          >
                            End Date
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            type="date"
                            {...positionRegister("end_date")}
                            id="end_date"
                            placeholder="End Date"
                          />
                          {positionErrors.end_date && (
                            <span className="text-xs text-red-500">
                              {positionErrors.end_date.message}
                            </span>
                          )}
                        </div>
                        {/* is current */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="is_current"
                          >
                            Is Current
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            type="checkbox"
                            {...positionRegister("is_current")}
                            id="is_current"
                          />
                          {positionErrors.is_current && (
                            <span className="text-xs text-red-500">
                              {positionErrors.is_current.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* add education button */}
                  <div className="mt-6 flex justify-start">
                    <button
                      type="button"
                      onClick={() => setIncludeEducation(!includeEducation)}
                      className="flex items-center gap-2 rounded-md border-2 border-primary px-4 py-2 text-base font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        {includeEducation ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12h12"
                          /> // Minus icon
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.75v14.5M4.75 12h14.5"
                          /> // Plus icon
                        )}
                      </svg>
                      {includeEducation ? "Remove Education" : "Add Education"}
                    </button>
                  </div>

                  {/* Qualifications */}
                  {includeEducation && (
                    <div className="mb-6 mt-6 border-b pb-6">
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
                          {/* select Degree & Diploma  */}
                          <select
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            {...educationRegister("education_type")}
                            id="education_type"
                          >
                            <option value="">Select Education Type</option>
                            <option value="Degree">Degree</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Certificate">Certificate</option>
                          </select>

                          {educationErrors.education_type && (
                            <span className="text-xs text-red-500">
                              {educationErrors.education_type.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* field and year */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="field_of_study"
                          >
                            Field of Study
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            type="text"
                            {...educationRegister("field_of_study")}
                            id="field_of_study"
                            placeholder="Field of Study"
                          />
                          {educationErrors.field_of_study && (
                            <span className="text-xs text-red-500">
                              {educationErrors.field_of_study.message}
                            </span>
                          )}
                        </div>
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="year_obtained"
                          >
                            Year Obtained
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            type="number"
                            {...educationRegister("year_obtained")}
                            id="year_obtained"
                            placeholder="Year Obtained"
                          />
                          {educationErrors.year_obtained && (
                            <span className="text-xs text-red-500">
                              {educationErrors.year_obtained.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* add employement button */}
                  <div className="mt-6 flex justify-start">
                    <button
                      type="button"
                      onClick={() => setIncludeEmployment(!includeEmployment)}
                      className="flex items-center gap-2 rounded-md border-2 border-primary px-4 py-2 text-base font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        {includeEmployment ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12h12"
                          /> // Minus icon
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.75v14.5M4.75 12h14.5"
                          /> // Plus icon
                        )}
                      </svg>
                      {includeEmployment
                        ? "Remove Employment"
                        : "Add Employment"}
                    </button>
                  </div>

                  {/* Employment */}
                  {includeEmployment && (
                    <div className="mb-6 mt-6 border-b pb-6">
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

                      {/* start date and end date */}
                      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="start_date"
                          >
                            Start Date
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            type="date"
                            {...employmentRegister("start_date")}
                            id="start_date"
                            placeholder="Start Date"
                          />
                          {employmentErrors.start_date && (
                            <span className="text-xs text-red-500">
                              {employmentErrors.start_date.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="end_date"
                          >
                            End Date
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            type="date"
                            {...employmentRegister("end_date")}
                            id="end_date"
                            placeholder="End Date"
                          />
                          {employmentErrors.end_date && (
                            <span className="text-xs text-red-500">
                              {employmentErrors.end_date.message}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* achievements and reason for leaving */}
                      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="achievements"
                          >
                            Achievements
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            type="text"
                            {...employmentRegister("achievements")}
                            id="achievements"
                            placeholder="Achievements"
                          />
                          {employmentErrors.achievements && (
                            <span className="text-xs text-red-500">
                              {employmentErrors.achievements.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="reason_for_leaving"
                          >
                            Reason for Leaving
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            type="text"
                            {...employmentRegister("reason_for_leaving")}
                            id="reason_for_leaving"
                            placeholder="Reason for Leaving"
                          />
                          {employmentErrors.reason_for_leaving && (
                            <span className="text-xs text-red-500">
                              {employmentErrors.reason_for_leaving.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

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

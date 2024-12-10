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
  addCompanyRequest,
  addCompanyRequestDetail,
  fetchCompanyDataCombined,
} from "../../../../../../../state/slices/companySlice";
import { toast } from "react-toastify";
import Link from "next/link";

// Validation schemas
const requestSchema = Yup.object({
  company_id: Yup.number().required(),
  request_type: Yup.string().required(),
  status: Yup.string().required(),
}).required();

const requestDetailSchema = Yup.object({
  request_id: Yup.number().required(),
  total_shares: Yup.number().required(),
  share_price: Yup.number().required(),
  currency: Yup.string().required(),
  amount_requested: Yup.number().required(),
}).required();

interface EditCompanyGeneralDetailsProps {
  params: {
    company_name?: string;
  };
}

const AddCompanyRequest: React.FC<EditCompanyGeneralDetailsProps> = ({
  params,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<number | null>(null);

  const { combinedCompanyData } = useSelector((state: any) => state.company);
  const companyData = useMemo(
    () => combinedCompanyData?.company_data || {},
    [combinedCompanyData],
  );

  // Form setup for Company Request
  const {
    register: registerRequest,
    handleSubmit: handleSubmitRequest,
    formState: { errors: errorsRequest },
  } = useForm({
    resolver: yupResolver(requestSchema),
  });

  // Form setup for Request Details
  const {
    register: registerRequestDetails,
    handleSubmit: handleSubmitRequestDetails,
    formState: { errors: errorsRequestDetails },
  } = useForm({
    resolver: yupResolver(requestDetailSchema),
  });

  // Fetch combined company data
  useEffect(() => {
    if (params.company_name) {
      dispatch(fetchCompanyDataCombined(params.company_name));
    }
  }, [dispatch, params.company_name]);

  // Submit Company Request
  const onSubmitCompanyRequest = async (data: any) => {
    setError(null);
    const payload = { ...data, company_id: companyData.company_id };

    try {
      const response = await dispatch(addCompanyRequest(payload)).unwrap();
      if (response.data) {
        setRequestId(response.data.request_id);
        toast.success("Request submitted successfully.");
      } else {
        throw new Error("Failed to create request.");
      }
    } catch (err: any) {
      setError(err.message || "Error submitting request.");
      toast.error(err.message || "Error submitting request.");
    }
  };

  // Submit Request Details
  const onSubmitRequestDetails = async (data: any) => {
    if (!requestId) {
      toast.error("Please complete the Company Request form first.");
      return;
    }

    const payload = { ...data, request_id: requestId };

    try {
      const response = await dispatch(
        addCompanyRequestDetail(payload),
      ).unwrap();
      if (response.data) {
        toast.success("Request details submitted successfully.");
        router.push(`/profile/companies/view-company/${params.company_name}`);
      } else {
        throw new Error("Failed to submit request details.");
      }
    } catch (err: any) {
      setError(err.message || "Error submitting request details.");
      toast.error(err.message || "Error submitting request details.");
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto mt-4 max-w-270">
        <Breadcrumb pageName="Add Company Request" />

        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
              <div className="p-7">
                {error && (
                  <CustomAlert
                    title="Oops, something went wrong"
                    subtitle={error}
                    type={"error"}
                  />
                )}

                {/* Company Request Form */}
                <form onSubmit={handleSubmitRequest(onSubmitCompanyRequest)}>
                  <h4 className="mb-4 text-lg font-medium">Company Request</h4>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="request_type">Request Type</label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...registerRequest("request_type")}
                        id="request_type"
                        placeholder="Request Type"
                      />
                      {errorsRequest.request_type && (
                        <span>{errorsRequest.request_type.message}</span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="status">Status</label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...registerRequest("status")}
                        id="status"
                        placeholder="Status"
                      />
                      {errorsRequest.status && (
                        <span>{errorsRequest.status.message}</span>
                      )}
                    </div>
                  </div>
                  <h4 className="mb-4 mt-8 text-lg font-medium">
                    Request Details
                  </h4>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="total_shares">Total Shares</label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="number"
                        {...registerRequestDetails("total_shares")}
                        id="total_shares"
                        placeholder="0"
                      />
                      {errorsRequestDetails.total_shares && (
                        <span>{errorsRequestDetails.total_shares.message}</span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="share_price">Share Price</label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="number"
                        {...registerRequestDetails("share_price")}
                        id="share_price"
                        placeholder="0"
                      />
                      {errorsRequestDetails.share_price && (
                        <span>{errorsRequestDetails.share_price.message}</span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="currency">Currency</label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        {...registerRequestDetails("currency")}
                        id="currency"
                        placeholder="Currency"
                      />
                      {errorsRequestDetails.currency && (
                        <span>{errorsRequestDetails.currency.message}</span>
                      )}
                      </div>
                      {/* amount request */}
                      <div>
                      <label htmlFor="amount_requested">Amount Requested</label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="number"
                        {...registerRequestDetails("amount_requested")}
                        id="amount_requested"
                        placeholder="0"
                      />
                      {errorsRequestDetails.amount_requested && (
                        <span>{errorsRequestDetails.amount_requested.message}</span>
                      )}
                      </div>
                  </div>
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

export default AddCompanyRequest;

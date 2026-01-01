"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { 
  X, 
  DollarSign, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock,
  Percent,
  AlertCircle,
  CheckCircle,
  Award,
} from "lucide-react";

interface CompanyRequestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  request: any | null;
  requestType: string;
  requestStatus: string;
}

export default function CompanyRequestDrawer({
  isOpen,
  onClose,
  request,
  requestType,
  requestStatus,
}: CompanyRequestDrawerProps) {
  if (!request) return null;

  const formatCurrency = (amount: number, currency = "USD") => {
    if (typeof amount !== "number" || isNaN(amount)) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Revenue-Based Financing fields
  const isRevenueBased = requestType === "Revenue-Based Financing";
  const isAcquisition = requestType === "Company Acquisitions";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="bg-[#052941] px-6 py-8">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Dialog.Title className="text-2xl font-bold text-white">
                            {requestType}
                          </Dialog.Title>
                          <p className="mt-2 text-gray-200">
                            Request Details & Information
                          </p>
                        </div>
                        <button
                          type="button"
                          className="rounded-md text-white hover:text-gray-200 focus:outline-none"
                          onClick={onClose}
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>

                      {/* Status Badge */}
                      <div className="mt-4">
                        <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(requestStatus)}`}>
                          {requestStatus?.toUpperCase() || "PENDING"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 py-6">
                      <div className="space-y-6">
                        {/* Revenue-Based Financing Details */}
                        {isRevenueBased && (
                          <>
                            {/* Financial Overview */}
                            <div>
                              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <DollarSign className="mr-2 h-5 w-5 text-[#052941]" />
                                Financial Overview
                              </h3>
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                                  <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">
                                      Funding Amount
                                    </span>
                                    <DollarSign className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(request.amount, request.currency)}
                                  </p>
                                </div>

                                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-4">
                                  <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">
                                      Revenue Share
                                    </span>
                                    <Percent className="h-5 w-5 text-purple-600" />
                                  </div>
                                  <p className="text-2xl font-bold text-gray-900">
                                    {request.revenue_share || 0}%
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500">
                                    {request.payment_frequency || "Monthly"}
                                  </p>
                                </div>

                                <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                                  <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">
                                      Projected Revenue
                                    </span>
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                  </div>
                                  <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(request.projected_revenue || 0)}
                                  </p>
                                </div>

                                <div className="rounded-lg bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
                                  <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">
                                      Projected Profit
                                    </span>
                                    <Award className="h-5 w-5 text-orange-600" />
                                  </div>
                                  <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(request.projected_profit || 0)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Repayment Terms */}
                            {request.repayment_terms && (
                              <div>
                                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                  <Clock className="mr-2 h-5 w-5 text-[#052941]" />
                                  Repayment Terms
                                </h3>
                                <div className="rounded-lg bg-gray-50 p-4">
                                  <p className="text-sm text-gray-700">
                                    {request.repayment_terms}
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        {/* Company Acquisitions Details */}
                        {isAcquisition && (
                          <>
                            <div>
                              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <DollarSign className="mr-2 h-5 w-5 text-[#052941]" />
                                Acquisition Details
                              </h3>
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                                  <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">
                                      Asking Price
                                    </span>
                                    <DollarSign className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(request.asking_price, request.currency)}
                                  </p>
                                </div>

                                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-4">
                                  <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">
                                      Deal Value
                                    </span>
                                    <Award className="h-5 w-5 text-purple-600" />
                                  </div>
                                  <p className="text-lg font-bold text-gray-900">
                                    {request.deal_value || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Description */}
                        {request.description && (
                          <div>
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                              <FileText className="mr-2 h-5 w-5 text-[#052941]" />
                              Description
                            </h3>
                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                              <p className="text-sm leading-relaxed text-gray-700">
                                {request.description}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Additional Information */}
                        <div>
                          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                            <AlertCircle className="mr-2 h-5 w-5 text-[#052941]" />
                            Additional Information
                          </h3>
                          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                              <span className="text-sm text-gray-600">Request ID</span>
                              <span className="font-medium text-gray-900">
                                #{request.request_id}
                              </span>
                            </div>
                            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                              <span className="text-sm text-gray-600">Request Type</span>
                              <span className="font-medium text-gray-900">
                                {requestType}
                              </span>
                            </div>
                            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                              <span className="text-sm text-gray-600">Currency</span>
                              <span className="font-medium text-gray-900">
                                {request.currency || "USD"}
                              </span>
                            </div>
                            <div className="flex items-start justify-between">
                              <span className="text-sm text-gray-600">Status</span>
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(requestStatus)}`}>
                                {requestStatus?.toUpperCase() || "PENDING"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-lg bg-[#052941] px-4 py-2 text-white transition-all hover:bg-[#041f30] focus:outline-none focus:ring-2 focus:ring-[#052941] focus:ring-offset-2"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

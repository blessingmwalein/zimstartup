"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tab } from "@headlessui/react";
import {
  Building2,
  BarChart4,
  FileText,
  Bell,
  Edit,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { toast } from "react-toastify";

import { useCompanyData } from "@/hooks/useCompanyData";
import CustomButton from "@/components/Companies/ui/custom-button";
import CompanyDashboard from "@/components/Companies/company-dashboard";
import StockMarketSection from "@/components/Companies/stock-market-section";
import CompanyUpdatesSection from "@/components/Companies/company-updates-section";
import CompanyDocumentsSection from "@/components/Companies/company-documents-section";

import EditCompanyDialog from "@/components/Companies/dialogs/edit-company-dialog";
import EditStockMarketDialog from "@/components/Companies/dialogs/edit-stock-market-dialog";
import AddCompanyUpdateDialog from "@/components/Companies/dialogs/add-company-update-dialog";
import AddDirectorDialog from "@/components/Companies/dialogs/add-director-dialog";
import EmployeeViewDialog from "@/components/Companies/dialogs/employee-view-dialog";
import ContactDetailsDialog from "@/components/Companies/dialogs/contact-details-dialog";
import AddCompanyRequestDialog from "@/components/Companies/dialogs/add-company-request-dialog";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CompanyDirectors from "@/components/Companies/company-directors";
import CompanyViewSkeleton from "@/components/Companies/CompanyViewSkeleton";
import type { CreateCompanyRequest } from "../../../../../../state/models/company";
import { useSelector } from "react-redux";
import type { UpdateContactInforRequest } from "../../../../../../state/models/employement";
import FundsAndValuationSection from "@/components/Companies/funds-and-valuation-section";
// import FinancialMetricsSection from "@/components/Companies/financial-metrics";
import AddPreviousFundsDialog from "@/components/Companies/dialogs/add-previous-funds-dialog";
import AddFinancialMetricsDialog from "@/components/Companies/dialogs/add-financial-metrics-dialog";
import AddCompanyValuationDialog from "@/components/Companies/dialogs/add-company-valuation-dialog";
import MoneyDisplay from "@/components/common/MoneyDisplay";
import ViewRevenueFinancingDialog from "@/components/Companies/dialogs/view-revenue-financing-dialog";
import ViewProjectFinancingDialog from "@/components/Companies/dialogs/view-project-financing-dialog";
import FinancialMetricsSection from "@/components/Companies/finantial-metrics";

export default function CompanyView() {
  const { company_id } = useParams();
  const companyId = Array.isArray(company_id)
    ? Number.parseInt(company_id[0])
    : Number.parseInt(company_id);

  const {
    directors,
    companyDocuments,
    employeeData,
    updates,
    previousFunds,
    companyValuations,
    financialMetrics,
    companyRequests,
    loading,
    error,
    addValuation,
    updateCompany,
    updateContactData,
    updateStockMarket,
    addUpdate,
    addDirector,
    uploadDocument,
    addPreviousFunds,
    addFinancialMetrics,
    refreshData,
    refreshDirectors,
    fetchEmployeeData,
    companyData,
  } = useCompanyData(companyId);

  // State for dialogs
  const [editCompanyDialogOpen, setEditCompanyDialogOpen] = useState(false);
  const [editContactDetailDialog, setEditContactDetailsDialog] =
    useState(false);
  const [viewEmployeeDialog, setViewEmployeeDialog] = useState(false);
  const [editStockMarketDialogOpen, setEditStockMarketDialogOpen] =
    useState(false);
  const [addUpdateDialogOpen, setAddUpdateDialogOpen] = useState(false);
  const [addDirectorDialogOpen, setAddDirectorDialogOpen] = useState(false);
  const [addPreviousFundsDialogOpen, setAddPreviousFundsDialogOpen] =
    useState(false);
  const [addFinancialMetricsDialogOpen, setAddFinancialMetricsDialogOpen] =
    useState(false);
  const [addCompanyValuationDialogOpen, setAddCompanyValuationDialogOpen] =
    useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [addCompanyRequestDialogOpen, setAddCompanyRequestDialogOpen] =
    useState(false);
  const [viewRevenueFinancingDialogOpen, setViewRevenueFinancingDialogOpen] =
    useState(false);
  const [viewProjectFinancingDialogOpen, setViewProjectFinancingDialogOpen] =
    useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const {
    status,
    error: reduxError,
    user,
  } = useSelector((state: any) => state.auth);

  // Handler functions
  const handleCompanyUpdate = async (updatedData: CreateCompanyRequest) => {
    const result: any = await updateCompany(updatedData, companyId);
    if (result.success) {
      toast.success("Company information updated successfully");
    } else {
      toast.error(result.error || "Failed to update company information");
    }
    setEditCompanyDialogOpen(false);
  };

  const handleContactDetailsSave = async (
    updateContactDetails: UpdateContactInforRequest,
  ) => {
    const result: any = await updateContactData({
      ...updateContactDetails,
      company_id: companyId,
    });
    if (result.success) {
      toast.success("Company contact updated successfully");
    } else {
      toast.error(result.error || "Failed to update company contact");
    }
    setEditContactDetailsDialog(false);
  };

  const handleStockMarketUpdate = async (updatedData: any) => {
    const result = await updateStockMarket(updatedData);
    if (result.success) {
      toast.success("Stock market details updated successfully");
    } else {
      toast.error(result.error || "Failed to update stock market details");
    }
    setEditStockMarketDialogOpen(false);
  };

  const handleAddUpdate = async (newUpdate: any) => {
    const result = await addUpdate(newUpdate);
    if (result.success) {
      toast.success("Company update added successfully");
    } else {
      toast.error(result.error || "Failed to add company update");
    }
    setAddUpdateDialogOpen(false);
  };

  const handleAddDirector = async (newDirector: any) => {
    // The director data is already submitted to the backend in the dialog steps
    // Just refresh the directors list to show the new director
    try {
      // Refresh directors data
      await refreshDirectors();
      toast.success("Director added successfully");
    } catch (error) {
      toast.error("Failed to refresh directors list");
    }
    setAddDirectorDialogOpen(false);
  };

  const handleDocumentUpload = async (file: File) => {
    const result = await uploadDocument(file);
    if (result.success) {
      toast.success("Document uploaded successfully");
    } else {
      toast.error(result.error || "Failed to upload document");
    }
  };

  const handleAddPreviousFunds = async (fundsData: any) => {
    const result = await addPreviousFunds(fundsData);
    if (result.success) {
      toast.success("Previous funding added successfully");
    } else {
      toast.error(result.error || "Failed to add previous funding");
    }
    setAddPreviousFundsDialogOpen(false);
  };

  const handleAddFinancialMetrics = async (metricsData: any) => {
    const result = await addFinancialMetrics(metricsData);
    if (result.success) {
      toast.success("Financial metrics added successfully");
    } else {
      toast.error(result.error || "Failed to add financial metrics");
    }
    setAddFinancialMetricsDialogOpen(false);
  };

  const handleAddValuation = async (valuationData: any) => {
    const result = await addValuation(valuationData);
    if (result.success) {
      toast.success("Company valuation added successfully");
    } else {
      toast.error(result.error || "Failed to add company valuation");
    }
    setAddCompanyValuationDialogOpen(false);
  };

  const handleViewEmployee = async (employeeId: number) => {
    const result = await fetchEmployeeData(employeeId);
    setViewEmployeeDialog(true);
  };

  const handleViewRevenueFinancing = (request: any) => {
    setSelectedRequest(request);
    setViewRevenueFinancingDialogOpen(true);
  };

  const handleViewProjectFinancing = (request: any) => {
    setSelectedRequest(request);
    setViewProjectFinancingDialogOpen(true);
  };

  const tabItems = [
    { name: "Dashboard", icon: <Building2 className="h-5 w-5" /> },
    { name: "Directors", icon: <Users className="h-5 w-5" /> },
    { name: "Stock Market", icon: <BarChart4 className="h-5 w-5" /> },
    { name: "Funds & Valuation", icon: <DollarSign className="h-5 w-5" /> },
    { name: "Financial Metrics", icon: <TrendingUp className="h-5 w-5" /> },
    { name: "Company Requests", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Updates", icon: <Bell className="h-5 w-5" /> },
    { name: "Documents", icon: <FileText className="h-5 w-5" /> },
  ];

  // Group requests by type
  function groupRequestsByType(requests: any[]) {
    const groups = {
      "Company Acquisitions": [] as any[],
      "Equity Financing": [] as any[],
      "Revenue-Based Financing": [] as any[],
      "Project Financing": [] as any[],
      Other: [] as any[],
    };
    for (const req of requests) {
      if ("asking_price" in req && "deal_value" in req) {
        groups["Company Acquisitions"].push(req);
      } else if ("equity_offered" in req && "funding_round" in req) {
        groups["Equity Financing"].push(req);
      } else if ("revenue_share" in req && "repayment_terms" in req) {
        groups["Revenue-Based Financing"].push(req);
      } else if (
        "project_name" in req &&
        "project_location" in req &&
        "project_sector" in req
      ) {
        groups["Project Financing"].push(req);
      } else {
        groups["Other"].push(req);
      }
    }
    return groups;
  }

  return (
    <DefaultLayout>
      {loading ? (
        <CompanyViewSkeleton />
      ) : error ? (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
            <button
              onClick={refreshData}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      ) : !companyData ? (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <p>No company data found</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-full p-4">
          {/* Page Header with Gradient */}
          <div className="relative mb-6 rounded-3xl bg-gradient-to-r from-primary to-blue-600 p-6 text-white">
            {/* Edit Button - Top Right */}
            <button
              onClick={() => setEditCompanyDialogOpen(true)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-all hover:scale-110 hover:shadow-xl"
              title="Edit Company"
            >
              <Edit className="h-5 w-5" />
            </button>

            <div className="flex gap-4 pr-14">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden">
                {companyData.company_logo?.company_logo ? (
                  <img 
                    src={companyData.company_logo.company_logo} 
                    alt={companyData.company_data.company_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-white">
                    {companyData.company_data.company_abbreviations}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold md:text-3xl">
                  {companyData.company_data.company_name}
                </h1>
                <p className="mt-1 text-sm opacity-90 line-clamp-2">
                  {companyData.company_data.company_short_description}
                </p>
                {companyData.company_data.company_short_description && companyData.company_data.company_short_description.length > 100 && (
                  <button className="mt-1 text-xs font-medium underline opacity-90 hover:opacity-100">
                    View more
                  </button>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {companyData.company_data.status && (
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {companyData.company_data.status}
                    </span>
                  )}
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {companyData.company_data.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="rounded-3xl border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
            <Tab.Group
              selectedIndex={selectedTabIndex}
              onChange={setSelectedTabIndex}
            >
              <div className="p-4">
                <Tab.List className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
                  {tabItems.map((item, index) => (
                    <Tab
                      key={index}
                      className={({ selected }) =>
                        `flex flex-col items-center gap-2 rounded-2xl px-3 py-4 font-medium transition-all ${
                          selected
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-meta-4 dark:text-gray-400 dark:hover:bg-opacity-80"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform ${
                              selected
                                ? "bg-white/20 text-white"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <span className="text-center text-xs leading-tight">{item.name}</span>
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              {/* Tab Content */}
              <Tab.Panels className="border-t border-stroke p-6 dark:border-strokedark">
              <Tab.Panel>
                <CompanyDashboard
                  companyData={companyData.company_data}
                  contactData={companyData.company_contact_details}
                  onEdit={() => setEditCompanyDialogOpen(true)}
                  onAddDirector={() => setAddDirectorDialogOpen(true)}
                  onEditContact={() => setEditContactDetailsDialog(true)}
                />
              </Tab.Panel>

              <Tab.Panel>
                <CompanyDirectors
                  directorsData={directors}
                  onEdit={() => setEditCompanyDialogOpen(true)}
                  onAddDirector={() => setAddDirectorDialogOpen(true)}
                  onViewEmployee={(employeeId) =>
                    handleViewEmployee(employeeId)
                  }
                />
              </Tab.Panel>

              <Tab.Panel>
                <StockMarketSection
                  stockMarketData={companyData.stock_market_details}
                  onEdit={() => setEditStockMarketDialogOpen(true)}
                />
              </Tab.Panel>

              <Tab.Panel>
                <FundsAndValuationSection
                  fundsData={companyValuations?.fund || []}
                  valuationsData={companyValuations?.valuation || []}
                  onAddFunds={() => setAddPreviousFundsDialogOpen(true)}
                  onAddValuation={() => setAddCompanyValuationDialogOpen(true)}
                  companyId={companyId}
                />
              </Tab.Panel>

              <Tab.Panel>
                <FinancialMetricsSection
                  metricsData={financialMetrics}
                  onAddMetrics={() => setAddFinancialMetricsDialogOpen(true)}
                />
              </Tab.Panel>

              {/* Company Requests Tab */}
              <Tab.Panel>
                <div className="space-y-6">
                  <div className="mb-6 flex items-center justify-between rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-4 dark:from-meta-4 dark:to-boxdark">
                    <div>
                      <h2 className="text-xl font-bold text-black dark:text-white">Company Requests</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Manage all funding and investment requests</p>
                    </div>
                    <CustomButton
                      type="button"
                      variant="solid"
                      onClick={() => setAddCompanyRequestDialogOpen(true)}
                    >
                      Add Request
                    </CustomButton>
                  </div>
                  {companyRequests && companyRequests.length > 0 ? (
                    <div className="space-y-8">
                      {Object.entries(groupRequestsByType(companyRequests)).map(
                        ([label, requests]) =>
                          requests.length > 0 ? (
                            <div key={label} className="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
                                {label}
                              </h3>
                              <div className="overflow-x-auto rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark-2">
                                <table className="min-w-full divide-y divide-stroke dark:divide-strokedark">
                                  <thead className="bg-gray-50 dark:bg-meta-4">
                                    {label === "Company Acquisitions" && (
                                      <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Asking Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Deal Value
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Currency
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                    {label === "Equity Financing" && (
                                      <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Equity Offered
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Funding Round
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Currency
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                    {label === "Revenue-Based Financing" && (
                                      <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Revenue Share
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Repayment Terms
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Payment Frequency
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                    {label === "Project Financing" && (
                                      <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Project Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Currency
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Stage
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Sector
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                    {label === "Other" && (
                                      <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Request ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                  </thead>
                                  <tbody className="divide-y divide-stroke bg-white dark:divide-strokedark dark:bg-boxdark">
                                    {requests.map((req: any, idx: number) => (
                                      <tr
                                        key={req.request_id}
                                        className="transition-colors hover:bg-gray-50 dark:hover:bg-meta-4"
                                      >
                                        {/* Company Acquisitions */}
                                        {label === "Company Acquisitions" && (
                                          <>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.description}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                              <MoneyDisplay
                                                amount={req.asking_price}
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.deal_value}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                              {req.currency}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                              <CustomButton
                                                type="button"
                                                variant="outlined"
                                                size="sm"
                                              >
                                                View
                                              </CustomButton>
                                            </td>
                                          </>
                                        )}
                                        {/* Equity Financing */}
                                        {label === "Equity Financing" && (
                                          <>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.description}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                              <MoneyDisplay
                                                amount={req.amount}
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.equity_offered}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.funding_round}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                              {req.currency}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                              <CustomButton
                                                type="button"
                                                variant="outlined"
                                                size="sm"
                                              >
                                                View
                                              </CustomButton>
                                            </td>
                                          </>
                                        )}
                                        {/* Revenue-Based Financing */}
                                        {label ===
                                          "Revenue-Based Financing" && (
                                          <>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.description}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                              <MoneyDisplay
                                                amount={req.amount}
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.revenue_share}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.repayment_terms}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.payment_frequency}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                              <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                  req.status === "approved"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                                                    : req.status === "pending"
                                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                                                      : "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
                                                }`}
                                              >
                                                {req.status}
                                              </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                              <CustomButton
                                                type="button"
                                                variant="outlined"
                                                size="sm"
                                                onClick={() =>
                                                  handleViewRevenueFinancing(
                                                    req,
                                                  )
                                                }
                                              >
                                                View
                                              </CustomButton>
                                            </td>
                                          </>
                                        )}
                                        {/* Project Financing */}
                                        {label === "Project Financing" && (
                                          <>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                              {req.project_name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                              <MoneyDisplay
                                                amount={req.amount}
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                              {req.currency}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.current_project_stage}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.project_sector}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                              <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                  req.status === "approved"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                                                    : req.status === "pending"
                                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                                                      : "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
                                                }`}
                                              >
                                                {req.status}
                                              </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                              <CustomButton
                                                type="button"
                                                variant="outlined"
                                                size="sm"
                                                onClick={() =>
                                                  handleViewProjectFinancing(
                                                    req,
                                                  )
                                                }
                                              >
                                                View
                                              </CustomButton>
                                            </td>
                                          </>
                                        )}
                                        {/* Other */}
                                        {label === "Other" && (
                                          <>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                              {req.request_id}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                              {req.description || "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                              <CustomButton
                                                type="button"
                                                variant="outlined"
                                                size="sm"
                                              >
                                                View
                                              </CustomButton>
                                            </td>
                                          </>
                                        )}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ) : null,
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-stroke bg-gray-50 p-12 dark:border-strokedark dark:bg-meta-4">
                      <AlertCircle className="mb-4 h-12 w-12 text-gray-400" />
                      <p className="text-center text-lg font-medium text-gray-900 dark:text-gray-100">No company requests found</p>
                      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Get started by creating your first funding request
                      </p>
                    </div>
                  )}
                  <AddCompanyRequestDialog
                    isOpen={addCompanyRequestDialogOpen}
                    onClose={() => setAddCompanyRequestDialogOpen(false)}
                    companyId={companyId}
                    onSuccess={refreshData}
                  />
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <CompanyUpdatesSection
                  updates={updates}
                  onAddUpdate={() => setAddUpdateDialogOpen(true)}
                />
              </Tab.Panel>

              <Tab.Panel>
                <CompanyDocumentsSection
                  documents={companyData?.company_documents || []}
                  onUpload={handleDocumentUpload}
                />
              </Tab.Panel>
            </Tab.Panels>
            </Tab.Group>
          </div>

          {/* Dialogs */}
          <EditCompanyDialog
            isOpen={editCompanyDialogOpen}
            onClose={() => setEditCompanyDialogOpen(false)}
            initialData={companyData.company_data}
            onSave={handleCompanyUpdate}
          />

          <ContactDetailsDialog
            isOpen={editContactDetailDialog}
            onOpenChange={(open: boolean) => setEditContactDetailsDialog(open)}
            initialData={companyData.company_contact_details}
            companyId={companyData.company_data.company_id}
            onSave={handleContactDetailsSave}
          />

          <EmployeeViewDialog
            isOpen={viewEmployeeDialog}
            onClose={() => setViewEmployeeDialog(false)}
            employeeData={employeeData}
            onEdit={() => {}}
          />

          <EditStockMarketDialog
            isOpen={editStockMarketDialogOpen}
            onClose={() => setEditStockMarketDialogOpen(false)}
            initialData={companyData.stock_market_details}
            onSave={handleStockMarketUpdate}
          />

          <AddCompanyUpdateDialog
            isOpen={addUpdateDialogOpen}
            onClose={() => setAddUpdateDialogOpen(false)}
            companyId={companyData.company_data.company_id}
            onSave={handleAddUpdate}
          />

          <AddDirectorDialog
            isOpen={addDirectorDialogOpen}
            onClose={() => setAddDirectorDialogOpen(false)}
            companyId={companyData.company_data.company_id}
            onSave={handleAddDirector}
          />

          <AddPreviousFundsDialog
            isOpen={addPreviousFundsDialogOpen}
            onClose={() => setAddPreviousFundsDialogOpen(false)}
            companyId={companyData.company_data.company_id}
            onSave={handleAddPreviousFunds}
          />

          <AddFinancialMetricsDialog
            isOpen={addFinancialMetricsDialogOpen}
            onClose={() => setAddFinancialMetricsDialogOpen(false)}
            companyId={companyData.company_data.company_id}
            onSave={handleAddFinancialMetrics}
          />

          <AddCompanyValuationDialog
            isOpen={addCompanyValuationDialogOpen}
            onClose={() => setAddCompanyValuationDialogOpen(false)}
            companyId={companyData.company_data.company_id}
            onSave={handleAddValuation}
          />
          <ViewRevenueFinancingDialog
            isOpen={viewRevenueFinancingDialogOpen}
            onClose={() => setViewRevenueFinancingDialogOpen(false)}
            requestData={selectedRequest}
          />

          <ViewProjectFinancingDialog
            isOpen={viewProjectFinancingDialogOpen}
            onClose={() => setViewProjectFinancingDialogOpen(false)}
            requestData={selectedRequest}
          />
        </div>
      )}
    </DefaultLayout>
  );
}

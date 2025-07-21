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
    { name: "Company Requests", icon: <TrendingUp className="h-5 w-5" /> },

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
    <DefaultLayout loading={loading}>
      {error ? (
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
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Company View
              </h1>
              <p className="text-gray-500">
                View and manage company information
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 md:mt-0">
              <CustomButton
                type="button"
                variant="outlined"
                icon={<FileText className="h-4 w-4" />}
                onClick={() => console.log("Export")}
              >
                Export
              </CustomButton>
              <CustomButton
                type="button"
                variant="solid"
                icon={<Edit className="h-4 w-4" />}
                onClick={() => setEditCompanyDialogOpen(true)}
              >
                Edit Company
              </CustomButton>
            </div>
          </div>

          {/* Company Header Card */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#001f3f]/10 text-xl font-bold text-[#001f3f]">
                  {companyData.company_data.company_abbreviations}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {companyData.company_data.company_name}
                  </h2>
                  <p className="text-gray-500">
                    {companyData.company_data.company_short_description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      {companyData.company_data.status}
                    </span>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {companyData.company_data.sector}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 md:items-end">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Started:{" "}
                    {new Date(
                      companyData.company_data.company_start_date,
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{companyData.company_data.employees} Employees</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{companyData.company_data.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tab.Group
            selectedIndex={selectedTabIndex}
            onChange={setSelectedTabIndex}
          >
            <Tab.List className="mb-6 flex space-x-1 overflow-x-auto rounded-lg bg-gray-100 p-1">
              {tabItems.map((item, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    `flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-3 text-sm font-medium leading-5 transition-all
${selected ? "bg-white text-[#001f3f] shadow" : "text-gray-600 hover:bg-white/[0.12] hover:text-[#001f3f]"}`
                  }
                >
                  {item.icon}
                  {item.name}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="mt-2">
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
                <div className="space-y-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Company Requests</h2>
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
                            <div key={label}>
                              <h3 className="mb-2 text-lg font-semibold">
                                {label}
                              </h3>
                              <div className="overflow-x-auto rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    {label === "Company Acquisitions" && (
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Description
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Asking Price
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Deal Value
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Currency
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                    {label === "Equity Financing" && (
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Description
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Amount
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Equity Offered
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Funding Round
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Currency
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                    {label === "Revenue-Based Financing" && (
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Description
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Amount
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Revenue Share
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Repayment Terms
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Payment Frequency
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Status
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                    {label === "Project Financing" && (
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Project Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Amount
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Currency
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Stage
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Sector
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Status
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                    {label === "Other" && (
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Request ID
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Description
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                                          Actions
                                        </th>
                                      </tr>
                                    )}
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 bg-white">
                                    {requests.map((req: any, idx: number) => (
                                      <tr
                                        key={req.request_id}
                                        className={
                                          idx % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                        }
                                      >
                                        {/* Company Acquisitions */}
                                        {label === "Company Acquisitions" && (
                                          <>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.description}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              <MoneyDisplay
                                                amount={req.asking_price}
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.deal_value}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.currency}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
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
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.description}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              <MoneyDisplay
                                                amount={req.amount}
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.equity_offered}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.funding_round}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.currency}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
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
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.description}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              <MoneyDisplay
                                                amount={req.amount}
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.revenue_share}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.repayment_terms}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.payment_frequency}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${
                                                  req.status === "approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : req.status === "pending"
                                                      ? "bg-yellow-100 text-yellow-800"
                                                      : "bg-red-100 text-red-800"
                                                }`}
                                              >
                                                {req.status}
                                              </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
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
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.project_name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              <MoneyDisplay
                                                amount={req.amount}
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.currency}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.current_project_stage}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.project_sector}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${
                                                  req.status === "approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : req.status === "pending"
                                                      ? "bg-yellow-100 text-yellow-800"
                                                      : "bg-red-100 text-red-800"
                                                }`}
                                              >
                                                {req.status}
                                              </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
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
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.request_id}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                              {req.description || "-"}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
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
                    <div className="text-gray-500">
                      No company requests found.
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
                  documents={companyDocuments?.documents || []}
                  onUpload={handleDocumentUpload}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

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

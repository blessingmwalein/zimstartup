"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Tab } from "@headlessui/react"
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
} from "lucide-react"
import { toast } from "react-toastify"

import { useCompanyData } from "@/hooks/useCompanyData"
import CustomButton from "@/components/Companies/ui/custom-button"
import CompanyDashboard from "@/components/Companies/company-dashboard"
import StockMarketSection from "@/components/Companies/stock-market-section"
import CompanyUpdatesSection from "@/components/Companies/company-updates-section"
import CompanyDocumentsSection from "@/components/Companies/company-documents-section"


import EditCompanyDialog from "@/components/Companies/dialogs/edit-company-dialog"
import EditStockMarketDialog from "@/components/Companies/dialogs/edit-stock-market-dialog"
import AddCompanyUpdateDialog from "@/components/Companies/dialogs/add-company-update-dialog"
import AddDirectorDialog from "@/components/Companies/dialogs/add-director-dialog"
import EmployeeViewDialog from "@/components/Companies/dialogs/employee-view-dialog"
import ContactDetailsDialog from "@/components/Companies/dialogs/contact-details-dialog"

import DefaultLayout from "@/components/Layouts/DefaultLayout"
import CompanyDirectors from "@/components/Companies/company-directors"
import type { CreateCompanyRequest } from "../../../../../../state/models/company"
import { useSelector } from "react-redux"
import type { UpdateContactInforRequest } from "../../../../../../state/models/employement"
import PreviousFundsSection from "@/components/Companies/previous-funds-section"
import FinancialMetricsSection from "@/components/Companies/finantial-metrics"
import AddPreviousFundsDialog from "@/components/Companies/dialogs/add-previous-funds-dialog"
import AddFinancialMetricsDialog from "@/components/Companies/dialogs/add-financial-metrics-dialog"
import MoneyDisplay from "@/components/common/MoneyDisplay"

export default function CompanyView() {
  const { company_id } = useParams()
  const companyId = Array.isArray(company_id) ? Number.parseInt(company_id[0]) : Number.parseInt(company_id)

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
    updateCompany,
    updateContactData,
    updateStockMarket,
    addUpdate,
    addDirector,
    uploadDocument,
    addPreviousFunds,
    addFinancialMetrics,
    refreshData,
    fetchEmployeeData,
    companyData
  } = useCompanyData(companyId)

  // State for dialogs
  const [editCompanyDialogOpen, setEditCompanyDialogOpen] = useState(false)
  const [editContactDetailDialog, setEditContactDetailsDialog] = useState(false)
  const [viewEmployeeDialog, setViewEmployeeDialog] = useState(false)
  const [editStockMarketDialogOpen, setEditStockMarketDialogOpen] = useState(false)
  const [addUpdateDialogOpen, setAddUpdateDialogOpen] = useState(false)
  const [addDirectorDialogOpen, setAddDirectorDialogOpen] = useState(false)
  const [addPreviousFundsDialogOpen, setAddPreviousFundsDialogOpen] = useState(false)
  const [addFinancialMetricsDialogOpen, setAddFinancialMetricsDialogOpen] = useState(false)
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const { status, error: reduxError, user } = useSelector((state: any) => state.auth)

  // Handler functions
  const handleCompanyUpdate = async (updatedData: CreateCompanyRequest) => {
    const result: any = await updateCompany(updatedData, companyId)
    if (result.success) {
      toast.success("Company information updated successfully")
    } else {
      toast.error(result.error || "Failed to update company information")
    }
    setEditCompanyDialogOpen(false)
  }

  const handleContactDetailsSave = async (updateContactDetails: UpdateContactInforRequest) => {
    const result: any = await updateContactData({
      ...updateContactDetails,
      company_id: companyId,
    })
    if (result.success) {
      toast.success("Company contact updated successfully")
    } else {
      toast.error(result.error || "Failed to update company contact")
    }
    setEditContactDetailsDialog(false)
  }

  const handleStockMarketUpdate = async (updatedData: any) => {
    const result = await updateStockMarket(updatedData)
    if (result.success) {
      toast.success("Stock market details updated successfully")
    } else {
      toast.error(result.error || "Failed to update stock market details")
    }
    setEditStockMarketDialogOpen(false)
  }

  const handleAddUpdate = async (newUpdate: any) => {
    const result = await addUpdate(newUpdate)
    if (result.success) {
      toast.success("Company update added successfully")
    } else {
      toast.error(result.error || "Failed to add company update")
    }
    setAddUpdateDialogOpen(false)
  }

  const handleAddDirector = async (newDirector: any) => {
    const result = await addDirector(newDirector)
    if (result.success) {
      toast.success("Director added successfully")
    } else {
      toast.error(result.error || "Failed to add director")
    }
    setAddDirectorDialogOpen(false)
  }

  const handleDocumentUpload = async (file: File) => {
    const result = await uploadDocument(file)
    if (result.success) {
      toast.success("Document uploaded successfully")
    } else {
      toast.error(result.error || "Failed to upload document")
    }
  }

  const handleAddPreviousFunds = async (fundsData: any) => {
    const result = await addPreviousFunds(fundsData)
    if (result.success) {
      toast.success("Previous funding added successfully")
    } else {
      toast.error(result.error || "Failed to add previous funding")
    }
    setAddPreviousFundsDialogOpen(false)
  }

  const handleAddFinancialMetrics = async (metricsData: any) => {
    const result = await addFinancialMetrics(metricsData)
    if (result.success) {
      toast.success("Financial metrics added successfully")
    } else {
      toast.error(result.error || "Failed to add financial metrics")
    }
    setAddFinancialMetricsDialogOpen(false)
  }

  const handleViewEmployee = async (employeeId: number) => {
    const result = await fetchEmployeeData(employeeId)
    setViewEmployeeDialog(true)
  }

  const tabItems = [
    { name: "Dashboard", icon: <Building2 className="h-5 w-5" /> },
    { name: "Directors", icon: <Users className="h-5 w-5" /> },
    { name: "Stock Market", icon: <BarChart4 className="h-5 w-5" /> },
    { name: "Previous Funds", icon: <DollarSign className="h-5 w-5" /> },
    { name: "Financial Metrics", icon: <TrendingUp className="h-5 w-5" /> },
    { name: "Company Requests", icon: <TrendingUp className="h-5 w-5" /> },

    { name: "Updates", icon: <Bell className="h-5 w-5" /> },
    { name: "Documents", icon: <FileText className="h-5 w-5" /> },
  ]

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
        <div className="container mx-auto py-6 px-4">
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Company View</h1>
              <p className="text-gray-500">View and manage company information</p>
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
                  <h2 className="text-2xl font-bold">{companyData.company_data.company_name}</h2>
                  <p className="text-gray-500">{companyData.company_data.company_short_description}</p>
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
                  <span>Started: {new Date(companyData.company_data.company_start_date).toLocaleDateString()}</span>
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
          <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
            <Tab.List className="mb-6 flex space-x-1 rounded-lg bg-gray-100 p-1 overflow-x-auto">
              {tabItems.map((item, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    `flex flex-1 items-center justify-center gap-2 rounded-md py-3 px-4 text-sm font-medium leading-5 transition-all whitespace-nowrap
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
                  onViewEmployee={(employeeId) => handleViewEmployee(employeeId)}
                />
              </Tab.Panel>

              <Tab.Panel>
                <StockMarketSection
                  stockMarketData={companyData.stock_market_details}
                  onEdit={() => setEditStockMarketDialogOpen(true)}
                />
              </Tab.Panel>

              <Tab.Panel>
                <PreviousFundsSection
                  fundData={companyData.previous_funds}
                  onAddFunds={() => setAddPreviousFundsDialogOpen(true)}
                />
              </Tab.Panel>

              <Tab.Panel>
                <FinancialMetricsSection
                  metricsData={companyData.financial_metrics}
                  onAddMetrics={() => setAddFinancialMetricsDialogOpen(true)}
                />
              </Tab.Panel>

              {/* Company Requests Tab */}
              <Tab.Panel>
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Company Requests</h2>
                    <CustomButton type="button" variant="solid" onClick={() => { /* TODO: open add request dialog */ }}>
                      Add Request
                    </CustomButton>
                  </div>
                  {companyRequests && companyRequests.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Currency</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {companyRequests.map((req: any) => (
                            <tr key={req.request_id}>
                              <td className="px-4 py-2 whitespace-nowrap">{req.project_name}</td>
                              <td className="px-4 py-2 whitespace-nowrap">
                              <MoneyDisplay amount={req.amount} />


                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">{req.currency}</td>
                              <td className="px-4 py-2 whitespace-nowrap">{req.current_project_stage}</td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <CustomButton type="button" variant="outlined" size="sm" onClick={() => { /* TODO: view logic */ }}>View</CustomButton>
                                <CustomButton type="button" variant="outlined" size="sm" onClick={() => { /* TODO: edit logic */ }}>Edit</CustomButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-gray-500">No company requests found.</div>
                  )}
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <CompanyUpdatesSection updates={updates} onAddUpdate={() => setAddUpdateDialogOpen(true)} />
              </Tab.Panel>

              <Tab.Panel>
                <CompanyDocumentsSection documents={companyDocuments?.documents || []} onUpload={handleDocumentUpload} />
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
            onEdit={() => { }}
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
        </div>
      )}
    </DefaultLayout>
  )
}

"use client"

import { useForm } from "react-hook-form"
import { Dialog } from "@headlessui/react"
import { X, TrendingUp, DollarSign, Percent } from "lucide-react"
import TextField from "../ui/text-field"
import CustomButton from "../ui/custom-button"

interface AddFinancialMetricsDialogProps {
    isOpen: boolean
    onClose: () => void
    companyId: number
    onSave: (data: any) => void
}

export default function AddFinancialMetricsDialog({
    isOpen,
    onClose,
    companyId,
    onSave,
}: AddFinancialMetricsDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            revenue: 0,
            profit_margin: 0,
            ebitda: 0,
            cash_flow: 0,
            total_assets: 0,
            total_liabilities: 0,
            debt_level: 0,
            valuation_multiple: 0,
            revenue_growth_rate: 0,
            customer_growth_rate: 0,
            market_share: 0,
            retention_rate: 0,
        },
    })
    const onSubmit = (data: any) => {
        const payload = {
            ...data,
            company_id: companyId,
            customer_growth_rate: Math.round(parseFloat(data.customer_growth_rate)),
            market_share: Math.round(parseFloat(data.market_share)),
        }

        onSave(payload)
        reset()
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-full max-w-5xl rounded-lg bg-white shadow-xl">
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <Dialog.Title className="text-xl font-semibold">Add Financial Metrics</Dialog.Title>
                            <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex h-[calc(100vh-250px)] flex-col">
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-4 text-lg font-medium">Financial Performance</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <TextField
                                            label="Revenue"
                                            icon={<DollarSign className="h-5 w-5" />}
                                            type="number"
                                            {...register("revenue", {
                                                required: "Revenue is required",
                                                min: { value: 0, message: "Must be positive" },
                                            })}
                                            error={errors.revenue?.message}
                                            placeholder="Enter total revenue"
                                        />

                                        <TextField
                                            label="Profit Margin (%)"
                                            icon={<Percent className="h-5 w-5" />}
                                            type="number"
                                            step="0.01"
                                            {...register("profit_margin", {
                                                required: "Profit margin is required",
                                                min: { value: 0, message: "Must be positive" },
                                                max: { value: 100, message: "Cannot exceed 100%" },
                                            })}
                                            error={errors.profit_margin?.message}
                                            placeholder="Enter profit margin"
                                        />

                                        <TextField
                                            label="EBITDA"
                                            icon={<DollarSign className="h-5 w-5" />}
                                            type="number"
                                            {...register("ebitda", {
                                                required: "EBITDA is required",
                                            })}
                                            error={errors.ebitda?.message}
                                            placeholder="Enter EBITDA"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-lg font-medium">Financial Position</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <TextField
                                            label="Cash Flow"
                                            icon={<DollarSign className="h-5 w-5" />}
                                            type="number"
                                            {...register("cash_flow", {
                                                required: "Cash flow is required",
                                            })}
                                            error={errors.cash_flow?.message}
                                            placeholder="Enter cash flow"
                                        />

                                        <TextField
                                            label="Total Assets"
                                            icon={<DollarSign className="h-5 w-5" />}
                                            type="number"
                                            {...register("total_assets", {
                                                required: "Total assets is required",
                                                min: { value: 0, message: "Must be positive" },
                                            })}
                                            error={errors.total_assets?.message}
                                            placeholder="Enter total assets"
                                        />

                                        <TextField
                                            label="Total Liabilities"
                                            icon={<DollarSign className="h-5 w-5" />}
                                            type="number"
                                            {...register("total_liabilities", {
                                                required: "Total liabilities is required",
                                                min: { value: 0, message: "Must be positive" },
                                            })}
                                            error={errors.total_liabilities?.message}
                                            placeholder="Enter total liabilities"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-lg font-medium">Growth & Market Metrics</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <TextField
                                            label="Revenue Growth Rate (%)"
                                            icon={<TrendingUp className="h-5 w-5" />}
                                            type="number"
                                            step="0.01"
                                            {...register("revenue_growth_rate", {
                                                required: "Revenue growth rate is required",
                                            })}
                                            error={errors.revenue_growth_rate?.message}
                                            placeholder="Enter revenue growth rate"
                                        />

                                        <TextField
                                            label="Customer Growth Rate (%)"
                                            icon={<TrendingUp className="h-5 w-5" />}
                                            type="number"
                                            step="0.01"
                                            {...register("customer_growth_rate", {
                                                required: "Customer growth rate is required",
                                            })}
                                            error={errors.customer_growth_rate?.message}
                                            placeholder="Enter customer growth rate"
                                        />

                                        <TextField
                                            label="Market Share (%)"
                                            icon={<Percent className="h-5 w-5" />}
                                            type="number"
                                            step="0.01"
                                            {...register("market_share", {
                                                required: "Market share is required",
                                                min: { value: 0, message: "Must be positive" },
                                                max: { value: 100, message: "Cannot exceed 100%" },
                                            })}
                                            error={errors.market_share?.message}
                                            placeholder="Enter market share"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-lg font-medium">Additional Metrics</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <TextField
                                            label="Debt Level"
                                            icon={<DollarSign className="h-5 w-5" />}
                                            type="number"
                                            {...register("debt_level", {
                                                required: "Debt level is required",
                                                min: { value: 0, message: "Must be positive" },
                                            })}
                                            error={errors.debt_level?.message}
                                            placeholder="Enter debt level"
                                        />

                                        <TextField
                                            label="Valuation Multiple"
                                            type="number"
                                            step="0.01"
                                            {...register("valuation_multiple", {
                                                required: "Valuation multiple is required",
                                                min: { value: 0, message: "Must be positive" },
                                            })}
                                            error={errors.valuation_multiple?.message}
                                            placeholder="Enter valuation multiple"
                                        />

                                        <TextField
                                            label="Retention Rate (%)"
                                            icon={<Percent className="h-5 w-5" />}
                                            type="number"
                                            step="0.01"
                                            {...register("retention_rate", {
                                                required: "Retention rate is required",
                                                min: { value: 0, message: "Must be positive" },
                                                max: { value: 100, message: "Cannot exceed 100%" },
                                            })}
                                            error={errors.retention_rate?.message}
                                            placeholder="Enter retention rate"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 border-t border-gray-200 p-6">
                            <CustomButton type="button" variant="outlined" onClick={onClose}>
                                Cancel
                            </CustomButton>
                            <CustomButton type="submit" variant="solid">
                                Save Metrics
                            </CustomButton>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

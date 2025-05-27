"use client"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Validation schema
const valuationSchema = Yup.object({
  company_id: Yup.number().required(),
  valuation_amount: Yup.string().required("Valuation amount is required"),
  valuation_date: Yup.string().required("Valuation date is required"),
  notes: Yup.string(),
  valuation_method: Yup.string().required("Valuation method is required"),
  valuation_currency: Yup.string().required("Currency is required"),
  financial_year: Yup.number().required("Financial year is required"),
  financial_period: Yup.string().required("Financial period is required"),
  current_growth_rate: Yup.string(),
}).required()

interface ValuationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyId: number
}

export default function ValuationDialog({ open, onOpenChange, companyId }: ValuationDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(valuationSchema),
    defaultValues: {
      company_id: companyId,
      valuation_amount: "",
      valuation_date: new Date().toISOString().split("T")[0],
      notes: "",
      valuation_method: "",
      valuation_currency: "",
      financial_year: new Date().getFullYear(),
      financial_period: "Q1",
      current_growth_rate: "",
    },
  })

  const onSubmit = (data: any) => {
    console.log("Submitting valuation data:", data)
    // Here you would typically make an API call to save the data
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Company Valuation</DialogTitle>
          <DialogDescription>Add or update the company's valuation information.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valuation_amount">Valuation Amount</Label>
              <Input
                id="valuation_amount"
                {...register("valuation_amount")}
                type="number"
                placeholder="1000000"
                className={errors.valuation_amount ? "border-red-500" : ""}
              />
              {errors.valuation_amount && <p className="text-xs text-red-500">{errors.valuation_amount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="valuation_currency">Currency</Label>
              <Controller
                control={control}
                name="valuation_currency"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="valuation_currency"
                      className={errors.valuation_currency ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="CNY">CNY</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.valuation_currency && <p className="text-xs text-red-500">{errors.valuation_currency.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valuation_date">Valuation Date</Label>
            <Input
              id="valuation_date"
              {...register("valuation_date")}
              type="date"
              className={errors.valuation_date ? "border-red-500" : ""}
            />
            {errors.valuation_date && <p className="text-xs text-red-500">{errors.valuation_date.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="valuation_method">Valuation Method</Label>
            <Controller
              control={control}
              name="valuation_method"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="valuation_method" className={errors.valuation_method ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DCF">Discounted Cash Flow (DCF)</SelectItem>
                    <SelectItem value="Comparable">Comparable Company Analysis</SelectItem>
                    <SelectItem value="Asset">Asset-Based Valuation</SelectItem>
                    <SelectItem value="VC">Venture Capital Method</SelectItem>
                    <SelectItem value="First Chicago">First Chicago Method</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.valuation_method && <p className="text-xs text-red-500">{errors.valuation_method.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="financial_year">Financial Year</Label>
              <Input
                id="financial_year"
                {...register("financial_year")}
                type="number"
                className={errors.financial_year ? "border-red-500" : ""}
              />
              {errors.financial_year && <p className="text-xs text-red-500">{errors.financial_year.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="financial_period">Financial Period</Label>
              <Controller
                control={control}
                name="financial_period"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="financial_period" className={errors.financial_period ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Q1">Q1</SelectItem>
                      <SelectItem value="Q2">Q2</SelectItem>
                      <SelectItem value="Q3">Q3</SelectItem>
                      <SelectItem value="Q4">Q4</SelectItem>
                      <SelectItem value="Annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.financial_period && <p className="text-xs text-red-500">{errors.financial_period.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_growth_rate">Current Growth Rate (%)</Label>
            <Input id="current_growth_rate" {...register("current_growth_rate")} type="number" placeholder="15" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Additional information about this valuation..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Valuation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

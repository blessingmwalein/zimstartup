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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Validation schema
const fundsSchema = Yup.object({
  company_id: Yup.number().required(),
  investor_type: Yup.string().required("Investor type is required"),
  investor_information: Yup.string(),
  investment_type: Yup.string().required("Investment type is required"),
  date_of_funds: Yup.string().required("Date of funds is required"),
  investment_amount: Yup.string().required("Investment amount is required"),
  investment_currency: Yup.string().required("Investment currency is required"),
  company_valuation: Yup.string(),
  company_valuation_currency: Yup.string().when("company_valuation", {
    is: (val: string) => val && val.length > 0,
    then: (schema) => schema.required("Valuation currency is required when valuation is provided"),
  }),
  valuation_date: Yup.string().when("company_valuation", {
    is: (val: string) => val && val.length > 0,
    then: (schema) => schema.required("Valuation date is required when valuation is provided"),
  }),
}).required()

interface PreviousFundsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyId: number
}

export default function PreviousFundsDialog({ open, onOpenChange, companyId }: PreviousFundsDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(fundsSchema),
    defaultValues: {
      investor_type: "",
      investor_information: "",
      investment_type: "",
      date_of_funds: new Date().toISOString().split("T")[0],
      investment_amount: "",
      investment_currency: "",
      company_valuation: "",
      company_valuation_currency: "",
      valuation_date: new Date().toISOString().split("T")[0],
      company_id: companyId,
    },
  })

  const onSubmit = (data: any) => {
    console.log("Submitting previous funds data:", data)
    // Here you would typically make an API call to save the data
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Previous Funding</DialogTitle>
          <DialogDescription>Add or update information about previous funding rounds.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investor_type">Investor Type</Label>
              <Controller
                control={control}
                name="investor_type"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="investor_type" className={errors.investor_type ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Angel">Angel Investor</SelectItem>
                      <SelectItem value="VC">Venture Capital</SelectItem>
                      <SelectItem value="PE">Private Equity</SelectItem>
                      <SelectItem value="Corporate">Corporate Investor</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Family Office">Family Office</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.investor_type && <p className="text-xs text-red-500">{errors.investor_type.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment_type">Investment Type</Label>
              <Controller
                control={control}
                name="investment_type"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="investment_type" className={errors.investment_type ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Seed">Seed</SelectItem>
                      <SelectItem value="Series A">Series A</SelectItem>
                      <SelectItem value="Series B">Series B</SelectItem>
                      <SelectItem value="Series C">Series C</SelectItem>
                      <SelectItem value="Series D+">Series D+</SelectItem>
                      <SelectItem value="Debt">Debt Financing</SelectItem>
                      <SelectItem value="Grant">Grant</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.investment_type && <p className="text-xs text-red-500">{errors.investment_type.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="investor_information">Investor Information</Label>
            <Textarea
              id="investor_information"
              {...register("investor_information")}
              placeholder="Details about the investor(s)..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_of_funds">Date of Funds</Label>
              <Input
                id="date_of_funds"
                {...register("date_of_funds")}
                type="date"
                className={errors.date_of_funds ? "border-red-500" : ""}
              />
              {errors.date_of_funds && <p className="text-xs text-red-500">{errors.date_of_funds.message}</p>}
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investment_amount">Investment Amount</Label>
              <Input
                id="investment_amount"
                {...register("investment_amount")}
                type="number"
                placeholder="1000000"
                className={errors.investment_amount ? "border-red-500" : ""}
              />
              {errors.investment_amount && <p className="text-xs text-red-500">{errors.investment_amount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment_currency">Investment Currency</Label>
              <Controller
                control={control}
                name="investment_currency"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="investment_currency"
                      className={errors.investment_currency ? "border-red-500" : ""}
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
              {errors.investment_currency && (
                <p className="text-xs text-red-500">{errors.investment_currency.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_valuation">Company Valuation</Label>
              <Input
                id="company_valuation"
                {...register("company_valuation")}
                type="number"
                placeholder="5000000"
                className={errors.company_valuation ? "border-red-500" : ""}
              />
              {errors.company_valuation && <p className="text-xs text-red-500">{errors.company_valuation.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_valuation_currency">Valuation Currency</Label>
              <Controller
                control={control}
                name="company_valuation_currency"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="company_valuation_currency"
                      className={errors.company_valuation_currency ? "border-red-500" : ""}
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
              {errors.company_valuation_currency && (
                <p className="text-xs text-red-500">{errors.company_valuation_currency.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Funding"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

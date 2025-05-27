"use client"
import { useForm } from "react-hook-form"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart4, DollarSign, TrendingUp } from "lucide-react"

// Validation schema
const financialSchema = Yup.object({
  company_id: Yup.number().required(),
  revenue: Yup.string(),
  profit_margin: Yup.string(),
  ebitda: Yup.string(),
  cash_flow: Yup.string(),
  total_assets: Yup.string(),
  total_liabilities: Yup.string(),
  debt_level: Yup.string(),
  valuation_multiple: Yup.string(),
  revenue_growth_rate: Yup.string(),
  customer_growth_rate: Yup.string(),
  market_share: Yup.string(),
  retention_rate: Yup.string(),
}).required()

interface FinancialMetricsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyId: number
}

export default function FinancialMetricsDialog({ open, onOpenChange, companyId }: FinancialMetricsDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(financialSchema),
    defaultValues: {
      company_id: companyId,
      revenue: "",
      profit_margin: "",
      ebitda: "",
      cash_flow: "",
      total_assets: "",
      total_liabilities: "",
      debt_level: "",
      valuation_multiple: "",
      revenue_growth_rate: "",
      customer_growth_rate: "",
      market_share: "",
      retention_rate: "",
    },
  })

  const onSubmit = (data: any) => {
    console.log("Submitting financial metrics:", data)
    // Here you would typically make an API call to save the data
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Financial Metrics</DialogTitle>
          <DialogDescription>Add or update the company's financial metrics.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs defaultValue="financial" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Financial</span>
              </TabsTrigger>
              <TabsTrigger value="assets" className="flex items-center gap-2">
                <BarChart4 className="h-4 w-4" />
                <span>Assets & Liabilities</span>
              </TabsTrigger>
              <TabsTrigger value="growth" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Growth Metrics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="financial" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Revenue</Label>
                  <Input id="revenue" {...register("revenue")} type="number" placeholder="1000000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profit_margin">Profit Margin (%)</Label>
                  <Input id="profit_margin" {...register("profit_margin")} type="number" placeholder="15" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ebitda">EBITDA</Label>
                  <Input id="ebitda" {...register("ebitda")} type="number" placeholder="500000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cash_flow">Cash Flow</Label>
                  <Input id="cash_flow" {...register("cash_flow")} type="number" placeholder="300000" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_assets">Total Assets</Label>
                  <Input id="total_assets" {...register("total_assets")} type="number" placeholder="2000000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total_liabilities">Total Liabilities</Label>
                  <Input
                    id="total_liabilities"
                    {...register("total_liabilities")}
                    type="number"
                    placeholder="1000000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="debt_level">Debt Level</Label>
                  <Input id="debt_level" {...register("debt_level")} type="number" placeholder="500000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valuation_multiple">Valuation Multiple</Label>
                  <Input id="valuation_multiple" {...register("valuation_multiple")} type="number" placeholder="5" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="growth" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue_growth_rate">Revenue Growth Rate (%)</Label>
                  <Input id="revenue_growth_rate" {...register("revenue_growth_rate")} type="number" placeholder="20" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_growth_rate">Customer Growth Rate (%)</Label>
                  <Input
                    id="customer_growth_rate"
                    {...register("customer_growth_rate")}
                    type="number"
                    placeholder="15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="market_share">Market Share (%)</Label>
                  <Input id="market_share" {...register("market_share")} type="number" placeholder="5" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retention_rate">Retention Rate (%)</Label>
                  <Input id="retention_rate" {...register("retention_rate")} type="number" placeholder="85" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Metrics"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

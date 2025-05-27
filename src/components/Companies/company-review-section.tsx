import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface CompanyReviewSectionProps {
  reviewData: any
}

export default function CompanyReviewSection({ reviewData }: CompanyReviewSectionProps) {
  const getStatusIcon = (status: string | null) => {
    if (!status) return <Clock className="h-5 w-5 text-amber-500" />

    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-amber-500" />
    }
  }

  const getStatusColor = (status: string | null) => {
    if (!status) return "bg-amber-50 text-amber-700 hover:bg-amber-50"

    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-50 text-green-700 hover:bg-green-50"
      case "rejected":
        return "bg-red-50 text-red-700 hover:bg-red-50"
      default:
        return "bg-amber-50 text-amber-700 hover:bg-amber-50"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Company Review</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Approver Status</h4>
              {reviewData.approver_status ? (
                <div className="mt-1 flex items-center gap-2">
                  {getStatusIcon(reviewData.approver_status)}
                  <Badge variant="outline" className={getStatusColor(reviewData.approver_status)}>
                    {reviewData.approver_status}
                  </Badge>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                    Pending Review
                  </Badge>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Chip Type</h4>
              <p className="font-medium">{reviewData.chip_type || "Not assigned"}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Company Comment</h4>
              <p className="font-medium">{reviewData.company_comment || "No comments provided"}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Updated By</h4>
              <p className="font-medium">{reviewData.updated_by || "Not updated yet"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

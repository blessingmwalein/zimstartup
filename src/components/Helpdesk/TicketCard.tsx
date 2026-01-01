import { Calendar, AlertCircle, MessageSquare, Clock } from "lucide-react"

interface Ticket {
  id: number
  subject: string
  description: string
  created_at: string
  updated_at: string
  status: string
  priority: string | null
  comment: string | null
}

interface TicketCardProps {
  ticket: Ticket
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const getPriorityColor = (priority: string | null) => {
    if (!priority) return "bg-gray-100 text-gray-700"
    
    switch (priority.toUpperCase()) {
      case "CRITICAL":
        return "bg-red-100 text-red-700"
      case "HIGH":
        return "bg-orange-100 text-orange-700"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700"
      case "LOW":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-700"
      case "closed":
        return "bg-gray-100 text-gray-700"
      case "resolved":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-[#052941] hover:shadow-md">
      {/* Header */}
      <div className="border-b border-gray-100 p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#052941]">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="mb-1 text-xs font-medium text-gray-500">Ticket #{ticket.id}</p>
              <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
                {ticket.subject}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${getStatusColor(ticket.status)}`}>
            {ticket.status}
          </span>
          {ticket.priority && (
            <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-4">
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {ticket.description}
          </p>
        </div>

        {/* Meta Information */}
        <div className="space-y-2.5 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-4 w-4 text-[#052941]" />
            <span className="font-medium">Created:</span>
            <span>{formatDate(ticket.created_at)}</span>
          </div>

          {ticket.updated_at !== ticket.created_at && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-4 w-4 text-[#052941]" />
              <span className="font-medium">Updated:</span>
              <span>{formatDate(ticket.updated_at)}</span>
            </div>
          )}

          {ticket.comment && ticket.comment !== "None" && ticket.comment !== "New" && (
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#052941]" />
              <div>
                <span className="font-medium">Comment:</span>{" "}
                <span className="line-clamp-2">{ticket.comment}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

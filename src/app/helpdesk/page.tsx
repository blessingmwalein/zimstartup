"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import MainLayout from "@/components/Layouts/MainLayout"
import AuthGuard from "@/components/AuthGuard"
import { Loader2, Plus, Headphones, AlertCircle, CheckCircle2 } from "lucide-react"
import CustomButton from "@/components/Buttons/CustomButton"
import { toast } from "react-toastify"
import CreateTicketModal from "@/components/Helpdesk/CreateTicketModal"
import TicketCard from "@/components/Helpdesk/TicketCard"

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

export default function HelpdeskPage() {
  const { user } = useSelector((state: any) => state.auth)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://zimstartup-861d8915d228.herokuapp.com/tickets', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch tickets')
      }

      const data = await response.json()
      setTickets(data.tickets || [])
      setError(null)
    } catch (err) {
      setError('Failed to load tickets. Please try again.')
      console.error('Error fetching tickets:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const handleCreateTicket = async (ticketData: {
    title: string
    description: string
    priority: string
  }) => {
    try {
      const response = await fetch('https://zimstartup-861d8915d228.herokuapp.com/tickets', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: ticketData.title,
          description: ticketData.description,
          national_id: user?.national_id || "",
          priority: ticketData.priority,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create ticket')
      }

      toast.success('Ticket created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      })

      // Refresh tickets list
      fetchTickets()
      setIsCreateModalOpen(false)
    } catch (err) {
      toast.error('Failed to create ticket. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      })
      console.error('Error creating ticket:', err)
    }
  }

  return (
    <AuthGuard>
      <MainLayout>
        <main className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#052941] to-[#041f30] py-10">
            <div className="relative z-10">
              <div className="container mx-auto px-4 text-center text-white sm:px-6 lg:px-8">
                <h1 className="mb-4 text-3xl font-bold lg:text-5xl">
                  Help <span className="text-[#80CAEE]">Desk</span>
                </h1>
                <p className="mx-auto mb-6 max-w-3xl text-lg">
                  Get support for your account, billing, and platform issues
                </p>
                
                {/* Summary Cards */}
                <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="space-y-2 text-center">
                      <p className="text-sm opacity-90">Total Tickets</p>
                      <p className="text-2xl font-bold">{tickets.length}</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="space-y-2 text-center">
                      <p className="text-sm opacity-90">Open Tickets</p>
                      <p className="text-2xl font-bold">
                        {tickets.filter(t => t.status === 'Open').length}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="space-y-2 text-center">
                      <p className="text-sm opacity-90">Resolved Tickets</p>
                      <p className="text-2xl font-bold">
                        {tickets.filter(t => t.status !== 'Open').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="group rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:border-[#052941] hover:shadow-lg">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#052941] to-[#041f30]">
                    <Headphones className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    24/7 Support
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our support team is available around the clock to help you.
                  </p>
                </div>
                
                <div className="group rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:border-[#052941] hover:shadow-lg">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#80CAEE] to-[#60AAD0]">
                    <AlertCircle className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Quick Response
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get fast responses to your queries and issues.
                  </p>
                </div>
                
                <div className="group rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:border-[#052941] hover:shadow-lg">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                    <CheckCircle2 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Issue Tracking
                  </h3>
                  <p className="text-sm text-gray-600">
                    Track all your support tickets in one convenient place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tickets Section */}
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
                    Your Support <span className="text-[#80CAEE]">Tickets</span>
                  </h2>
                  <p className="text-base text-gray-600">
                    View and manage all your support requests
                  </p>
                </div>
                
                <CustomButton
                  type="button"
                  variant="solid"
                  icon={<Plus className="h-5 w-5" />}
                  fullWidth={false}
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Create Ticket
                </CustomButton>
              </div>

              {loading && (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-[#052941]" />
                </div>
              )}

              {!loading && error && (
                <div className="py-16 text-center text-red-500">{error}</div>
              )}

              {!loading && !error && tickets.length === 0 && (
                <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                    <Headphones className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    No Tickets Yet
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Create your first support ticket to get help from our team
                  </p>
                  <CustomButton
                    type="button"
                    variant="solid"
                    icon={<Plus className="h-5 w-5" />}
                    fullWidth={false}
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Create Ticket
                  </CustomButton>
                </div>
              )}

              {!loading && !error && tickets.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        <CreateTicketModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateTicket}
        />
      </MainLayout>
    </AuthGuard>
  )
}

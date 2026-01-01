"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import MainLayout from "@/components/Layouts/MainLayout"
import AuthGuard from "@/components/AuthGuard"
import { useYouthHub } from "../../hooks/useYouthHub"
import YouthHubCard from "../../components/YouthHub/YouthHubCard"
import YouthHubDetailsModal from "../../components/YouthHub/YouthHubDetailsModal"
import { YouthHubResponse } from "../../../state/models/youthHub"
import { Loader2, Plus, Users, Lightbulb, Heart } from "lucide-react"
import Link from "next/link"
import CustomButton from "@/components/Buttons/CustomButton"

export default function YouthHubPage() {
  const {
    youthHubMessage,
    youthHubRequests,
    loading,
    loadingStates,
    error,
    refreshData,
  } = useYouthHub()
  const [selectedYouthHub, setSelectedYouthHub] = useState<YouthHubResponse | null>(null)

  const handleViewDetails = (youthHub: YouthHubResponse) => {
    setSelectedYouthHub(youthHub)
  }

  const handleCloseModal = () => {
    setSelectedYouthHub(null)
  }

  return (
    <AuthGuard>
      <MainLayout>
        <main className="min-h-screen bg-gray-50">
        {/* Hero Section with Background */}
        <div 
          className="relative bg-cover bg-center bg-no-repeat py-10"
          style={{
            backgroundImage: "url('/backgrounds/youth.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#052941]/90 to-[#041f30]/90" />
          <div className="relative z-10">
            <div className="container mx-auto px-4 text-center text-white sm:px-6 lg:px-8">
              <h1 className="mb-4 text-3xl font-bold lg:text-5xl">
                Youth <span className="text-[#80CAEE]">Hub</span>
              </h1>
              <p className="mx-auto mb-6 max-w-3xl text-lg">
                Community Startup Trade Centre - Where The Youth Meet & Share Ideas
              </p>
              
              {/* Youth Hub Message */}
              {youthHubMessage && (
                <div className="mx-auto max-w-4xl rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="space-y-2 text-center">
                    {youthHubMessage.message.map((message, index) => (
                      <p key={index} className="text-base leading-relaxed">
                        {message}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="group rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:border-[#052941] hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#052941] to-[#041f30]">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Connect with Youth
                </h3>
                <p className="text-sm text-gray-600">
                  Find other young entrepreneurs in your area and build meaningful connections.
                </p>
              </div>
              
              <div className="group rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:border-[#052941] hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#80CAEE] to-[#60AAD0]">
                  <Lightbulb className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Share Your Ideas
                </h3>
                <p className="text-sm text-gray-600">
                  Present your projects and find partners to bring your ideas to life.
                </p>
              </div>
              
              <div className="group rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:border-[#052941] hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Start Your Journey
                </h3>
                <p className="text-sm text-gray-600">
                  You don't need finances to start - begin where you are and grow together.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Youth Hub Projects Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
                  Youth Hub <span className="text-[#80CAEE]">Projects</span>
                </h2>
                <p className="text-base text-gray-600">
                  Discover projects from young entrepreneurs and find your next collaboration.
                </p>
              </div>
              
              <Link href="/youth-hub/create">
                <CustomButton
                  type="button"
                  variant="solid"
                  icon={<Plus className="h-5 w-5" />}
                  fullWidth={false}
                >
                  Add Your Project
                </CustomButton>
              </Link>
            </div>

            {loadingStates.requests && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-secondary" />
              </div>
            )}

            {!loadingStates.requests && error && (
              <div className="py-16 text-center text-red-500">{error}</div>
            )}

            {!loadingStates.requests && !error && youthHubRequests.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                  <Lightbulb className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  No Projects Yet
                </h3>
                <p className="mb-6 text-gray-600">
                  Be the first to share your project and inspire other young entrepreneurs!
                </p>
                <Link href="/youth-hub/create">
                  <CustomButton
                    type="button"
                    variant="solid"
                    icon={<Plus className="h-5 w-5" />}
                    fullWidth={false}
                  >
                    Add Your Project
                  </CustomButton>
                </Link>
              </div>
            )}

            {!loadingStates.requests && !error && youthHubRequests.length > 0 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {youthHubRequests.map((youthHub) => (
                  <YouthHubCard
                    key={youthHub.project_id}
                    youthHub={youthHub}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <YouthHubDetailsModal
        youthHub={selectedYouthHub}
        onClose={handleCloseModal}
      />
    </MainLayout>
    </AuthGuard>
  )
} 
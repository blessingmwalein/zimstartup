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
          className="relative bg-cover bg-center bg-no-repeat py-20"
          style={{
            backgroundImage: "url('/backgrounds/youth.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10">
            <div className="container mx-auto px-4 text-center text-white sm:px-6 lg:px-8">
              <h1 className="mb-6 text-4xl font-bold lg:text-6xl">
                Youth <span className="text-secondary">Hub</span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-xl">
                Community Startup Trade Centre - Where The Youth Meet & Share Ideas
              </p>
              
              {/* Youth Hub Message */}
              {youthHubMessage && (
                <div className="mx-auto max-w-4xl rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <div className="space-y-4 text-center">
                    {youthHubMessage.message.map((message, index) => (
                      <p key={index} className="text-lg leading-relaxed">
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
        <div className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#80CAEE]/20">
                  <Users className="h-8 w-8 text-[#80CAEE]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                  Connect with Youth
                </h3>
                <p className="text-bodydark2">
                  Find other young entrepreneurs in your area and build meaningful connections.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#80CAEE]/20">
                  <Lightbulb className="h-8 w-8 text-[#80CAEE]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                  Share Your Ideas
                </h3>
                <p className="text-bodydark2">
                  Present your projects and find partners to bring your ideas to life.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#80CAEE]/20">
                  <Heart className="h-8 w-8 text-[#80CAEE]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                  Start Your Journey
                </h3>
                <p className="text-bodydark2">
                  You don't need finances to start - begin where you are and grow together.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Youth Hub Projects Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
                  Youth Hub <span className="text-secondary">Projects</span>
                </h2>
                <p className="text-lg text-bodydark2">
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
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gray-100 dark:bg-boxdark-2" />
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                  No Projects Yet
                </h3>
                <p className="text-bodydark2">
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
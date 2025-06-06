"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Plus, Search, Building2 } from "lucide-react"

import DefaultLayout from "@/components/Layouts/DefaultLayout"
import UserCompanyCard from "@/components/Companies/UserCompanyCard"
import { fetchUserCompanies } from "../../../../state/slices/companySlice"
import { AppDispatch } from "../../../../state/store"
import { Button } from "@headlessui/react"
import CustomButton from "@/components/Buttons/CustomButton"
import { useRouter } from "next/navigation"// import { Button } from "@/components/ui/button"
// import type { AppDispatch } from "../../../state/store"
// import { fetchUserCompanies } from "../../../state/slices/companySlice"

const Companies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user } = useSelector((state: any) => state.auth)

  const { status, userCompanies } = useSelector((state: any) => state.company)

  const fetchCompanyList = async () => {
    try {
      await dispatch(fetchUserCompanies(user.national_id)).unwrap()
    } catch (err: any) {
      console.error("Error fetching companies:", err)
    }
  }

  useEffect(() => {
    fetchCompanyList()
  }, [])

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full">
        {/* Hero Section */}
        <section className="relative  px-8 py-8">
          <div className="relative z-10 flex flex-col items-center space-y-4 text-white">
            <h1 className="text-4xl font-bold text-black/80">Your Companies</h1>
            <p className="max-w-2xl text-center text-black">
              Manage all your registered companies and organizations in one place
            </p>

            <div className="flex w-full max-w-4xl items-center overflow-hidden rounded-full bg-white p-3 shadow-md">
              <div className="pl-4 pr-2 text-gray-500">
                <Search className="size-5" />
              </div>
              <input
                type="text"
                placeholder="Search your companies..."
                className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
              />
              <Button className="ml-2 px-8">Search</Button>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Companies</h2>
            {/* <Button className="gap-2">
              <Plus className="h-5 w-5" />
              Add New Company
            </Button> */}
            <div>
              <CustomButton
                onClick={() => router.push("/profile/companies/add-company")}
                type="button" variant="solid" isLoading={status === "loading"}>
                <Plus className="h-5 w-5" />
                Add New Company
              </CustomButton>
            </div>
          </div>

          {status === "loading" ? (
            <div className="flex h-60 items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          ) : userCompanies && userCompanies.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3">
              {userCompanies.map((company: any) => (
                <UserCompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <Building2 className="mb-4 h-16 w-16 text-slate-400" />
              <h3 className="mb-2 text-xl font-medium">No companies found</h3>
              <p className="mb-6 max-w-md text-slate-500">
                You haven't added any companies yet. Add your first company to get started.
              </p>
              {/* <Button className="gap-2">
                <Plus className="h-5 w-5" />
                Add Your First Company
              </Button> */}

              <CustomButton type="button" color="''" variant="outline" isLoading={status === "loading"}>
                <Plus className="h-5 w-5" />
                <span className="font-semibold">Add Your First Company</span>
              </CustomButton>
            </div>
          )}
        </main>
      </div>
    </DefaultLayout>
  )
}

export default Companies

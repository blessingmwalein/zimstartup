"use client"

import { Edit, Building2, Calendar, Users, MapPin, Globe, Mail, Phone, UserPlus, User } from "lucide-react"
import CustomButton from "./ui/custom-button"
import DirectorCard from "./director-card"

interface CompanyDirectorsProps {
    directorsData: any[]
    onEdit: () => void
    onAddDirector: () => void
    onViewEmployee: (employeeId: number) => void
}

export default function CompanyDirectors({
    directorsData,
    onEdit,
    onAddDirector,
    onViewEmployee
}: CompanyDirectorsProps) {
    return (
        <div className="space-y-6">

            {/* Company Directors */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Company Directors</h3>
                    <CustomButton type="button" variant="solid" icon={<UserPlus className="h-4 w-4" />} onClick={onAddDirector}>
                        Add Director
                    </CustomButton>
                </div>

                {directorsData.length === 0 ? (
                    <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
                        <div className="text-center text-gray-500">
                            <User className="mx-auto h-10 w-10" />
                            <p className="mt-2">No directors added yet</p>
                            <button onClick={onAddDirector} className="mt-2 text-[#001f3f] hover:underline">
                                Add your first director
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {directorsData.map((director, index) => (
                            <DirectorCard onEmployeeView={(employeeId) => onViewEmployee(employeeId)} key={index} director={director} />
                        ))}
                    </div>
                )}
            </div>


        </div>
    )
}

"use client"

import { Eye, UserPlus, User } from "lucide-react"
import CustomButton from "./ui/custom-button"

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
            <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Company Directors</h3>
                        <p className="mt-1 text-sm text-gray-500">View and manage company directors</p>
                    </div>
                    <CustomButton type="button" variant="solid" icon={<UserPlus className="h-4 w-4" />} onClick={onAddDirector}>
                        Add Director
                    </CustomButton>
                </div>

                {directorsData.length === 0 ? (
                    <div className="flex h-40 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
                        <div className="text-center text-gray-500">
                            <User className="mx-auto h-10 w-10" />
                            <p className="mt-2 font-medium">No directors added yet</p>
                            <button onClick={onAddDirector} className="mt-2 text-blue-600 hover:underline">
                                Add your first director
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {directorsData.map((director, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg cursor-pointer"
                                onClick={() => onViewEmployee(director.employee_id)}
                            >
                                <div className="p-6">
                                    {/* Director Avatar */}
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                                                {director.name?.charAt(0) || "D"}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{director.name}</h4>
                                                <p className="text-xs text-gray-500">{director.role || "Director"}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onViewEmployee(director.employee_id)
                                            }}
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 hover:scale-110"
                                            title="View Director"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Director Details */}
                                    <div className="space-y-2 text-sm">
                                        {director.position && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <span className="font-medium">Position:</span>
                                                <span>{director.position}</span>
                                            </div>
                                        )}
                                        {director.email && (
                                            <div className="flex items-center gap-2 text-gray-600 truncate">
                                                <span className="font-medium">Email:</span>
                                                <span className="truncate">{director.email}</span>
                                            </div>
                                        )}
                                        {director.nationality && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <span className="font-medium">Nationality:</span>
                                                <span>{director.nationality}</span>
                                            </div>
                                        )}
                                        {director.start_date && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <span className="font-medium">Since:</span>
                                                <span>{new Date(director.start_date).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

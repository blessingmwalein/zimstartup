"use client";

import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { 
  X, 
  Mail, 
  Calendar, 
  Globe, 
  User, 
  Heart, 
  Award, 
  Briefcase, 
  GraduationCap, 
  TrendingUp,
  Building2,
  Star,
  FileText,
  Clock,
  MapPin,
  Phone
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import { fetchEmployeeDetails, clearEmployeeData } from "@/state/thunks/employeeThunks";
import { selectCurrentEmployee, selectEmployeeLoading, selectEmployeeError } from "@/state/slices/employeeSlice";

interface Director {
  employee_id: number;
  title: string;
  first_name: string;
  last_name: string;
  dob: string;
  marital_status: string;
  email: string;
  nationality: string;
  employee_image: string | null;
}

interface DirectorDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  director: Director | null;
}

export default function DirectorDetailDrawer({
  isOpen,
  onClose,
  director,
}: DirectorDetailDrawerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const employeeDetails = useSelector(selectCurrentEmployee);
  const loading = useSelector(selectEmployeeLoading);
  const error = useSelector(selectEmployeeError);

  useEffect(() => {
    if (isOpen && director?.employee_id) {
      dispatch(fetchEmployeeDetails(director.employee_id));
    }
    
    return () => {
      if (!isOpen) {
        dispatch(clearEmployeeData());
      }
    };
  }, [isOpen, director?.employee_id, dispatch]);

  if (!director) return null;

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "N/A";
    try {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch {
      return "N/A";
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    if (!startDate) return "N/A";
    try {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date();
      const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      if (years > 0 && remainingMonths > 0) {
        return `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
      } else if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
      } else {
        return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
      }
    } catch {
      return "N/A";
    }
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#052941] to-[#041f30] px-6 py-8">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-bold text-white">
                          Employee Profile
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md text-white hover:text-gray-200 focus:outline-none"
                          onClick={onClose}
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>

                      {/* Profile Image/Initials */}
                      <div className="mt-6 flex justify-center">
                        {director.employee_image ? (
                          <img
                            src={director.employee_image}
                            alt={`${director.first_name} ${director.last_name}`}
                            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                          />
                        ) : (
                          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white shadow-lg">
                            {getInitials(
                              employeeDetails?.employee_data?.first_name || director.first_name,
                              employeeDetails?.employee_data?.last_name || director.last_name
                            )}
                          </div>
                        )}
                      </div>

                      {/* Name & Position */}
                      <div className="mt-4 text-center">
                        <h2 className="text-2xl font-bold text-white">
                          {employeeDetails?.employee_data?.title || director.title}{" "}
                          {employeeDetails?.employee_data?.first_name || director.first_name}{" "}
                          {employeeDetails?.employee_data?.last_name || director.last_name}
                        </h2>
                        {employeeDetails?.current_position_at_company && (
                          <div className="mt-2">
                            <p className="text-lg font-semibold text-blue-200">
                              {employeeDetails.current_position_at_company.position}
                            </p>
                            <p className="text-sm text-gray-300">
                              {employeeDetails.current_position_at_company.overall_position}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 py-6">
                      {error && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4">
                          <p className="text-sm text-red-600">Error: {error}</p>
                        </div>
                      )}

                      {loading ? (
                        <LoadingSkeleton />
                      ) : (
                        <div className="space-y-6">
                          {/* Personal Information */}
                          <div>
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                              <User className="mr-2 h-5 w-5 text-[#052941]" />
                              Personal Information
                            </h3>
                            <div className="space-y-3 rounded-lg bg-gradient-to-br from-gray-50 to-blue-50 p-4">
                              <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                                <span className="text-sm text-gray-600">Employee ID</span>
                                <span className="font-medium text-gray-900">
                                  #{employeeDetails?.employee_data?.employee_id || director.employee_id}
                                </span>
                              </div>
                              <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                                <span className="text-sm text-gray-600">Full Name</span>
                                <span className="font-medium text-gray-900">
                                  {employeeDetails?.employee_data?.title || director.title}{" "}
                                  {employeeDetails?.employee_data?.first_name || director.first_name}{" "}
                                  {employeeDetails?.employee_data?.last_name || director.last_name}
                                </span>
                              </div>
                              <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                                <span className="flex items-center text-sm text-gray-600">
                                  <Calendar className="mr-1 h-4 w-4" />
                                  Date of Birth
                                </span>
                                <span className="font-medium text-gray-900">
                                  {formatDate(employeeDetails?.employee_data?.dob || director.dob)}
                                </span>
                              </div>
                              <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                                <span className="text-sm text-gray-600">Age</span>
                                <span className="font-medium text-gray-900">
                                  {calculateAge(employeeDetails?.employee_data?.dob || director.dob)} years
                                </span>
                              </div>
                              <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                                <span className="flex items-center text-sm text-gray-600">
                                  <Heart className="mr-1 h-4 w-4" />
                                  Marital Status
                                </span>
                                <span className="font-medium text-gray-900">
                                  {employeeDetails?.employee_data?.marital_status || director.marital_status || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-start justify-between">
                                <span className="flex items-center text-sm text-gray-600">
                                  <Globe className="mr-1 h-4 w-4" />
                                  Nationality
                                </span>
                                <span className="font-medium text-gray-900">
                                  {employeeDetails?.employee_data?.nationality || director.nationality}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div>
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                              <Mail className="mr-2 h-5 w-5 text-[#052941]" />
                              Contact Information
                            </h3>
                            <div className="space-y-3 rounded-lg bg-gradient-to-br from-gray-50 to-green-50 p-4">
                              <div className="flex items-start justify-between">
                                <span className="flex items-center text-sm text-gray-600">
                                  <Mail className="mr-1 h-4 w-4" />
                                  Email
                                </span>
                                {employeeDetails?.employee_data?.email || director.email ? (
                                  <a
                                    href={`mailto:${employeeDetails?.employee_data?.email || director.email}`}
                                    className="font-medium text-[#052941] hover:text-[#041f30]"
                                  >
                                    {employeeDetails?.employee_data?.email || director.email}
                                  </a>
                                ) : (
                                  <span className="font-medium text-gray-400">Not provided</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Current Position */}
                          {employeeDetails?.current_position_at_company && (
                            <div>
                              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <Briefcase className="mr-2 h-5 w-5 text-[#052941]" />
                                Current Position
                              </h3>
                              <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-5 border border-blue-200">
                                <div className="mb-3 flex items-center justify-between">
                                  <div>
                                    <h4 className="text-xl font-bold text-gray-900">
                                      {employeeDetails.current_position_at_company.position}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {employeeDetails.current_position_at_company.overall_position}
                                    </p>
                                  </div>
                                  {employeeDetails.current_position_at_company.is_current && (
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                      Current
                                    </span>
                                  )}
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                  <div className="flex items-center text-gray-700">
                                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-xs text-gray-500">Start Date</p>
                                      <p className="font-medium">
                                        {formatDate(employeeDetails.current_position_at_company.start_date)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                    <TrendingUp className="mr-2 h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-xs text-gray-500">Duration</p>
                                      <p className="font-medium">
                                        {calculateDuration(
                                          employeeDetails.current_position_at_company.start_date,
                                          employeeDetails.current_position_at_company.is_current 
                                            ? "" 
                                            : employeeDetails.current_position_at_company.end_date
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Educational Qualifications */}
                          {employeeDetails?.educational_qualifications && 
                           employeeDetails.educational_qualifications.length > 0 && (
                            <div>
                              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <GraduationCap className="mr-2 h-5 w-5 text-[#052941]" />
                                Educational Qualifications
                              </h3>
                              <div className="space-y-3">
                                {employeeDetails.educational_qualifications.map((qual, index) => (
                                  <div
                                    key={qual.qualification_id || index}
                                    className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-4 border border-purple-200"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <h4 className="font-bold text-gray-900">
                                          {qual.education_type}
                                        </h4>
                                        <p className="text-sm font-medium text-gray-700 mt-1">
                                          {qual.field_of_study}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1 flex items-center">
                                          <Building2 className="mr-1 h-3 w-3" />
                                          {qual.institution}
                                        </p>
                                      </div>
                                      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                                        {qual.year_obtained}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Previous Employment History */}
                          {employeeDetails?.previous_employment_history && 
                           employeeDetails.previous_employment_history.length > 0 && (
                            <div>
                              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <FileText className="mr-2 h-5 w-5 text-[#052941]" />
                                Previous Employment
                              </h3>
                              <div className="space-y-3">
                                {employeeDetails.previous_employment_history.map((history, index) => (
                                  <div
                                    key={history.history_id || index}
                                    className="rounded-lg bg-gradient-to-br from-orange-50 to-yellow-50 p-4 border border-orange-200"
                                  >
                                    <div className="mb-3">
                                      <h4 className="font-bold text-gray-900">
                                        {history.position_history}
                                      </h4>
                                      <p className="text-sm font-medium text-gray-700 flex items-center mt-1">
                                        <Building2 className="mr-1 h-3 w-3" />
                                        {history.company_name}
                                      </p>
                                    </div>
                                    <div className="mb-3 flex items-center text-xs text-gray-600">
                                      <Calendar className="mr-1 h-3 w-3" />
                                      {formatDate(history.start_date_history)} - {formatDate(history.end_date_history)}
                                      <span className="ml-2 text-gray-500">
                                        ({calculateDuration(history.start_date_history, history.end_date_history)})
                                      </span>
                                    </div>
                                    {history.achievements && (
                                      <div className="mb-2 rounded bg-white/50 p-2">
                                        <p className="text-xs font-semibold text-gray-700">Achievements:</p>
                                        <p className="text-xs text-gray-600 mt-1">{history.achievements}</p>
                                      </div>
                                    )}
                                    {history.reason_for_leaving && (
                                      <div className="rounded bg-white/50 p-2">
                                        <p className="text-xs font-semibold text-gray-700">Reason for Leaving:</p>
                                        <p className="text-xs text-gray-600 mt-1">{history.reason_for_leaving}</p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Awards */}
                          {employeeDetails?.awards && employeeDetails.awards.length > 0 && (
                            <div>
                              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <Award className="mr-2 h-5 w-5 text-[#052941]" />
                                Awards & Recognition
                              </h3>
                              <div className="space-y-3">
                                {employeeDetails.awards.map((award, index) => (
                                  <div
                                    key={award.award_id || index}
                                    className="rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50 p-4 border border-yellow-200"
                                  >
                                    <div className="flex items-start">
                                      <Star className="mr-3 h-5 w-5 text-yellow-600 flex-shrink-0 mt-1" />
                                      <div className="flex-1">
                                        <h4 className="font-bold text-gray-900">
                                          {award.award_name}
                                        </h4>
                                        {award.award_date && (
                                          <p className="text-xs text-gray-600 mt-1">
                                            {formatDate(award.award_date)}
                                          </p>
                                        )}
                                        {award.award_description && (
                                          <p className="text-sm text-gray-700 mt-2">
                                            {award.award_description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Public Profile */}
                          {employeeDetails?.public_profile?.public_profile && (
                            <div>
                              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                                <Globe className="mr-2 h-5 w-5 text-[#052941]" />
                                Public Profile
                              </h3>
                              <div className="rounded-lg bg-gradient-to-br from-gray-50 to-slate-100 p-4 border border-gray-200">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {employeeDetails.public_profile.public_profile}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-lg bg-gradient-to-r from-[#052941] to-[#041f30] px-4 py-3 text-white transition-all hover:from-[#041f30] hover:to-[#052941] focus:outline-none focus:ring-2 focus:ring-[#052941] focus:ring-offset-2 font-semibold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

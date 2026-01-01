"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Mail, Phone, Calendar, Globe, User, Heart, Award } from "lucide-react";

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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="bg-[#052941] px-6 py-8">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-bold text-white">
                          Director Details
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
                          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-[#052941] text-4xl font-bold text-white shadow-lg">
                            {getInitials(director.first_name, director.last_name)}
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <div className="mt-4 text-center">
                        <h2 className="text-2xl font-bold text-white">
                          {director.title} {director.first_name} {director.last_name}
                        </h2>
                        <p className="mt-1 text-gray-200">Director</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 py-6">
                      <div className="space-y-6">
                        {/* Personal Information */}
                        <div>
                          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                            <User className="mr-2 h-5 w-5 text-[#052941]" />
                            Personal Information
                          </h3>
                          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                              <span className="text-sm text-gray-600">Employee ID</span>
                              <span className="font-medium text-gray-900">
                                #{director.employee_id}
                              </span>
                            </div>
                            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                              <span className="text-sm text-gray-600">Title</span>
                              <span className="font-medium text-gray-900">
                                {director.title}
                              </span>
                            </div>
                            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                              <span className="text-sm text-gray-600">Full Name</span>
                              <span className="font-medium text-gray-900">
                                {director.first_name} {director.last_name}
                              </span>
                            </div>
                            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                              <span className="flex items-center text-sm text-gray-600">
                                <Calendar className="mr-1 h-4 w-4" />
                                Date of Birth
                              </span>
                              <span className="font-medium text-gray-900">
                                {formatDate(director.dob)}
                              </span>
                            </div>
                            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                              <span className="text-sm text-gray-600">Age</span>
                              <span className="font-medium text-gray-900">
                                {calculateAge(director.dob)} years
                              </span>
                            </div>
                            <div className="flex items-start justify-between border-b border-gray-200 pb-3">
                              <span className="flex items-center text-sm text-gray-600">
                                <Heart className="mr-1 h-4 w-4" />
                                Marital Status
                              </span>
                              <span className="font-medium text-gray-900">
                                {director.marital_status || "N/A"}
                              </span>
                            </div>
                            <div className="flex items-start justify-between">
                              <span className="flex items-center text-sm text-gray-600">
                                <Globe className="mr-1 h-4 w-4" />
                                Nationality
                              </span>
                              <span className="font-medium text-gray-900">
                                {director.nationality}
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
                          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                            <div className="flex items-start justify-between">
                              <span className="flex items-center text-sm text-gray-600">
                                <Mail className="mr-1 h-4 w-4" />
                                Email
                              </span>
                              {director.email ? (
                                <a
                                  href={`mailto:${director.email}`}
                                  className="font-medium text-[#052941] hover:text-[#041f30]"
                                >
                                  {director.email}
                                </a>
                              ) : (
                                <span className="font-medium text-gray-400">Not provided</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Additional Details */}
                        <div>
                          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                            <Award className="mr-2 h-5 w-5 text-[#052941]" />
                            Role & Position
                          </h3>
                          <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-700">
                              Serving as a Director of the company, responsible for strategic
                              decision-making and governance oversight.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-lg bg-[#052941] px-4 py-2 text-white transition-all hover:bg-[#041f30] focus:outline-none focus:ring-2 focus:ring-[#052941] focus:ring-offset-2"
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

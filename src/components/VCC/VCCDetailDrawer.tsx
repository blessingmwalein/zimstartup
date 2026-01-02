"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { 
  X, 
  Calendar, 
  MapPin, 
  Trophy, 
  Plus,
  Mail,
  Phone,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  User,
  Building2
} from "lucide-react";
import CustomButton from "../Buttons/CustomButton";
import CreateCompetitionModal from "./CreateCompetitionModal";

interface VCCDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vcc: any;
}

export default function VCCDetailDrawer({
  isOpen,
  onClose,
  vcc,
}: VCCDetailDrawerProps) {
  const [isCompetitionModalOpen, setIsCompetitionModalOpen] = useState(false);

  if (!vcc) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <>
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
                      {/* Header with Banner */}
                      <div className="relative">
                        {vcc.banner_url ? (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={vcc.banner_url}
                              alt={vcc.vcc_name}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        ) : (
                          <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <Trophy className="h-24 w-24 text-white opacity-50" />
                          </div>
                        )}
                        
                        <button
                          type="button"
                          className="absolute top-4 right-4 rounded-full bg-white/90 p-2 text-gray-900 hover:bg-white focus:outline-none"
                          onClick={onClose}
                        >
                          <X className="h-5 w-5" />
                        </button>

                        <div className="absolute -bottom-12 left-6">
                          {vcc.logo_path ? (
                            <img
                              src={vcc.logo_path}
                              alt={`${vcc.vcc_name} logo`}
                              className="h-24 w-24 rounded-lg border-4 border-white bg-white object-cover shadow-lg"
                            />
                          ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                              <Trophy className="h-12 w-12 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 px-6 pt-16 pb-6">
                        <div className="space-y-6">
                          {/* Title and Status */}
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                              {vcc.title || vcc.vcc_name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-3">
                              {vcc.vcc_abbreviations}
                            </p>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                              vcc.status === "OPEN" || vcc.vcc_status === "OPEN"
                                ? "bg-green-100 text-green-800"
                                : vcc.status === "CLOSED" || vcc.vcc_status === "CLOSED"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {vcc.status || vcc.vcc_status}
                            </span>
                          </div>

                          {/* Description */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                            <p className="text-gray-700 leading-relaxed">
                              {vcc.description || vcc.vcc_short_description || "No description available"}
                            </p>
                          </div>

                          {/* Timeline */}
                          {vcc.start_date && (
                            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                                Timeline
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-gray-600">Start Date</p>
                                  <p className="text-sm font-medium text-gray-900">{formatDate(vcc.start_date)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">End Date</p>
                                  <p className="text-sm font-medium text-gray-900">{formatDate(vcc.end_date)}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Region */}
                          {vcc.region && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{vcc.region}</span>
                            </div>
                          )}

                          {/* Contact Information */}
                          {(vcc.contact_person || vcc.email || vcc.phone_number) && (
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                                {vcc.contact_person && (
                                  <div className="flex items-center text-sm">
                                    <User className="h-4 w-4 mr-2 text-gray-400" />
                                    <span className="text-gray-700">{vcc.contact_person}</span>
                                  </div>
                                )}
                                {vcc.email && (
                                  <div className="flex items-center text-sm">
                                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                    <a href={`mailto:${vcc.email}`} className="text-blue-600 hover:text-blue-800">
                                      {vcc.email}
                                    </a>
                                  </div>
                                )}
                                {vcc.phone_number && (
                                  <div className="flex items-center text-sm">
                                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                    <a href={`tel:${vcc.phone_number}`} className="text-blue-600 hover:text-blue-800">
                                      {vcc.phone_number}
                                    </a>
                                  </div>
                                )}
                                {vcc.address && (
                                  <div className="flex items-center text-sm">
                                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                                    <span className="text-gray-700">{vcc.address}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Social Media */}
                          {(vcc.instagram || vcc.linkedin || vcc.twitter) && (
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">Social Media</h3>
                              <div className="flex gap-3">
                                {vcc.instagram && (
                                  <a
                                    href={vcc.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                                  >
                                    <Instagram className="h-5 w-5" />
                                  </a>
                                )}
                                {vcc.linkedin && (
                                  <a
                                    href={vcc.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                  >
                                    <Linkedin className="h-5 w-5" />
                                  </a>
                                )}
                                {vcc.twitter && (
                                  <a
                                    href={vcc.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition-colors"
                                  >
                                    <Twitter className="h-5 w-5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Create Competition Button */}
                          <div className="pt-4 border-t border-gray-200">
                            <CustomButton
                              type="button"
                              variant="solid"
                              onClick={() => setIsCompetitionModalOpen(true)}
                              className="w-full"
                            >
                              <Plus className="h-5 w-5 mr-2" />
                              Create Competition
                            </CustomButton>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
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

      {/* Create Competition Modal */}
      <CreateCompetitionModal
        isOpen={isCompetitionModalOpen}
        onClose={() => setIsCompetitionModalOpen(false)}
        vccId={vcc?.vcc_id}
        vccName={vcc?.vcc_name || vcc?.title}
      />
    </>
  );
}

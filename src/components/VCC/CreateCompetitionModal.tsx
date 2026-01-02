"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Trophy, Calendar, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import { createCompetition } from "@/state/thunks/vccThunks";
import { selectCreatingCompetition } from "@/state/slices/vccSlice";
import CustomButton from "../Buttons/CustomButton";
import { toast } from "react-toastify";

interface CreateCompetitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  vccId: number;
  vccName: string;
}

export default function CreateCompetitionModal({
  isOpen,
  onClose,
  vccId,
  vccName,
}: CreateCompetitionModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const creating = useSelector(selectCreatingCompetition);

  const [formData, setFormData] = useState({
    competition_name: "",
    competition_category: "",
    competition_description: "",
    start_date: "",
    end_date: "",
    max_participants: "",
    min_participants: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const competitionData = {
      vcc_id: vccId,
      competition_name: formData.competition_name,
      competition_category: formData.competition_category,
      competition_description: formData.competition_description,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      max_participants: parseInt(formData.max_participants) || 0,
      min_participants: parseInt(formData.min_participants) || 0,
    };

    const result = await dispatch(createCompetition(competitionData));
    
    if (result.success) {
      toast.success("Competition created successfully!");
      setFormData({
        competition_name: "",
        competition_category: "",
        competition_description: "",
        start_date: "",
        end_date: "",
        max_participants: "",
        min_participants: "",
      });
      onClose();
    } else {
      toast.error(result.error || "Failed to create competition");
    }
  };

  const handleClose = () => {
    if (!creating) {
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#052941] to-[#041f30] px-6 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-white/10 p-2">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Dialog.Title className="text-xl font-bold text-white">
                          Create New Competition
                        </Dialog.Title>
                        <p className="text-sm text-gray-300 mt-1">for {vccName}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rounded-md text-white hover:text-gray-200 focus:outline-none"
                      onClick={handleClose}
                      disabled={creating}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-4">
                    {/* Competition Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Competition Name *
                      </label>
                      <input
                        type="text"
                        name="competition_name"
                        value={formData.competition_name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter competition name"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <input
                        type="text"
                        name="competition_category"
                        value={formData.competition_category}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Technology, Healthcare, Agriculture"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        name="competition_description"
                        value={formData.competition_description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe the competition..."
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date *
                        </label>
                        <input
                          type="datetime-local"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date *
                        </label>
                        <input
                          type="datetime-local"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Min Participants
                        </label>
                        <input
                          type="number"
                          name="min_participants"
                          value={formData.min_participants}
                          onChange={handleChange}
                          min="0"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max Participants
                        </label>
                        <input
                          type="number"
                          name="max_participants"
                          value={formData.max_participants}
                          onChange={handleChange}
                          min="0"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0 (unlimited)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={creating}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <CustomButton
                      type="submit"
                      variant="solid"
                      disabled={creating}
                      className="flex-1"
                    >
                      {creating ? "Creating..." : "Create Competition"}
                    </CustomButton>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

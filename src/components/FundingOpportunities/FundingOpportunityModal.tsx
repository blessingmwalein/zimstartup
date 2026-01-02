'use client';

import React, { useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X } from 'lucide-react';

interface FundingOpportunityFormData {
  agency_name: string;
  funding_or_competition: string;
  closing_date: string;
  sector?: string;
  location?: string;
  description?: string;
  eligibility?: string;
  application_link?: string;
  is_active: boolean;
}

interface FundingOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FundingOpportunityFormData) => Promise<void>;
  initialData?: any;
}

const schema = yup.object().shape({
  agency_name: yup.string().required('Agency name is required'),
  funding_or_competition: yup.string().required('Funding/Competition name is required'),
  closing_date: yup.string().required('Closing date is required'),
  sector: yup.string(),
  location: yup.string(),
  description: yup.string(),
  eligibility: yup.string(),
  application_link: yup.string().url('Must be a valid URL'),
  is_active: yup.boolean(),
});

export default function FundingOpportunityModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: FundingOpportunityModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FundingOpportunityFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      agency_name: '',
      funding_or_competition: '',
      closing_date: '',
      sector: '',
      location: '',
      description: '',
      eligibility: '',
      application_link: '',
      is_active: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      // Format date for input field (YYYY-MM-DD)
      const formattedDate = initialData.closing_date
        ? new Date(initialData.closing_date).toISOString().split('T')[0]
        : '';
      
      reset({
        agency_name: initialData.agency_name || '',
        funding_or_competition: initialData.funding_or_competition || '',
        closing_date: formattedDate,
        sector: initialData.sector || '',
        location: initialData.location || '',
        description: initialData.description || '',
        eligibility: initialData.eligibility || '',
        application_link: initialData.application_link || '',
        is_active: initialData.is_active ?? true,
      });
    } else {
      reset({
        agency_name: '',
        funding_or_competition: '',
        closing_date: '',
        sector: '',
        location: '',
        description: '',
        eligibility: '',
        application_link: '',
        is_active: true,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: FundingOpportunityFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-boxdark">
                <div className="mb-4 flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-black dark:text-white">
                    {initialData ? 'Edit Funding Opportunity' : 'Add Funding Opportunity'}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-meta-4"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                  {/* Agency Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Agency Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register('agency_name')}
                      type="text"
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="e.g., Innovation Fund"
                    />
                    {errors.agency_name && (
                      <p className="mt-1 text-sm text-red-500">{errors.agency_name.message}</p>
                    )}
                  </div>

                  {/* Funding/Competition Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Funding/Competition Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register('funding_or_competition')}
                      type="text"
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="e.g., Startup Accelerator Program 2024"
                    />
                    {errors.funding_or_competition && (
                      <p className="mt-1 text-sm text-red-500">{errors.funding_or_competition.message}</p>
                    )}
                  </div>

                  {/* Closing Date */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Closing Date <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register('closing_date')}
                      type="date"
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.closing_date && (
                      <p className="mt-1 text-sm text-red-500">{errors.closing_date.message}</p>
                    )}
                  </div>

                  {/* Sector and Location */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Sector
                      </label>
                      <input
                        {...register('sector')}
                        type="text"
                        className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="e.g., Technology, Agriculture"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Location
                      </label>
                      <input
                        {...register('location')}
                        type="text"
                        className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="e.g., Zimbabwe, Africa"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      {...register('description')}
                      rows={3}
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Brief description of the funding opportunity..."
                    />
                  </div>

                  {/* Eligibility */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Eligibility Criteria
                    </label>
                    <textarea
                      {...register('eligibility')}
                      rows={2}
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Who is eligible to apply..."
                    />
                  </div>

                  {/* Application Link */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Application Link
                    </label>
                    <input
                      {...register('application_link')}
                      type="url"
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="https://example.com/apply"
                    />
                    {errors.application_link && (
                      <p className="mt-1 text-sm text-red-500">{errors.application_link.message}</p>
                    )}
                  </div>

                  {/* Is Active */}
                  <div className="flex items-center">
                    <input
                      {...register('is_active')}
                      type="checkbox"
                      className="h-5 w-5 rounded border-stroke text-primary focus:ring-2 focus:ring-primary dark:border-form-strokedark"
                    />
                    <label className="ml-2 text-sm font-medium text-black dark:text-white">
                      Active
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 rounded-lg border border-stroke px-6 py-3 font-medium text-black hover:bg-gray-100 dark:border-strokedark dark:text-white dark:hover:bg-meta-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Create'}
                    </button>
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

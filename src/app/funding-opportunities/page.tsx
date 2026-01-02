'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/state/store';
import { fetchFundingOpportunities, createOpportunity, updateOpportunity, deleteOpportunity } from '@/state/thunks/fundingOpportunitiesThunks';
import FundingOpportunityModal from '@/components/FundingOpportunities/FundingOpportunityModal';
import { Briefcase, Calendar, MapPin, ExternalLink, Plus, Edit, Trash2, Search } from 'lucide-react';
import AuthLayout from '@/components/Layouts/AuthLayout';
import MainLayout from '@/components/Layouts/MainLayout';

export default function FundingOpportunitiesPage() {
  const dispatch = useAppDispatch();
  const { opportunities, loading, error } = useAppSelector((state) => state.fundingOpportunities);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'closed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchFundingOpportunities(false));
  }, [dispatch]);

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.agency_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.funding_or_competition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.sector?.toLowerCase().includes(searchTerm.toLowerCase());

    const now = new Date();
    const closingDate = new Date(opp.closing_date);
    const isActive = opp.is_active && closingDate >= now;

    if (statusFilter === 'active') return matchesSearch && isActive;
    if (statusFilter === 'closed') return matchesSearch && !isActive;
    return matchesSearch;
  });

  const activeCount = opportunities.filter((opp) => {
    const now = new Date();
    const closingDate = new Date(opp.closing_date);
    return opp.is_active && closingDate >= now;
  }).length;

  const handleCreate = async (data: any) => {
    try {
      const result = await dispatch(createOpportunity(data)).unwrap();
      if (result.success) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating opportunity:', error);
    }
  };

  const handleUpdate = async (data: any) => {
    if (editingOpportunity) {
      try {
        const result = await dispatch(updateOpportunity({ id: editingOpportunity.id, data })).unwrap();
        if (result.success) {
          setIsModalOpen(false);
          setEditingOpportunity(null);
        }
      } catch (error) {
        console.error('Error updating opportunity:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this funding opportunity?')) {
      await dispatch(deleteOpportunity(id));
    }
  };

  const handleEdit = (opportunity: any) => {
    setEditingOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOpportunity(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const pageContent = (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Funding Opportunities</h1>
              <p className="text-gray-600">
                Discover funding opportunities and competitions for startups and entrepreneurs
              </p>
            </div>
            {isAuthenticated && user?.role === 'admin' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Opportunity
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-white border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Opportunities</p>
                <p className="text-2xl font-bold text-gray-900">{opportunities.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="rounded-lg bg-white border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Opportunities</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="rounded-lg bg-white border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-red-600">{opportunities.length - activeCount}</p>
              </div>
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Opportunities Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-600">Error loading opportunities: {error}</p>
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Opportunities Found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all'
                ? 'No opportunities match your search criteria.'
                : 'No funding opportunities available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((opportunity) => {
              const now = new Date();
              const closingDate = new Date(opportunity.closing_date);
              const isActive = opportunity.is_active && closingDate >= now;
              const daysLeft = Math.ceil((closingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

              return (
                <div
                  key={opportunity.id}
                  className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{opportunity.agency_name}</h3>
                        <p className="mt-1 text-sm text-blue-600">{opportunity.funding_or_competition}</p>
                      </div>
                      <span
                        className={`ml-2 rounded-full px-3 py-1 text-xs font-medium border ${
                          isActive
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}
                      >
                        {isActive ? 'Active' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 py-4">
                    <div className="mb-4 space-y-2 text-sm">
                      {opportunity.sector && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{opportunity.sector}</span>
                        </div>
                      )}
                      {opportunity.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{opportunity.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          Closes: {formatDate(opportunity.closing_date)}
                          {isActive && daysLeft > 0 && (
                            <span className="ml-2 text-xs text-yellow-600">({daysLeft} days left)</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {opportunity.description && (
                      <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                        {opportunity.description}
                      </p>
                    )}

                    {opportunity.eligibility && (
                      <div className="mb-4">
                        <p className="mb-1 text-xs font-medium text-gray-500">Eligibility:</p>
                        <p className="line-clamp-2 text-xs text-gray-600">{opportunity.eligibility}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {opportunity.application_link && (
                        <a
                          href={opportunity.application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Apply Now
                        </a>
                      )}
                      {isAuthenticated && user?.role === 'admin' && (
                        <>
                          <button
                            onClick={() => handleEdit(opportunity)}
                            className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(opportunity.id)}
                            className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <FundingOpportunityModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={editingOpportunity ? handleUpdate : handleCreate}
            initialData={editingOpportunity}
          />
        )}
      </div>
    </div>
  );

  // Wrap in appropriate layout based on authentication
  if (isAuthenticated) {
    return <MainLayout>{pageContent}</MainLayout>;
  }

  return <AuthLayout>{pageContent}</AuthLayout>;
}

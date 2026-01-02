"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import MainLayout from "@/components/Layouts/MainLayout";
import { 
  Plus, 
  Search, 
  Filter, 
  Trophy, 
  Calendar, 
  MapPin,
  Users,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { fetchAllVCCs } from "@/state/thunks/vccThunks";
import { 
  selectVCCList, 
  selectVCCLoading, 
  selectVCCError 
} from "@/state/slices/vccSlice";
import CustomButton from "@/components/Buttons/CustomButton";
import Link from "next/link";
import VCCDetailDrawer from "@/components/VCC/VCCDetailDrawer";

export default function VCCPage() {
  const dispatch = useDispatch<AppDispatch>();
  const vccList = useSelector(selectVCCList);
  const loading = useSelector(selectVCCLoading);
  const error = useSelector(selectVCCError);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedVCC, setSelectedVCC] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllVCCs());
  }, [dispatch]);

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      OPEN: "bg-green-100 text-green-800 border-green-200",
      CLOSED: "bg-red-100 text-red-800 border-red-200",
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "PENDING CHECK": "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    
    const statusIcons = {
      OPEN: <CheckCircle className="h-3 w-3" />,
      CLOSED: <XCircle className="h-3 w-3" />,
      PENDING: <Clock className="h-3 w-3" />,
      "PENDING CHECK": <Clock className="h-3 w-3" />,
    };
    
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}>
        {statusIcons[status as keyof typeof statusIcons]}
        {status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const filteredVCCs = vccList.filter((vcc) => {
    const matchesSearch = vcc.vcc_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vcc.vcc_abbreviations?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || vcc.vcc_status === statusFilter || vcc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (vcc: any) => {
    setSelectedVCC(vcc);
    setIsDrawerOpen(true);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Value Creation Challenges
                </h1>
                <p className="text-gray-600">
                  Manage your VCC competitions and create new opportunities
                </p>
              </div>
              <Link href="/vcc/create">
                <CustomButton type="button" variant="solid">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New VCC
                </CustomButton>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search VCC by name or abbreviation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Status</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
                <option value="PENDING">Pending</option>
                <option value="PENDING CHECK">Pending Check</option>
              </select>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total VCCs</p>
                  <p className="text-2xl font-bold text-gray-900">{vccList.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="rounded-lg bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open</p>
                  <p className="text-2xl font-bold text-green-600">
                    {vccList.filter(v => v.status === "OPEN" || v.vcc_status === "OPEN").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="rounded-lg bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Closed</p>
                  <p className="text-2xl font-bold text-red-600">
                    {vccList.filter(v => v.status === "CLOSED" || v.vcc_status === "CLOSED").length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="rounded-lg bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {vccList.filter(v => v.status === "PENDING" || v.vcc_status === "PENDING" || v.vcc_status === "PENDING CHECK").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* VCC Grid */}
          {loading ? (
            <LoadingSkeleton />
          ) : filteredVCCs.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
              <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No VCCs Found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || statusFilter !== "ALL" 
                  ? "No VCCs match your search criteria."
                  : "You haven't created any VCCs yet. Get started by creating your first VCC!"}
              </p>
              {!searchQuery && statusFilter === "ALL" && (
                <Link href="/vcc/create">
                  <CustomButton type="button" variant="solid">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First VCC
                  </CustomButton>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVCCs.map((vcc) => (
                <div
                  key={vcc.vcc_id}
                  className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
                >
                  {/* Banner Image */}
                  <div className="relative h-40 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
                    {vcc.banner_url ? (
                      <img
                        src={vcc.banner_url}
                        alt={vcc.vcc_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Trophy className="h-16 w-16 text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(vcc.status || vcc.vcc_status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                          {vcc.title || vcc.vcc_name}
                        </h3>
                        {vcc.is_featured && (
                          <span className="text-yellow-500">
                            <Trophy className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        {vcc.vcc_abbreviations}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {vcc.description || vcc.vcc_short_description || "No description available"}
                    </p>

                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      {vcc.start_date && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{formatDate(vcc.start_date)} - {formatDate(vcc.end_date)}</span>
                        </div>
                      )}
                      {vcc.region && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{vcc.region}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleViewDetails(vcc)}
                      className="w-full rounded-lg bg-gradient-to-r from-[#052941] to-[#041f30] px-4 py-2 text-sm font-semibold text-white transition-all hover:from-[#041f30] hover:to-[#052941] focus:outline-none focus:ring-2 focus:ring-[#052941] focus:ring-offset-2"
                    >
                      <Eye className="h-4 w-4 inline mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* VCC Detail Drawer */}
      <VCCDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        vcc={selectedVCC}
      />
    </MainLayout>
  );
}

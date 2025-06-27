"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/Layouts/MainLayout";
import { useCompetitions } from "../../hooks/useCompetitions";
import CompetitionCard from "../../components/Competitions/CompetitionCard";
import CompetitionDetailsModal from "../../components/Competitions/CompetitionDetailsModal";
import { Competition } from "../../../state/models/competitions";
import { Loader2 } from "lucide-react";
import CompetitionSearchInput from "@/components/FormElements/SearchInput/CompetitionSearchInput";

export default function CompetitionsPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const {
    competitions,
    loading,
    error,
    getCompetitions,
    searchForCompetitions,
  } = useCompetitions();
  const [selectedCompetition, setSelectedCompetition] =
    useState<Competition | null>(null);
  const router = useRouter();

  useEffect(() => {
    getCompetitions();
  }, []);

//   useEffect(() => {
//     const debounceSearch = setTimeout(() => {
//       searchForCompetitions({ query, location });
//     }, 300);

//     return () => clearTimeout(debounceSearch);
//   }, [query, location]);

  const handleViewDetails = (competition: Competition) => {
    setSelectedCompetition(competition);
  };

  const handleCloseModal = () => {
    setSelectedCompetition(null);
  };

  const handleJoinCompetition = (competition: Competition) => {
    router.push(`/competitions/join/${competition.competition_id}`);
  };

  return (
    <MainLayout>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4  font-semibold text-black/80 lg:text-[60px]">
              Startup <span className="text-secondary">Competitions</span>
            </h1>
            <p className="mb-8 mt-12 text-[25px]">
              Discover and join the most exciting startup competitions.
            </p>
          </div>

          {/* <div className="mx-auto mb-12 max-w-xl"> */}
            <CompetitionSearchInput
              query={query}
              setQuery={setQuery}
              location={location}
              setLocation={setLocation}
              suggestions={competitions}
              loading={loading}
              onCompetitionSelect={handleJoinCompetition}
              error={error || ""}
              label="Search competitions"
            />
          {/* </div> */}

          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-secondary" />
            </div>
          )}

          {!loading && error && (
            <div className="py-16 text-center text-red-500">{error}</div>
          )}

          {!loading && !error && (
            <div className=" mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {competitions.map((competition) => (
                <CompetitionCard
                  key={competition.competition_id}
                  competition={competition}
                  onViewDetails={handleViewDetails}
                  onJoin={handleJoinCompetition}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <CompetitionDetailsModal
        competition={selectedCompetition}
        onClose={handleCloseModal}
        onJoin={handleJoinCompetition}
      />
    </MainLayout>
  );
}

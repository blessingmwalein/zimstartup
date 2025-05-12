"use client";

import UserCompaniesDialogue from "@/components/competitions/UserCompaniesDialogue";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchInput from "@/components/material/SearchInput/index";

const Client = ({ competitions, session }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const [selectedCompetitionDescription, setSelectedCompetitionDescription] = useState(null);
  const [competition, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCompetitions, setExpandedCompetitions] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    if (!competitions || competitions.length === 0) {
      setLoading(true);
    } else {
      setCompetitions(competitions);
      setLoading(false);
    }
  }, [competitions]);

  useEffect(() => {
    if (query) {
      setLoadingSearch(true);
      // Implement search logic here to update suggestions based on the query
      // _onSearchCompanies(session, query).then(({ success, data }) => {
      //   if (success) {
      //     setSuggestions(data);
      //   }
      //   setLoadingSearch(false);
      // });
    } else {
      setSuggestions([]);
    }
  }, [query, session]);

  const handleJoinCompetition = (competitionId, selectedCompetitionDescription) => {
    setSelectedCompetitionId(competitionId);
    setSelectedCompetitionDescription(selectedCompetitionDescription);
    setIsDialogOpen(true);
  };

  const toggleDescription = (competitionId) => {
    setExpandedCompetitions((prev) => ({
      ...prev,
      [competitionId]: !prev[competitionId],
    }));
  };

  const truncateDescription = (description) => {
    if (description.length > 560) {
      return {
        text: description.slice(0, 560) + '...',
        isTruncated: true,
      };
    }
    return { text: description, isTruncated: false };
  };

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto px-2 md:px-9 py-[10vh] text-center">
        <h1 className="lg:text-[50px] mb-4">
          Welcome to the <span className="text-secondary">Competitions</span>
        </h1>
        <p className="text-[20px] mb-6">
          An Entrepreneur City shaped by the youth and Community.
        </p>

        <SearchInput
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          loading={loadingSearch}
          label={'competitions'}
          // onCompanySelect={handleJoinCompetition}
        />

        <div className="mx-4 my-[120px]">
          <div className="w-full mb-20 md:mx-0 md:my-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loading
                ? [1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-3xl shadow-xl animate-pulse bg-gray-200">
                      <div className="relative h-[400px] w-[300px] mb-4 bg-gray-300" />
                    </div>
                  ))
                : competition.map((competition) => {
                    const { text, isTruncated } = truncateDescription(competition.competition_description);
                    const isExpanded = expandedCompetitions[competition.competition_id];

                    return (
                      <div
                        key={competition.competition_id}
                        className="p-7 md:p-6 rounded-2xl shadow-xl hover:shadow-xl transition-shadow duration-300 bg-white mb-6">
                        <div>
                          <div className="relative h-32 w-full mb-8 md:mb-6">
                            <Image
                              src={`/${competition.vcc_logo}`}
                              alt={competition.vcc_name}
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                          <h3 className="text-lg md:text-xl font-semibold text-center mb-4">
                            {competition.competition_name}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 text-center mb-3">
                            {competition.vcc_name}
                          </p>
                          <p className="text-sm text-gray-500 mb-5">
                            {isExpanded ? competition.competition_description : text}
                            {isTruncated && (
                              <span className="text-[#BDE038] cursor-pointer ml-2" onClick={() => toggleDescription(competition.competition_id)}>
                                {isExpanded ? "Show less" : "Read more"}
                              </span>
                            )}
                          </p>
                          <div className="mt-4 mb-4 flex justify-between">
                            <p className="text-sm text-gray-500">
                              Starts on:{" "}
                              <span className="text-black font-bold text-[14px]">
                                {competition.start_date}
                              </span>
                            </p>
                            <p className="text-sm text-gray-500">
                              Ends on:{" "}
                              <span className="text-black font-bold text-[14px]">
                                {competition.end_date}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="max-w-fit flex flex-initial">
                          <button
                            onClick={() =>
                              handleJoinCompetition(competition.competition_id, competition.competition_description)
                            }
                            className="w-full py-2 px-6 bg-[#BDE038] font-[600] text-[14px] text-black rounded-2xl hover:opacity-80">
                            Join Competition
                          </button>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
        <UserCompaniesDialogue
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          competitionId={selectedCompetitionId}
          competition_description={selectedCompetitionDescription}
        />
      </div>
    </div>
  );
};

export default Client;
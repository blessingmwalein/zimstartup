"use client";

import Image from "next/image";
import { Search, X, Loader2, ChevronDown } from "lucide-react";
import { classNames } from "@/util/other";
import { Competition } from "../../../../state/models/competitions";
import { useState } from "react";

interface CompetitionSearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  suggestions: Competition[];
  loading: boolean;
  onCompetitionSelect: (competition: Competition) => void;
  error?: string;
  label?: string;
}

const locations = ["Harare", "Bulawayo", "Mutare", "Gweru", "Online"]; // Placeholder

const CompetitionSearchInput: React.FC<CompetitionSearchInputProps> = ({
  query,
  setQuery,
  location,
  setLocation,
  suggestions,
  loading,
  onCompetitionSelect,
  error,
  label = "competition",
}) => {
  const [showLocations, setShowLocations] = useState(false);
  const clearInput = () => setQuery("");

  return (
    <div
      className={classNames(
        "relative mx-auto w-[75%] items-center justify-center",
        Boolean(suggestions.length) && (query || location) ? "z-10" : "",
      )}
    >
      <div
        className="w-full justify-center rounded-full border-2 bg-white px-4 py-2 shadow-2"
        style={
          Boolean(suggestions.length) && (query || location)
            ? {
                position: "absolute",
                top: 0,
                borderRadius: "7px",
              }
            : {}
        }
      >
        <div className="flex items-center divide-x-2">
          <div className="flex flex-1 items-center">
            <Search className="m-4 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder={`Search for ${label} by name`}
              className="flex-1 border-none px-4 py-2 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={`Search for ${label}`}
            />
            {loading ? (
              <div className="flex h-10 w-10 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              </div>
            ) : query ? (
              <button
                className="m-2 rounded-full bg-transparent p-2 text-gray-500 hover:bg-gray-200"
                onClick={clearInput}
                aria-label="Clear input"
              >
                <X className="h-5 w-5" />
              </button>
            ) : null}
          </div>
          <div className="relative flex-1">
            <button
              className="flex w-full items-center justify-between px-4 py-2 text-left"
              onClick={() => setShowLocations(!showLocations)}
            >
              <span>{location || "Select Location"}</span>
              <ChevronDown className="h-5 w-5" />
            </button>
            {showLocations && (
              <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setLocation(loc);
                      setShowLocations(false);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className={classNames(
            "w-full rounded-[10px] bg-white",
            Boolean(suggestions.length) && (query || location)
              ? "h-[40vh] overflow-y-auto"
              : "",
          )}
        >
          {(query || location) &&
            suggestions.map((competition) => (
              <div
                key={competition.competition_id}
                onClick={() => onCompetitionSelect(competition)}
                className="flex w-full cursor-pointer py-[10px] pl-[23px] pr-[15px] text-left text-[15px] hover:bg-[#0000000F]"
              >
                <div className="ml-2 w-full">
                  <div className="ml-2 font-bold">{competition.name}</div>
                  <div className="ml-2">{competition.target_location}</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {(query || location) && error && !Boolean(suggestions.length) && (
        <div className="mt-2 w-full text-center text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default CompetitionSearchInput;

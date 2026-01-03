"use client";

import { Competition } from "../../../state/models/competitions";
import { Calendar, MapPin, Flag } from "lucide-react";
import Image from "next/image";
import CustomButton from "../Companies/ui/custom-button";

interface CompetitionCardProps {
  competition: Competition;
  onViewDetails: (competition: Competition) => void;
  onJoin: (competition: Competition) => void;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
  competition,
  onViewDetails,
  onJoin,
}) => {
  // Map new API fields to old field names for backward compatibility
  const name = competition.competition_name || competition.name || "Untitled Competition";
  const short_description = competition.competition_description || competition.short_description || "";
  const featured_image_url = competition.featured_image_url || "/images/cards/cards-01.png";
  const start_date = competition.start_date;
  const end_date = competition.end_date;
  const status = competition.status || "OPEN";
  const target_location = competition.target_location || "Global";
  const vcc_name = competition.vcc_name || competition.competition_category || "";

  const getStatusChip = (status: string) => {
    if (!status) {
      return (
        <span className="absolute right-4 top-4 rounded-full bg-gray-500 px-3 py-1 text-xs font-bold text-white">
          DRAFT
        </span>
      );
    }

    switch (status.toUpperCase()) {
      case "OPEN":
        return (
          <span className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
            {status}
          </span>
        );
      case "CLOSED":
        return (
          <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            {status}
          </span>
        );
      default:
        return (
          <span className="absolute right-4 top-4 rounded-full bg-gray-500 px-3 py-1 text-xs font-bold text-white">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={featured_image_url}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
        {getStatusChip(status)}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-sm text-gray-200">{vcc_name}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-4 h-20 overflow-hidden text-sm text-gray-600">
          {short_description}
        </p>

        <div className="mb-2 flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4" />
          <span>
            {new Date(start_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            -{" "}
            {new Date(end_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="mb-4 flex items-center text-sm text-gray-500">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{target_location || "Location TBD"}</span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => onViewDetails(competition)}
            className="text-sm font-semibold text-secondary hover:underline"
          >
            View Details
          </button>
          <CustomButton
            type="submit"
            variant="solid"
            onClick={() => onJoin(competition)}
            isLoading={status === "loading"}
            isDisabled={!status || status.toUpperCase() !== "OPEN"}
          >
            Join Competition
          </CustomButton>
          {/* <button
            onClick={() => onJoin(competition)}
            className="hover:bg-secondary-dark rounded-lg bg-secondary px-4 py-2 font-bold text-white transition-colors duration-300 disabled:bg-gray-400"
            disabled={status.toUpperCase() !== "OPEN"}
          ></button> */}
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;

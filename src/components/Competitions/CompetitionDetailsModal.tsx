"use client";
import { Competition } from "../../../state/models/competitions";
import { X, Calendar, MapPin, Building, Tag } from "lucide-react";
import Image from "next/image";
import CustomButton from "../Buttons/CustomButton";

interface CompetitionDetailsModalProps {
  competition: Competition | null;
  onClose: () => void;
  onJoin: (competition: Competition) => void;
}

const CompetitionDetailsModal: React.FC<CompetitionDetailsModalProps> = ({
  competition,
  onClose,
  onJoin,
}) => {
  if (!competition) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
          <Image
            src={`/${competition.featured_image_url} `}
            alt={competition.name}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl font-bold text-white">
              {competition.name}
            </h2>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6 flex items-center">
            <Image
              src={`/${competition.vcc_logo}`}
              alt={`${competition.vcc_name} logo`}
              width={40}
              height={40}
              className="mr-4 rounded-full"
            />
            <span className="text-lg font-semibold text-gray-700">
              {competition.vcc_name}
            </span>
          </div>

          <p className="mb-6 text-gray-600">{competition.short_description}</p>

          <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
            <div className="flex items-start">
              <Calendar className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-secondary" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Competition Dates
                </h4>
                <p className="text-gray-500">
                  {new Date(competition.start_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}{" "}
                  -{" "}
                  {new Date(competition.end_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-secondary" />
              <div>
                <h4 className="font-semibold text-gray-800">Location</h4>
                <p className="text-gray-500">{competition.target_location}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Tag className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-secondary" />
              <div>
                <h4 className="font-semibold text-gray-800">Category</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {competition.competition_category.split(",").map((cat) => (
                    <span
                      key={cat}
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {cat.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <Building className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-secondary" />
              <div>
                <h4 className="font-semibold text-gray-800">Status</h4>
                <p className="text-gray-500">{competition.status}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
            <div className="mr-2">
              <CustomButton type="submit" variant="outlined" onClick={onClose}>
                Close
              </CustomButton>
            </div>
            <CustomButton
              type="submit"
              variant="solid"
              onClick={() => onJoin(competition)}
              //   isLoading={status === "loading"}
              isDisabled={competition.status.toUpperCase() !== "OPEN"}
            >
              Join Competition
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetailsModal;

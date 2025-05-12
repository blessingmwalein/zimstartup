"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchInput from "@/components/material/SearchInput/index";
import { _onSearchCompanies } from "@/apiServices/companyServices";
import Link from "next/link";

const Client = ({ session }) => {
  const sectors = useSelector((store) => store.sectors.sectors);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectorsLoading, setSectorsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setSectorsLoading(false);
  }, [session, sectors]);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError("");
      setSuggestions([]);

      _onSearchCompanies(session, query).then(({ success, message, data }) => {
        if (success && query) {
          setSuggestions(data);
        } else {
          setError(message);
        }
        setLoading(false);
      });
    } else {
      setQuery("");
      setSuggestions([]);
    }
  }, [query, session]);

  const handleCompanySelect = (company) => {
    router.push(`/${company.sector}/${company.company_id}`);
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="w-full mx-auto px-2 md:px-9 py-[10vh] text-center">
        <h1 className="lg:text-[50px] mb-4">
          Welcome to the <span className="text-secondary">Network</span>
        </h1>
        <p className="text-[20px] mb-6">
          An Entrepreneur City shaped by the youth and Community.
        </p>

        <SearchInput
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          loading={loading}
          onCompanySelect={handleCompanySelect}
          error={error}
          label={'companies'}
        />

        {sectorsLoading ? (
          <div className="mt-[10%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-7">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse h-[20vh] rounded-md w-full mx-2"
                />
              ))}
            </div>
          </div>
        ) : (
          Boolean(sectors.length) && (
            <div
              className={
                Boolean(suggestions.length) && query
                  ? "mt-[15%] blur"
                  : "mt-[10%]"
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-7">
                {sectors?.map(({ sector, id, number_of_sectors }) => (
                  <Link key={id} href="/[sector_id]" as={`${sector.toLowerCase()}`}>
                    <div className="flex flex-col items-center justify-center py-[50px] bg-[#F1F1E9] rounded-2xl transition-transform duration-300 ease-in-out transform hover:bg-[#DBF226] hover:scale-105 hover:shadow-lg cursor-pointer">
                      <div className="w-[60px] relative mb-2">
                        <Image
                          src={"/images/select.webp"}
                          width={100}
                          height={100}
                          alt="sector"
                        />
                      </div>
                      <h4 className="text-[22px] mt-5 text-primary font-bold">
                        {sector} <span className="ml-1">{`[${number_of_sectors}]`}</span>
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Client;
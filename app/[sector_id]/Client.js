"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { _getCompaniesBySector } from "@/apiServices/companyServices";
import Link from "next/link";
import Image from "next/image";
import SkeletonCard from "../../components/material/SkeletonCard";
import { BsFilterRight } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import CheckBox from "../../components/material/CheckBox";

const Client = ({ session }) => {
  const { sector_id } = useParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    types: [],
    countries: [],
    isUpcoming: false,
    yearLessThanOne: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const result = await _getCompaniesBySector(sector_id, session);
        if (result.success) {
          setCompanies(result.data.companies);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [sector_id, session]);

  const isFilteringActive = Object.values(filter).some((value) =>
    Array.isArray(value) ? value.length > 0 : value
  );

  const filteredCompanies = companies.filter((company) => {
    const typeMatches =
      filter.types.length === 0 || filter.types.includes(company.type);
    const countryMatches =
      filter.countries.length === 0 ||
      filter.countries.includes(company.country);
    const isUpcomingMatches = !filter.isUpcoming || company.isUpcoming;
    const yearLessThanOneMatches = !filter.yearLessThanOne || company.age <= 1;

    return (
      typeMatches &&
      countryMatches &&
      isUpcomingMatches &&
      yearLessThanOneMatches
    );
  });

  const toggleTypeFilter = (type) => {
    setFilter((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const toggleCountryFilter = (country) => {
    setFilter((prev) => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter((c) => c !== country)
        : [...prev.countries, country],
    }));
  };

  return (
    <div className="flex bg-[#f5f5f5] rounded-xl min-h-screen">
      <div className={`hidden md:block w-1/5 bg-[#F1F1E9] p-6 rounded-lg`}>
        <h4 className="text-xl font-bold mb-4">Filter By:</h4>
        <div>
          {["StartUps", "Established"].map((type) => (
            <CheckBox
              key={type}
              label={type}
              checked={filter.types.includes(type)}
              onChange={() => toggleTypeFilter(type)}
            />
          ))}
        </div>
        <div>
          {["USA", "Canada", "UK"].map((country) => (
            <CheckBox
              key={country}
              label={country}
              checked={filter.countries.includes(country)}
              onChange={() => toggleCountryFilter(country)}
            />
          ))}
        </div>

        <div>
          <CheckBox
            label="Years less than one"
            checked={filter.yearLessThanOne}
            onChange={() =>
              setFilter((prev) => ({
                ...prev,
                yearLessThanOne: !prev.yearLessThanOne,
              }))
            }
          />
        </div>
      </div>

      <div
        className={`fixed left-0 top-0 w-64 bg-[#F1F1E9] h-full transform transition-transform ${
          sidebarOpen ? "translate-x-0 top-[65px]" : "-translate-x-full"
        } md:hidden rounded-lg`}>
        <div className="flex justify-between items-center p-6">
          <h4 className="text-xl font-bold mb-4">Filter By:</h4>
          <button onClick={() => setSidebarOpen(false)} className="text-xl">
            <AiOutlineClose />
          </button>
        </div>
        <div className="px-6">
          <div>
            {["StartUps", "Established"].map((type) => (
              <CheckBox
                key={type}
                label={type}
                checked={filter.types.includes(type)}
                onChange={() => toggleTypeFilter(type)}
              />
            ))}
          </div>
          <div>
            {["USA", "Canada", "UK"].map((country) => (
              <CheckBox
                key={country}
                label={country}
                checked={filter.countries.includes(country)}
                onChange={() => toggleCountryFilter(country)}
              />
            ))}
          </div>

          <div>
            <CheckBox
              label="Years less than 1"
              checked={filter.yearLessThanOne}
              onChange={() =>
                setFilter((prev) => ({
                  ...prev,
                  yearLessThanOne: !prev.yearLessThanOne,
                }))
              }
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/5 p-6 mt-6 transition-margin duration-300">
        <div className="flex justify-between items-center">
          <h4 className="text-[30px] mt-5 text-[#AFAFAF] mb-4 font-bold">
            {sector_id.charAt(0).toUpperCase() + sector_id.slice(1)}
          </h4>
          <button
            className="p-2 rounded-full md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            <BsFilterRight className="text-primary h-[50px] w-[50px]" />
          </button>
        </div>

        {loading ? (
          <div>
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (isFilteringActive ? filteredCompanies : companies).length ? (
          (isFilteringActive ? filteredCompanies : companies).map((company) => (
            <Link
              key={company.company_id}
              href={`/${sector_id}/${company.company_id}`}
              passHref>
              <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 items-center justify-between mt-4 py-2 md:py-3 px-4 sm:px-7 rounded-lg mb-4 border border-[#AFAFAF] cursor-pointer transition-all hover:border-primary">
                <div className="flex mt-2 md:mt-0 md:mr-6 items-center justify-center border-[#AFAFAF] pr-4 flex-shrink-0">
                  {company.logo ? (
                    <Image
                      alt={company.company_name}
                      src={company.logo}
                      width={100}
                      height={32}
                    />
                  ) : (
                    <Image
                      alt={company.company_name}
                      src="/images/cocacola.png"
                      width={100}
                      height={32}
                    />
                  )}
                </div>
          
              <div className="flex-1 space-y-1 md:space-y-2 text-start  px-4 flex-grow">
                <p className="font-bold text-[17px] md:text-[17px]">
                  {company.company_name}
                </p>
                <p className="text-[14px] leading-tight">
                  Status: {company.status}
                </p>
                <p className="text-[14px] leading-tight">
                  Location: {company.location}
                </p>
                <p className="text-[14px] leading-tight">
                  Region: {company.region}
                </p>
              </div>
          
              <div className="flex-1 space-y-1 md:space-y-2  text-start  px-4 flex-grow">
                <p className="font-bold text-[17px] md:text-[17px]">Requests:</p>
                {company.requests && company.requests.length > 0 ? (
                  company.requests.map((request, index) => (
                    <div key={index} className="space-y-1 md:space-y-2 text-[14px] leading-tight">
                      <p className="text-[14px] leading-tight">Currency: {request.currency}</p>
                      <p className="text-[14px] leading-tight">Amount: ${request.amount}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[14px] leading-tight">No requests available.</p>
                )}
              </div>
          
              <div className="flex-1 space-y-1 md:space-y-2 text-start px-4 flex-grow">
                <p className="font-bold text-[17px] md:text-[17px]">
                  Total Amount: {company.amount_requested}
                </p>
                <p className="text-[14px] leading-tight">
                  Company Shares: {company.total_shares}
                </p>
                <p className="text-[14px] leading-tight">
                  Share Price: ${company.share_price}/share
                </p>
              </div>
          
              <button className="w-fit px-6  md:px-0 mb-6 md:mb-0 md:w-[150px] font-bold text-[13px] sm:text-[14px] xl:text-[17px] h-[50px] bg-[#DBF226] rounded-lg">
                Invest Now
              </button>
            </div>
          </Link>
          ))
        ) : (
          <div>
            <p className="text-center mt-[30px]">
              There are no companies in this sector.
            </p>
            <Link
              href="/account/new-company"
              className="block w-fit mx-auto px-[20px] py-[10px] text-center bg-primary text-white rounded-lg mt-9">
              New Company
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;
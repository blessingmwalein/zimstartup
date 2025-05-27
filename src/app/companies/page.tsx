"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CompanyCard from "@/components/Companies/CompanyCard";
import { AppDispatch } from "../../../state/store";
import { fetchCompanySearch } from "../../../state/slices/companySlice";
import { fetchAllConfigs } from "../../../state/slices/configSlice";
import { BusinessState, CompanyIndustry } from "../../../state/models/config";

const Companies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchQuery, setSearchQuery] = useState({
    company_name: "",
    location: "",
    request_type: "",
    sector: "",
    state_name: "",
  });

  const { status, error: reduxError, companyList } = useSelector(
    (state: any) => state.company
  );

  const { industryList, businessStatesList } = useSelector(
    (state: any) => state.companyConfig
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const searchCompanies = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const queryString = Object.entries(searchQuery)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");

      await dispatch(fetchCompanySearch(queryString)).unwrap();
    } catch (err: any) {
      console.error("Error fetching companies:", err);
    }
  };

  const isFetched = useRef(false);
  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAllConfigs());
      isFetched.current = true;
    }
  }, [dispatch]);

  return (
    <DefaultLayout loading={status === "loading"}>
      <div className="mx-auto max-w-full">
        {/* Search Section */}
        <section className="relative bg-center px-8 py-16">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center space-y-6 text-white">
            <h1 className="text-4xl font-bold">Search for Companies</h1>
            <form
              onSubmit={searchCompanies}
              className="flex w-full max-w-4xl items-center overflow-hidden rounded-full bg-white p-3 shadow-lg"
            >
              <input
                type="text"
                name="company_name"
                value={searchQuery.company_name}
                onChange={handleInputChange}
                placeholder="Company Name or Keyword"
                className="flex-grow px-4 py-4 text-gray-700 focus:outline-none"
              />
              <input
                type="text"
                name="location"
                value={searchQuery.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="flex-grow px-4 py-4 text-gray-700 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 rounded-full bg-blue-500 px-8 py-4 font-semibold text-white hover:bg-blue-600 focus:outline-none"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Filters and Results Section */}
        <main className="mt-10 flex px-8">
          <aside className="mr-6 w-1/4 space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold">Company State</h2>
              <select
                name="state_name"
                value={searchQuery.state_name}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
              >
                <option value="">Select Business State</option>
                {businessStatesList?.map((state: BusinessState) => (
                  <option key={state.id} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold">Industry Sector</h2>
              <select
                name="sector"
                value={searchQuery.sector}
                onChange={handleInputChange}
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
              >
                <option value="">Select Industry</option>
                {industryList?.map((industry: CompanyIndustry) => (
                  <option key={industry.sector} value={industry.sector}>
                    {industry.sector}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Company List Section */}
          <section className="flex-1 flex flex-col items-center justify-center">
            {companyList && companyList.length > 0 ? (
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {companyList.map((company: any) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg text-gray-500">No companies found.</p>
            )}
          </section>
        </main>
      </div>
    </DefaultLayout>
  );
};

export default Companies;

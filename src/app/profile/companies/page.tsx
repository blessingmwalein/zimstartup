"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CompanyCard from "@/components/Companies/CompanyCard";

import Loader from "@/components/common/Loader";
import { AppDispatch } from "../../../../state/store";
import { fetchUserCompanies } from "../../../../state/slices/companySlice";
import UserCompanyCard from "@/components/Companies/UserCompanyCard";

const Companies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    status,
    error: reduxError,
    userCompanies,
  } = useSelector((state: any) => state.company);

  const fetchCompanyList = async () => {
    try {
      await dispatch(fetchUserCompanies("632095320E64")).unwrap();
    } catch (err: any) {
      console.error("Error fetching companies:", err);
    }
  };

  useEffect(() => {
    // Fetch companies only on component mount

    fetchCompanyList();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full">
        {/* Search Section */}
        <section
          className="relative bg-center px-8 py-16"
          
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center space-y-6  text-white">
            <h1 className="text-4xl font-bold">Search for Companies</h1>
            <form className="flex w-full max-w-4xl items-center overflow-hidden rounded-full bg-white p-3 shadow-lg">
              {/* Search Icon */}
              <div className="pl-4 pr-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>

              {/* First Input */}
              <input
                type="text"
                placeholder="Company Name or Keyword"
                className="flex-grow px-4 py-4 text-gray-700 focus:outline-none"
              />


              {/* Search Button */}
              <button
                type="submit"
                className="ml-2 rounded-full bg-blue-500 px-8 py-4 font-semibold text-white hover:bg-blue-600 focus:outline-none"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Main Content Section */}
        <main className="mt-10 flex px-8">
          {/* Filters Sidebar */}
         

          {/* Results Section */}

          {status == "loading" ? (
            // <Loader />
            <div className="flex items-center items-center justify-center text-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          ) : (
            <section className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* {userCompanies.data.map((company: any) => {
                return <CompanyCard key={company.id} company={company} />;
              })} */}

              {userCompanies && userCompanies.length > 0 ? (
                userCompanies.map((company: any) => (
                  <UserCompanyCard key={company.id} company={company} />
                ))
              ) : (
                <p>No companies found.</p>
              )}
            </section>
          )}
        </main>
      </div>
    </DefaultLayout>
  );
};

export default Companies;

"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCustomerData } from "../../../../state/slices/authSlice";
import { AppDispatch } from "../../../../state/store";

const AddCompany: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, customerData } = useSelector((state: any) => state.auth);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      getCustomerInfo();
    }
  }, [user ]);

  const getCustomerInfo = async () => {
    try {
      await dispatch(getCustomerData(user.national_id)).unwrap();
    } catch (err: any) {
      console.log('Error:', err);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Simulating search suggestions based on query (you can modify it to make an actual API call)
    if (query.length > 2) {
      setSuggestions(["Company A", "Company B", "Company C"].filter(item => item.toLowerCase().includes(query.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-full px-4">
        <Breadcrumb pageName="Add Company" />
        {customerData ? (
          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-4 pb-6 text-left lg:pb-8 xl:pb-11.5">
              <div className="flex flex-row w-full">
                <div className="w-full">
                  <div className="w-full mt-6">
                    <form className="max-w-md mx-auto">
                      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                        </div>
                        <input 
                          type="search" 
                          id="default-search" 
                          className="block w-full p-5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          placeholder="Check if company name is not registered" 
                          required 
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                        <button 
                          type="submit" 
                          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Search
                        </button>
                      </div>

                      {/* Displaying search suggestions */}
                      {suggestions.length > 0 && (
                        <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto dark:bg-gray-700 dark:border-gray-600">
                          {suggestions.map((suggestion, index) => (
                            <li 
                              key={index} 
                              className="px-4 py-2 text-sm text-gray-900 cursor-pointer hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                              onClick={() => setSearchQuery(suggestion)}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default AddCompany;

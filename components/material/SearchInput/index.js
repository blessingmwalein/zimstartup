
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Rings } from "react-loader-spinner";
import Image from "next/image";
import { classNames } from "@/utils/other";

const SearchInput = ({ query, setQuery, suggestions, loading, onCompanySelect, error, label }) => {
  const clearInput = () => {
    setQuery("");
  };

  return (
    <div
      className={classNames(
        "relative w-[75%] mx-auto items-center justify-center",
        Boolean(suggestions.length) && query ? "z-10" : ""
      )}
    >
      <div
        className="w-full justify-center bg-white py-2 px-4 rounded-full shadow-md border"
        style={
          Boolean(suggestions.length) && query
            ? {
                position: "absolute",
                top: 0,
                borderRadius: "7px",
              }
            : {}
        }
      >
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faSearch}
            className="w-5 h-5 text-gray-500 m-4"
          />
          <input
            type="text"
            placeholder={`Search for ${label}`}
            className="flex-1 py-2 px-4 border-none outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={`Search for ${label}`}
          />
          {loading ? (
            <div className="flex items-center justify-center h-10 w-10">
              <Rings color="#9FC031" height={40} width={40} />
            </div>
          ) : query ? (
            <button
              className="bg-transparent p-2 text-gray-500 hover:bg-gray-200 rounded-full m-2"
              onClick={clearInput}
              aria-label="Clear input"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
            </button>
          ) : null}
        </div>

        <div
          className={classNames(
            "w-full bg-white rounded-[10px]",
            Boolean(suggestions.length) && query ? "h-[40vh] overflow-y-auto" : ""
          )}
        >
          {query &&
            suggestions.map((company) => (
              <div
                key={company.company_id}
                onClick={() => onCompanySelect(company)}
                className="flex w-full py-[10px] px-[15px] pl-[23px] text-[15px] cursor-pointer hover:bg-[#0000000F] text-left"
              >
                <Image
                  src={`/${company.company_logo}`}
                  alt={company.company_name}
                  width={50}
                  height={50}
                  className="h-8 w-8 inline-block mr-2"
                />
                <div className="w-full ml-2">
                  <div className="font-bold ml-2">
                    {company.company_name}
                  </div>
                  <div className="ml-2">{company.sector}</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {query && error && !Boolean(suggestions.length) && (
        <div className="w-full text-red-500">{error}</div>
      )}
    </div>
  );
};

export default SearchInput;
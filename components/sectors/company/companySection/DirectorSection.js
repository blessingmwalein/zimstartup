import { Card } from "flowbite-react";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const DirectorsSection = ({ company }) => {
  const [expandedDirectorId, setExpandedDirectorId] = useState(null);

  const toggleExpand = (employee_id) => {
    setExpandedDirectorId((prevId) => (prevId === employee_id ? null : employee_id));
  };

  return (
    <div className="m-4">
      <h5 className="mt-4 text-2xl font-bold text-primary">Directors</h5>
      {Array.isArray(company.company_directors) &&
      company.company_directors.length > 0 ? (
        <div className="flex flex-wrap bg-transparent">
          {company.company_directors.map((director) => (
            <Card key={director.employee_id} className="flex-1 m-2 max-w-lg shadow-md border-none">
              <div className="flex items-center p-4">
                <FaUserCircle className="h-20 w-20 text-[#AFAFAF] mr-4" />
                <div>
                  <h5 className="text-2xl font-bold text-gray-900">{`${director.title} ${director.first_name} ${director.last_name}`}</h5>
                  <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100" />
                  <p className="font-normal text-gray-700">{`Nationality: ${
                    director.nationality || "N/A"
                  }`}</p>
                  <p className="font-normal text-gray-700">{`Date of Birth: ${
                    director.dob || "N/A"
                  }`}</p>
                  <p className="font-normal text-gray-700">{`Marital Status: ${
                    director.marital_status || "N/A"
                  }`}</p>

                  {expandedDirectorId === director.employee_id && (
                    <div className="mt-1">
                      <p className="font-normal text-gray-700">{`Email: ${
                        director.email || "N/A"
                      }`}</p>
                      <p className="font-normal text-gray-700">{`Home Address: ${
                        director.home_address || "N/A"
                      }`}</p>
                    </div>
                  )}

                  <button
                    className="mt-3 text-sm text-[#9FC131] underline hover:text-primary-dark"
                    onClick={() => toggleExpand(director.employee_id)}
                  >
                    {expandedDirectorId === director.employee_id ? "Less Info" : "More Info"}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p>No directors available.</p>
      )}
    </div>
  );
};

export default DirectorsSection;

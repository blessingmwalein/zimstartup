import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const AboutSection = ({ company }) => {
    return (
    <div className="m-4">
      <h5 className="mt-4 text-2xl font-bold text-primary">About Company</h5>
      <p className="m-3 text-gray-500">
        {company.company_data.company_short_description ||
          "No description available."}
      </p>
      <div className="flex items-center my-2">
        <FaEnvelope className="text-primary mr-2" />
        <p className="text-gray-700">
          {company.company_contact_details.work_email || "N/A"}
        </p>
      </div>
      <div className="flex items-center my-2">
        <FaPhone className="text-primary mr-2" />
        <p className="text-gray-700">
          {company.company_contact_details.phone1 || "N/A"}
        </p>
      </div>
      <div className="flex items-center my-2">
        <FaMapMarkerAlt className="text-primary mr-2" />
        <p className="text-gray-700">
          {`${company.company_contact_details.address || "N/A"}, ${
            company.company_contact_details.address_city || "N/A"
          }, ${company.company_contact_details.region || "N/A"}, ${
            company.company_contact_details.country || "N/A"
          }`}
        </p>
      </div>
    </div>
  )};
  export default AboutSection;
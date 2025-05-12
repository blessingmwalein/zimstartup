import React, { useState } from "react";
import MyDialog from "@/components/material/Dialog/MyDialog";
import TextField from "@/components/material/TextField";

const WorkInfoDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    employerName: "",
    companyName: "",
    employmentStatus: "",
    profession: "",
    sector: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Employment Details:", formData);
    onClose();
  };

  return (
    <MyDialog open={open} className="my-dialog" extended={true} _onClose={onClose} width={800} height={500}>
      <form
        onSubmit={handleSubmit}
        className="p-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 form-container"
      >
        <h2 className="text-xl md:text-4xl font-bold col-span-1 sm:col-span-1 md:col-span-2">
          Update Employment Details
        </h2>

        <div className="flex flex-col col-span-1">
          <label htmlFor="employerName" className="text-sm md:text-lg font-medium text-gray-700">
            Employer Name
          </label>
          <TextField
            type="text"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="companyName" className="text-sm md:text-lg font-medium text-gray-700">
            Company Name
          </label>
          <TextField
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="employmentStatus" className="text-sm md:text-lg font-medium text-gray-700">
            Employment Status
          </label>
          <TextField
            type="text"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="profession" className="text-sm md:text-lg font-medium text-gray-700">
            Profession
          </label>
          <TextField
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="sector" className="text-sm md:text-lg font-medium text-gray-700">
            Sector
          </label>
          <TextField
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center md:justify-end col-span-1 sm:col-span-1 md:col-span-2">
          <button
            type="submit"
            className="py-2 px-6 bg-primary text-white rounded-md shadow hover:bg-primary focus:outline-none"
          >
            Update
          </button>
        </div>
      </form>

      <style jsx>{`
        .my-dialog {
          width: 90%;
        }
        .form-container {
          padding: 16px;
          max-height: 460px;
          overflow-y: auto;
        }
        .form-container::-webkit-scrollbar {
          width: 8px;
        }
        .form-container::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 4px;
        }
        .form-container::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
      `}</style>
    </MyDialog>
  );
};

export default WorkInfoDialog;

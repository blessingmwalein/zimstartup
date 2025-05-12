import React, { useState } from "react";
import MyDialog from "@/components/material/Dialog/MyDialog";
import TextField from "@/components/material/TextField";

const FormDialog = ({ open, onClose }) => {
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
    console.log("Form Data Submitted:", formData);
    onClose();
  };

  return (
    <MyDialog open={open} className="my-dialog" extended={true} _onClose={onClose} width={800} height={500}>
      <form onSubmit={handleSubmit} className="mx-4 md:mx-0 md:space-y-2 px-4 md:px-0 py-2 md:py-0 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        <h2 className="text-xl md:text-4xl mb-4 md:mb-0 font-bold col-span-1 md:col-span-2">
          Update Employment Details
        </h2>

        <div className="flex flex-col gap-1 md:gap-0 col-span-1">
          <label htmlFor="employerName" className="block text-sm md:text-lg font-medium text-gray-700">
            Employer Name
          </label>
          <TextField type={"text"}  name={"employerName"} value={formData.employerName} onChange={handleChange}/>
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="companyName" className="block text-sm md:text-lg font-medium text-gray-700">
            Company Name
          </label>
          <TextField type={"text"}  name={"companyName"} value={formData.companyName} onChange={handleChange}/>
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="employmentStatus" className="block text-sm md:text-lg font-medium text-gray-700">
            Employment Status
          </label>
          <TextField type={"text"}  name={"employeeStatus"} value={formData.employmentStatus} onChange={handleChange}/>
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="profession" className="block text-sm  md:text-lg font-medium text-gray-700">
            Profession
          </label>
          <TextField type={"text"}  name={"profession"} value={formData.profession} onChange={handleChange}/>
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="sector" className="block text-sm md:text-lg font-medium text-gray-700">
            Sector
          </label>
          <TextField type={"text"}  name={"sector"} value={formData.sector} onChange={handleChange}/>
        </div>

        <div className="flex justify-end col-span-1 md:col-span-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update
          </button>
        </div>
      </form>

      <style jsx>{`
        .my-dialog {
          width: 80%;
        }
      `}</style>
    </MyDialog>
  );
};

export default FormDialog;

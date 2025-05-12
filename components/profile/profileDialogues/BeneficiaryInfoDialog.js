import React, { useState, useEffect } from "react";
import MyDialog from "@/components/material/Dialog/MyDialog";
import TextField from "@/components/material/TextField";

const BeneficiaryInfoDialog = ({ open, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    ...initialData.personalInformation,
    ...initialData.contactInformation,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData.personalInformation,
        ...initialData.contactInformation,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Beneficiary Information:", formData);
    onClose();
  };

  return (
    <MyDialog open={open} className="my-dialog" extended={true} _onClose={onClose} width={800} height={500}>
      <form
        onSubmit={handleSubmit}
        className="mx-4 md:mx-0 md:space-y-2 px-8 md:px-4 py-4 md:py-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 form-container"
      >
        <h2 className="text-xl md:text-4xl mb-4 md:mb-0 font-bold col-span-1 md:col-span-2">
          Update Beneficiary Information
        </h2>

        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex flex-col col-span-1">
            <label htmlFor={key} className="block text-sm md:text-lg font-medium text-gray-700">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>
            <TextField
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="flex justify-center md:justify-end col-span-1 md:col-span-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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

export default BeneficiaryInfoDialog;

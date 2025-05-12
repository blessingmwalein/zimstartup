import React, { useState } from "react";
import MyDialog from "@/components/material/Dialog/MyDialog";
import TextField from "@/components/material/TextField";

const UserInfoDialog = ({ open, onClose, user }) => {
  const [formData, setFormData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    middleName: user?.middle_name || "",
    nickname: user?.nickname || "",
    dob: user?.dob || "",
    maritalStatus: user?.marital_status || "",
    gender: user?.gender || "",
    nationality: user?.nationality || "",
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
      <form
        onSubmit={handleSubmit}
        className="p-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 form-container"
      >
        <h2 className="text-xl md:text-4xl font-bold col-span-1 sm:col-span-1 md:col-span-2">Update Personal Details</h2>

        <div className="flex flex-col col-span-1">
          <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
          <TextField type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
          <TextField type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="middleName" className="text-sm font-medium text-gray-700">Middle Name</label>
          <TextField type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="nickname" className="text-sm font-medium text-gray-700">Nickname</label>
          <TextField type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="dob" className="text-sm font-medium text-gray-700">Date of Birth</label>
          <TextField type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="maritalStatus" className="text-sm font-medium text-gray-700">Marital Status</label>
          <TextField type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</label>
          <TextField type="text" name="gender" value={formData.gender} onChange={handleChange} />
        </div>

        <div className="flex flex-col col-span-1">
          <label htmlFor="nationality" className="text-sm font-medium text-gray-700">Nationality</label>
          <TextField type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
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

export default UserInfoDialog;

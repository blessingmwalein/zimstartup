"use client";

import { TbEdit } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BeneficiaryInfoDialog from "@/components/profile/profileDialogues/BeneficiaryInfoDialog";

const BeneficiaryDetails = () => {
  const user = useSelector((store) => store.user.user);

  const [beneficiary, setBeneficiary] = useState({
    personalInformation: {
      nextOfKeen: "Jane Doe",
      nationalId: "0987654321",
      genderOfKeen: "Female",
      title: "Mrs.",
    },
    contactInformation: {
      email: "jane.doe@example.com",
      firstName: "Emma",
      lastName: "John",
      middleName: "",
      maritalStatus: "Single",
      nationality: "Zimbabwean",
      reasonForSelection: "Brother",
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="relative border border-black-200 rounded-e-lg bg-[#f5f5f5] p-5 lg:p-7 rounded-xl min-h-[350px] flex flex-col justify-between">
      <button
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-[#f5faf9]"
        onClick={handleDialogOpen}
      >
        <TbEdit className="text-[#005B52] text-[25px] xl:text-[35px] m-auto" />
      </button>

      <div className="flex items-center gap-5">
        <div>
          <h3 className="text-primary leading-tight">Beneficiary Information</h3>
        </div>
      </div>

      <div className="mt-9">
        <div className="mb-5">
          <h4 className="text-lg font-bold text-[#005B52]">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mt-3">
            {Object.entries(beneficiary.personalInformation).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <p className="text-[#005B52] text-[17px] capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                <p className="font-bold text-[#005B52] text-[17px]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-[#005B52]">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mt-3">
            {Object.entries(beneficiary.contactInformation).map(([key, value]) => {
              if (key === "email") {
                return null;
              }
              return (
                <div key={key} className="flex flex-col">
                  <p className="text-[#005B52] text-[17px] capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="font-bold text-[#005B52] text-[17px]">{value}</p>
                </div>
              );
            })}

            <div className="col-span-full flex flex-col mt-5">
              <p className="text-[#005B52] text-[17px]">Email</p>
              <p className="font-bold text-[#005B52] text-[17px]">
                {beneficiary.contactInformation.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <BeneficiaryInfoDialog
        open={dialogOpen} 
        onClose={handleDialogClose}
        initialData={{
          personalInformation: beneficiary.personalInformation,
          contactInformation: beneficiary.contactInformation,
        }}
      />
    </div>
  );
};

export default BeneficiaryDetails;

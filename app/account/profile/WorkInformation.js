"use client";

import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { useSelector } from "react-redux";
import WorkInfoDialog from "@/components/profile/profileDialogues/WorkInfoDialog";

const WorkInformation = () => {
  const user = useSelector((store) => store.user.user);

  const [work, setWork] = useState({
    employerCountry: "Zimbabwe",
    statusOfEmployment: "Full-time",
    profession: "Software Developer",
    sector: "Information Technology",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="relative border border-black-200 rounded-e-lg bg-[#f5f5f5] p-5 lg:p-7 rounded-xl min-h-[350px]">
      <button
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-[#f5faf9]"
        onClick={() => setIsDialogOpen(true)}
      >
        <TbEdit className="text-[#005B52] text-[25px] xl:text-[35px] m-auto" />
      </button>
      <div className="flex items-center gap-5">
        <div>
          <h3 className="text-primary leading-tight">Work Information</h3>
        </div>
      </div>

      <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
        <div className="flex flex-col mt-5">
          <p className="text-[#005B52] text-[17px]">Employer Country</p>
          <p className="font-bold text-[#005B52] text-[17px]">
            {work.employerCountry}
          </p>
        </div>
        <div className="flex flex-col mt-5">
          <p className="text-[#005B52] text-[17px]">Profession</p>
          <p className="font-bold text-[#005B52] text-[17px]">
            {work.profession}
          </p>
        </div>
        <div className="flex flex-col mt-5">
          <p className="text-[#005B52] text-[17px]">Status Of Employment</p>
          <p className="font-bold text-[#005B52] text-[17px]">
            {work.statusOfEmployment.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col mt-5">
          <p className="text-[#005B52] text-[17px]">Sector</p>
          <p className="font-bold text-[#005B52] text-[17px]">{work.sector}</p>
        </div>
      </div>
      <WorkInfoDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default WorkInformation;
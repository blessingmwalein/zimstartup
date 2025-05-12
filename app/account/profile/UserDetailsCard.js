"use client";

import { TbEdit } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserInfoDialog from "@/components/profile/profileDialogues/UserInfo";

const UserDetailsCard = () => {
  const user = useSelector((store) => store.user.user);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="relative border border-black-200 rounded-e-lg bg-[#f5f5f5] p-5 lg:p-7 rounded-xl">
      <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-[#f5faf9]"  onClick={() => setIsDialogOpen(true)}>
        <TbEdit className="text-[#005B52] text-[25px] xl:text-[35px] m-auto" />
      </button>

      <div className="flex items-center gap-5">
        <div className="w-[60px] h-[60px] sm:w-[60px] sm:h-[60px] flex justify-center items-center rounded-full bg-orange-500 text-white font-bold text-[30px] sm:text-[30px]">
          {user?.first_name?.[0]?.toUpperCase()}
          {user?.last_name?.[0]?.toUpperCase()}
        </div>

        <div>
          <h3 className="text-primary leading-tight">Personal Information</h3>
        </div>
      </div>

      <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-x-5">
        <div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">Title</p>
            <p className="font-bold text-[#005B52] text-[17px]">
              {user?.title}
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">Middle Name</p>
            <p className="font-bold text-[#005B52] text-[17px]">
              {user?.middle_name}
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">Nickname</p>
            <p className="font-bold text-[#005B52] text-[17px]">
              {user?.nickname}
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">Date of Birth</p>
            <p className="font-bold text-[#005B52] text-[17px]">{user?.dob}</p>
          </div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">Marital Status</p>
            <p className="font-bold text-[#005B52] text-[17px]">
              {user?.marital_status}
            </p>
          </div>
        </div>
        
        <div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">First Name</p>
            <p className="font-bold text-[#005B52] text-[17px]">
              {user?.first_name}
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">Last Name</p>
            <p className="font-bold text-[#005B52] text-[17px]">
              {user?.last_name}
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">National ID</p>
            <p className="font-bold text-[#005B52] text-[17px]">
              {user?.national_id}
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">Gender</p>
            <p className="font-bold text-[#005B52] text-[17px]">
              {user?.gender}
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <p className=" text-[#005B52] text-[17px]">Nationality</p>
            <p className="font-bold text-[#005B52] text-[17px]">
              {user?.nationality}
            </p>
          </div>
        </div>
      </div>
      <UserInfoDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={user}
      />
    </div>
  );
};

export default UserDetailsCard;

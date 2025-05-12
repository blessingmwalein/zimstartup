"use client";

import { TbEdit } from "react-icons/tb";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContactInfoDialog from "@/components/profile/profileDialogues/ContactInfoDialog";

const ContactInformation = () => {
  const user = useSelector((store) => store.user.user);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [contact, setContact] = useState({
    emailAddress: "john.doe@example.com",
    workEmail: "john.doe@workmail.com",
    phoneNumber1: "+263 771 123 456",
    phoneNumber2: "+263 772 987 654",
    phoneNumber3: "+263 773 456 789",
    addressLine1: "123 Main Street",
    addressLine2: "Suite 4B",
    town: "Harare",
    city: "Harare",
    state: "Harare Province",
    postalCode: "00263",
  });

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="relative border border-black-200 rounded-e-lg bg-[#f5f5f5] p-5 lg:p-7 rounded-xl flex flex-col">
      <button    onClick={() => setDialogOpen(true)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-[#f5faf9]">
        <TbEdit className="text-[#005B52] text-[25px] xl:text-[35px] m-auto" />
      </button>

      <div className="flex items-center gap-5">
        <div>
          <h3 className="text-primary leading-tight">Contact Information</h3>
        </div>
      </div>


      <div className="mt-9 grid gap-x-5 gap-y-5">
        {contact ? (
          <>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
              <div className="flex flex-col mt-5">
                <p className="text-[#005B52] text-[17px]">Email Address</p>
                <p className="font-bold text-[#005B52] text-[17px]">
                  {contact.emailAddress}
                </p>
              </div>
              <div className="flex flex-col mt-5">
                <p className="text-[#005B52] text-[17px]">Work Email</p>
                <p className="font-bold text-[#005B52] text-[17px]">
                  {contact.workEmail}
                </p>
              </div>
              <div className="flex flex-col mt-5">
                <p className="text-[#005B52] text-[17px]">City</p>
                <p className="font-bold text-[#005B52] text-[17px]">
                  {contact.city}
                </p>
              </div>
              <div className="flex flex-col mt-5">
                <p className="text-[#005B52] text-[17px]">State</p>
                <p className="font-bold text-[#005B52] text-[17px]">
                  {contact.state}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5 mt-5">
              <div className="flex flex-col mt-5">
                <p className="text-[#005B52] text-[17px]">Phone Number 1</p>
                <p className="font-bold text-[#005B52] text-[17px]">
                  {contact.phoneNumber1}
                </p>
              </div>
              <div className="flex flex-col mt-5">
                <p className="text-[#005B52] text-[17px]">Phone Number 2</p>
                <p className="font-bold text-[#005B52] text-[17px]">
                  {contact.phoneNumber2}
                </p>
              </div>
              <div className="flex flex-col mt-5">
                <p className="text-[#005B52] text-[17px]">Phone Number 3</p>
                <p className="font-bold text-[#005B52] text-[17px]">
                  {contact.phoneNumber3}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-auto">
            <p className="text-orange-500 text-center mt-5">
              Contact information is missing. Please add contact details.
            </p>

            <Link
              href="/account/new-contact"
              className="flex items-center justify-center w-fit mx-auto px-[20px] py-[10px] text-center bg-primary text-white rounded-lg mt-9"
            >
              <span className="text-[20px] mr-2">+</span> Add
            </Link>
          </div>
        )}
      </div>
      <ContactInfoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
};

export default ContactInformation;

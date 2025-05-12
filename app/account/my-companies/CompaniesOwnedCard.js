'use client'
import Image from "next/image";
import Link from "next/link";
import { FaForward } from "react-icons/fa";
import { useSelector } from "react-redux";



const CompaniesOwnedCard = () => {
  const { companies } = useSelector((state) => state.user);
  return (
    <div className="bg-[#f5f5f5] p-5 rounded-xl text-primary min-h-[350px]">
      {companies.length ? (
        companies.map((company, index) => (
          <div
            key={index}
            className="flex justify-between py-2 md:py-3 px-4 sm:px-7 border border-[#D9D9D9] rounded-lg mb-4">
            <div className="relative w-[50px] sm:w-[80px] h-[inherit] flex items-center">
              <Image alt="" src="/${company.company_logo}" width={100} height={32} priority/>
            </div>

            <div>
              <p className="font-bold text-[14px] md:text-[17px]">Fundings</p>
              <p className=" text-[14px] leading-tight">shares</p>
              <p className=" text-[14px] leading-tight">
                ${company.pricePerShare ? company.pricePerShare : 0}/share
              </p>
            </div>

            <div className="text-center">
              <p className=" text-[13px] md:text-[14px] leading-tight">
                Total Amount
              </p>
              <p className="font-bold text-[17px]">${company.totalAmount ? company.totalAmount : 0}</p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-center mt-[30px]">
            You haven&apos;t yet added any company
          </p>

          <Link
            href="/account/new-company"
            className="block w-fit mx-auto px-[20px] py-[10px] text-center bg-primary text-white rounded-lg mt-9">
            New Company
          </Link>
        </div>
      )}
    </div>
  );
};

export default CompaniesOwnedCard;

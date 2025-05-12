import { getServerSession } from "next-auth";
import CompaniesOwnedCard from "./CompaniesOwnedCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

const MyCompanies = async () => {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <div className="flex justify-between ">
        <h2 className="mb-4 text-[#AFAFAF]">My Companies</h2>
        <Link href="/account/new-company">
          <button
            className="bg-primary text-white
         border border-transparent rounded-lg text-center opacity-100  px-[20px] py-[10px] ">
            Add Company
          </button>
        </Link>
      </div>

      <div className="col-span-4 mt-5 md:mt-0">
        <CompaniesOwnedCard />
      </div>
    </div>
  );
};

export default MyCompanies;

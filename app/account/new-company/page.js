import { getServerSession } from "next-auth";
import CompanyForm from "./Form";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AddCompany = async () => {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/");
  }
  return (
    <div className="pb-10">
      <h2 className="mb-4 text-[#AFAFAF] md:mb-10">New Company</h2>
      <div className="w-full md:w-[750px] mx-auto">
        <CompanyForm />
      </div>
    </div>
  );
};

export default AddCompany;

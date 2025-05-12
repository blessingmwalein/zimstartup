import { getServerSession } from "next-auth";
import Client from "./Client";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { _getCompanyById } from "@/apiServices/companyServices";
import { redirect } from "next/navigation";

const Company = async ({ params }) => {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/");
  }

  const result = await _getCompanyById(params.company_id, session);

  if (!result.success) {
    redirect("/");
  }

  return <Client session={session} company={result.data} />;
};

export default Company;

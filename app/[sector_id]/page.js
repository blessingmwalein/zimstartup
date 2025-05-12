import { getServerSession } from "next-auth";
import Client from "./Client";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { _getCompaniesBySector } from "@/apiServices/companyServices";
import { redirect } from "next/navigation";

const Sector = async ({ params }) => {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/");
  }

  if (params.sector_id) {
    const result = await _getCompaniesBySector(params.sector_id, session);
  }

  return <Client session={session} />;
};

export default Sector;

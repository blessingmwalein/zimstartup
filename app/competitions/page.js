
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Client from "./Client";
import { _getCompetitions } from "@/apiServices/competitionServices";



const Competitions = async () => {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/");
  }

  let competitions;
  if (session) {
    const res = await _getCompetitions(session);
    competitions = res.data;
   
  }

  return <Client competitions={competitions} />;
};

export default Competitions;

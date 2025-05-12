import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Client from "./Client";

const Dashboard = async () => {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/");
  }

  return <Client session={session} />;
};

export default Dashboard;

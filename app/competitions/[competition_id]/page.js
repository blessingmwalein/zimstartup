import Client from "./Client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  _getAllQuestions,
  _postCompanyCompetiton,
} from "@/apiServices/competitionServices";
import { redirect } from "next/navigation";

const Competition = async ({ params, searchParams }) => {
  const session = await getServerSession(authOptions());

  if (!session) {
    redirect("/");
  }

  let data;
  if (session) {
    const payload = {
      company_id: searchParams.id,
      competition_id: params.competition_id,
    };

    const response = await _postCompanyCompetiton(payload, session);

    if (!response.success) {
      // redirect("/competitions");
    }

    const res = await _getAllQuestions(params.competition_id, session);
    data = res.data;
  }

  return <Client questions={data} session={session} />;
};
export default Competition;

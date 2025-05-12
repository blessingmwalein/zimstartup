import { _getCompanyAvailability } from "@/apiServices/companyServices";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const body = await req.json();
  const session = await getServerSession(authOptions());
  const res = await _getCompanyAvailability(body, session);

  return NextResponse.json(res, { status: res.status });
}

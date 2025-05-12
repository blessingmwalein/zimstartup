import { _getAllSectors } from "@/apiServices/companyServices";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions());
  const res = await _getAllSectors(session);

  return NextResponse.json(res, { status: res.status});
}

import { _postHelpdesk } from "@/apiServices/generalServices";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const res = await _postHelpdesk(body);

  return NextResponse.json(res, { status: res.status });
}

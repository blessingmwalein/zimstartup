import { _postSendResetToken } from "@/apiServices/authServices";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  try {
    const res = await _postSendResetToken(body);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {}
}

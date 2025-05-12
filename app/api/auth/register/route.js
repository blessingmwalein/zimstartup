import {
  _postAccountVerification,
  _postBasicInfo,
  _postCompanyInfo,
  _postContactInfo,
  _postCredentials,
  _postInvestorType,
} from "@/apiServices/authServices";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";

export async function POST(req) {
  const body = await req.json();

  const session = await getServerSession(authOptions());

  let res = {
    success: false,
    message: "An error occurred. Please try again later.",
    status: 400,
  };

  if (body.step === "type") {
    res = await _postInvestorType(body);
  } else if (body.step === "basic") {
    res = await _postBasicInfo(body);
  } else if (body.step === "contact") {
    res = await _postContactInfo(body);
  } else if (body.step === "company") {
    res = await _postCompanyInfo(body, session);
  } else if (body.step === "account-verification") {
    res = await _postAccountVerification(body);
  } else if (body.step === "credentials") {
    res = await _postCredentials(body);
  }

  return NextResponse.json(res, { status: res.status });
}

import { getServerSession } from "next-auth";
import Basic from "./Basic";
import Complete from "./Complete";
import Contact from "./Contact";
import Type from "./Type";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Credentials from "./Credentials";

const Registration = async ({ params, searchParams }) => {
  const session = await getServerSession(authOptions());

  if (session) {
    redirect("/dashboard");
  }

  if (params.step !== "type" && !searchParams.id) {
    redirect("/register/type");
  }

  return (
    <div className=" ">
      {params.step === "type" && <Type initData={searchParams} />}
      {/* {params.step === "company-info" && <Company />} */}
      {params.step === "basic" && <Basic initData={searchParams} />}
      {params.step === "contact-info" && <Contact initData={searchParams} />}
      {params.step === "credentials" && <Credentials initData={searchParams} />}
      {/* {params.step === "account-verification" && (
        <Verification initData={searchParams} />
      )} */}
      {params.step === "complete" && <Complete initData={searchParams} />}
    </div>
  );
};

export default Registration;

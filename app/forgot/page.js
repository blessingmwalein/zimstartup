import Form from "./Form";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Forgot Password - ZimStartup",
  description: "ZimStartup",
};

const Forgot = async ({ searchParams }) => {
  const session = await getServerSession(authOptions());

  if (session) {
    redirect("/dashboard");
  }

  const { step, email, token } = searchParams;

  if (step !== "initiate" && step !== "reset" && step !== "send_email") {
    redirect("/forgot?step=initiate");
  }

  const messages = [
    " Enter your account email address and we will send a reset token to reset your email.",
    "Enter the token sent to your email address, " + email + ".",
    "Enter your new password.",
  ];

  return (
    <div className=" p-[10px] pt-[40px] sm:p-[30px] lg:pt-[80px]">
      <Form step={step} email={email} token={token} />
    </div>
  );
};

export default Forgot;

import React from "react";
import LoginForm from "./Form";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions());

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className=" flex flex-col  ">
      <div className=" block md:flex ">
        <div className="flex-1 flex flex-col relative md:h-[96vh] md:mt-[-85px] z-[1000]">
          <div className="absolute top-3 left-3 w-[150px] md:w-[220px] z-[100] hidden md:block">
            <Image
              src="/images/logo1.webp"
              width={300}
              height={110}
              style={{ width: "100%", height: "auto" }}
              alt="Zimstartup"
            />
          </div>

          <HomeSlider />

          {/* <div className="bg-[#D5D58D] flex-1  py-[60px] px-[40px] flex flex-col justify-center ">
          <div className="max-w-[1300px] w-full mx-auto flex justify-between items-center">
            <h2 className="text-white">COM1 LOGO</h2>
            <h2 className="text-white">COM2 LOGO</h2>
            <h2 className="text-white">COM3 LOGO</h2>
            <h2 className="text-white">COM4 LOGO</h2>
          </div>
        </div> */}
        </div>

        <div className=" mx-auto p-[10px] pt-[40px] sm:p-[30px] lg:pt-[80px]">
          <LoginForm />
        </div>
      </div>

      {/* <div className="max-w-[1300px] w-full  mb-1 px-2 md:px-9 ">
      <h2 className=" mt-10 md:pt-1 ">Featured Companies</h2>
    </div> */}

      {/* <div className="bg-[#D5D58D]  py-[70px] px-[40px] ">
      <div className="max-w-[1300px] w-full mx-auto flex justify-between items-center">
        <h1 className="text-white">COMP1 LOGO</h1>
        <h1 className="text-white">COMP2 LOGO</h1>
        <h1 className="text-white">COMP3 LOGO</h1>
        <h1 className="text-white">COMP4 LOGO</h1>
      </div>
    </div> */}
    </main>
  );
};

export default Login;

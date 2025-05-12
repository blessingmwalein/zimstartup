import React from "react";
import LoginForm from "./Form";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import HomeSlider from "@/components/HomeSlider";
import Link from "next/link";


const Login = async () => {
  const session = await getServerSession(authOptions());

  if (session) {
    redirect("/dashboard");
  }

  return (

    <main>
      <div className="mx-auto">
       
        <div className="flex h-[calc(100vh-64px)]">
          <div className="w-2/3 h-full relative overflow-hidden">
            <Image
              src="/images/wallpaper.webp"
              alt="Banner"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="w-1/3 h-full flex items-center justify-center bg-gray-50">
         
              <LoginForm />
           
          </div>
        </div>
      </div>
    </main>



  );
};

export default Login;

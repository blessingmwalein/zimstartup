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
        <nav className="flex justify-between items-center px-8 py-4 bg-[#052941] text-white shadow-md">
          <Link className="inline-block" href="/">
            <Image
              className="hidden dark:block"
              src={"/images/logo1.webp"}
              alt="Logo"
              width={200}
              height={50}
            />
            <Image
              className="dark:hidden"
              src={"/images/logo1.webp"}
              alt="Logo"
              width={200}
              height={80}
            />
          </Link>
          <div className="space-x-6 text-sm font-medium text-white-600">
            <Link href="/" className="hover:text-lime-600">Home</Link>
            <Link href="/helpdesk" className="hover:text-lime-600">HelpDesk</Link>
            <Link href="/about" className="hover:text-lime-600">About</Link>
          </div>
        </nav>
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

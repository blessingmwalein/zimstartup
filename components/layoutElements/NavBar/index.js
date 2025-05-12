"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";

const NavBar = ({ session }) => {
  const pathname = usePathname();
  const [links, setLinks] = useState([
    {
      name: "Home",
      href: "/",
      authref: "/dashboard",
    },

    {
      name: "HelpDesk",
      href: "/helpdesk",
    },

    {
      name: "About",
      href: "/about",
    },
  ]);

  useEffect(() => {
    if (session) {
      setLinks([
        {
          name: "Home",
          href: "/",
          authref: "/dashboard",
        },

        {
          name: "Competitions",
          href: "/competitions",
        },

        {
          name: "HelpDesk",
          href: "/helpdesk",
        },

        {
          name: "About",
          href: "/about",
        },
      ]);
    }
  }, [session]);

  return (
    <nav
      className={`
 sticky top-0 h-[80px] md:h-[85px] w-full px-[15px] md:px-[40px] md:pr-[60px] py-2 z-[901] ${
   pathname === "/" ? "text-primary bg-white" : "bg-primary text-white"
 }  `}>
      <div className="flex h-full w-full items-center space-x-2 md:space-x-7">
        <div className="lg:mr-[100px]">
          <Link
            href={session ? "/dashboard" : "/"}
            className="block relative w-[150px] md:w-[220px]">
            <Image
              src="/images/logo1.webp"
              width={300}
              height={110}
              style={{ width: "100%", height: "auto" }}
              alt="Zimstartup"
            />
          </Link>
        </div>

        <div className="flex-1" />

        <div className="hidden lg:flex items-center space-x-7">
          {!pathname.includes("login") &&
            !pathname.includes("register") &&
            links.map((link, index) => (
              <Link
                key={index}
                href={session && link.authref ? link.authref : link.href}
                className={`font-normal text-[#C6C6C6]  hover:underline `}
                style={{
                  color:
                    (pathname.includes(link.href) && link.href !== "/") ||
                    link.href === pathname
                      ? "#9FC031"
                      : "",
                }}>
                {link.name}
              </Link>
            ))}
        </div>

        {/* {!pathname.includes("login") &&
          !pathname.includes("register") &&
          !session && (
            <div className="hidden  lg:flex items-center space-x-2 md:space-x-7">
              <Link
                href="/login"
                className="font-bold bg-secondary-light rounded-md py-[10px] px-8  text-black hover:opacity-80">
                Login
              </Link>

              <Link
                href="/register/type"
                className="border border-[#F1F2F2] rounded-md py-[10px] px-7  text-gray font-bold hover:underline">
                Register
              </Link>
            </div>
          )} */}

        {session && <UserMenu />}
      </div>
    </nav>
  );
};

export default NavBar;

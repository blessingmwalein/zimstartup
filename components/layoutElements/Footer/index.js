"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const socialMediaLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: <FaFacebookF className="text-[16px]  md:text-[18px]" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com",
    icon: <BsInstagram className="text-[16px]  md:text-[18px]" />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: <BsTwitterX className="text-[14px]  md:text-[16px]" />,
  },
];

const Footer = () => {
  const pathname = usePathname();

  return (
    <div
      className={`h-[50px] justify-between items-center bg-[#58585A] sm:bg-primary px-[15px] md:px-[40px] overflow-hidden   ${
        pathname.includes("login") ||
        pathname.includes("register") ||
        pathname.includes("forgot")
          ? "hidden"
          : "flex"
      } `}>
      <div className="flex items-center space-x-4 text-white">
        <p className="text-[12px] md:text-[15px]">
          &copy; 2024, All Rights Reserved
        </p>

        <div className="px-2 border-x">
          <Link
            href="/privacy-policy"
            className="block text-[12px] md:text-[15px]   hover:underline">
            Privacy Policy
          </Link>
        </div>

        <Link
          href="/terms-and-conditions"
          className="block text-[12px] md:text-[15px]  hover:underline">
          Terms & Conditions
        </Link>
      </div>

      <div className="flex justify-center space-x-2 md:space-x-5   ">
        {socialMediaLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className=" text-white p-[3px] md:p-[4px] rounded-full hover:bg-gray ">
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;

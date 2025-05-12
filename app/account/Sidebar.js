"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Profile",
    href: "/account/profile",
  },
  {
    name: "Wallet",
    href: "/account/wallet",
  },
  {
    name: "My Companies",
    href: "/account/my-companies",
  },
  {
    name: "Competitions",
    href: "/competitions",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[240px] sticky hidden lg:block top-[85px]  bg-[#F1F1E9] fit-height ">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`flex h-[60px] items-center  text-primary  px-5 text-[16px] font-medium hover:font-semibold hover:underline ${
            pathname.includes(link.href) ? "bg-[#DBF226]" : ""
          }`}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;

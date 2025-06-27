"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Provider } from 'react-redux';
import store from "../../../state/store";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Provider store={store}>

      <main>
        <div className="mx-auto">
          <nav className="flex justify-between items-center px-8 py-2 bg-[#052941] text-white shadow-md">
            <Link className="inline-block" href="/">
              <Image
                className="hidden dark:block"
                src={"/images/logo/logo1.webp"}
                alt="Logo"
                width={200}
                height={50}
              />
              <Image
                className="dark:hidden"
                src={"/images/logo/logo1.webp"}
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
          {children}
        </div>
      </main>
    </Provider>
  );
}

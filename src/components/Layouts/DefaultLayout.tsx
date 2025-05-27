"use client";

import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../common/Loader";

type DefaultLayoutProps = {
  children: React.ReactNode;
  loading?: boolean; // <- Accept the loading prop
};

export default function DefaultLayout({ children, loading = false }: DefaultLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col lg:ml-72.5 bg-transparent">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto">
              {loading ? (
                <div className="flex items-center justify-center h-[60vh] bg-transparent">
                  <Loader />
                </div>
              ) : (
                children
              )}
            </div>
          </main>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

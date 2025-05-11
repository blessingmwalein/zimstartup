"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Provider } from 'react-redux';
import store from "../../../state/store";

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
              {children}
            </div>
          </main>
    </Provider>
  );
}

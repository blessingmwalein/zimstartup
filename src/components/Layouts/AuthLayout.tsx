"use client";
import React, { useState } from "react";
import { Provider } from 'react-redux';
import store from "@/state/store";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Provider store={store}>
      <main className="min-h-screen">
        <div className="mx-auto">
          {/* Navigation */}
          <nav className="bg-[#052941] text-white shadow-md">
            <div className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4">
              {/* Logo */}
              <Link className="inline-block" href="/">
                <Image
                  src="/images/logo/logo1.webp"
                  alt="Logo"
                  width={160}
                  height={40}
                  className="w-32 md:w-40 h-auto"
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-6 text-sm font-medium">
                <Link href="/" className="hover:text-lime-600 transition-colors">Home</Link>
                <Link href="/youth-hub" className="hover:text-lime-600 transition-colors">HelpDesk</Link>
                <Link href="/about" className="hover:text-lime-600 transition-colors">About</Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-[#063d5a] rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-[#063d5a]">
                <div className="flex flex-col space-y-2 px-4 py-4">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-lime-600 transition-colors py-2"
                  >
                    Home
                  </Link>
                  <Link
                    href="/youth-hub"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-lime-600 transition-colors py-2"
                  >
                    HelpDesk
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-lime-600 transition-colors py-2"
                  >
                    About
                  </Link>
                </div>
              </div>
            )}
          </nav>
          
          {/* Content */}
          {children}
        </div>
      </main>
    </Provider>
  );
}

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

const Header = () => {
  const [user, setUser] = useState<any>(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown when interacting outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest(".profile-dropdown-container")
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="w-6 h-6"
          >
            <path d="M12 2c0 10 7 13 7 13s-7 7-7 7-7-7-7-7 7-3 7-13z" />
          </svg>
        </div>
        <span className="text-2xl font-bold text-gray-800 tracking-tight">
          RedFlame <span className="text-orange-500">Gas</span>
        </span>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link
          href="/"
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          Home
        </Link>
        <Link
          href="/services"
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          Services
        </Link>
        <Link
          href="/safety"
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          Safety Tips
        </Link>
        <Link
          href="/contact"
          className="text-gray-600 hover:text-orange-500 font-medium"
        >
          Contact
        </Link>
      </nav>

      <div className="flex items-center gap-6">
        <div className="hidden lg:block text-right">
          <p className="text-xs text-gray-500 uppercase font-semibold">
            Emergency Support
          </p>
          <p className="text-red-600 font-bold">1-800-GAS-LINE</p>
        </div>

        {user === undefined ? (
          <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        ) : user ? (
          <div className="flex items-center gap-3 relative profile-dropdown-container">
            <button className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md active:scale-95">
              Order Cylinder
            </button>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-orange-500 focus:outline-none"
              title="Profile Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 transition-all duration-200 origin-top-right">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.email || "My Account"}
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/help"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Help Center
                  </Link>
                </div>

                <div className="border-t border-gray-100 pt-1 pb-1">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      auth.signOut();
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </div>

                <div className="border-t border-gray-100 px-4 py-3 mt-1 bg-gray-50 rounded-b-lg">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Consumer Helpline
                  </p>
                  <p className="text-sm text-gray-900 font-bold tracking-wide">
                    1906
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-orange-500 hover:bg-orange-700 text-white px-8 py-2.5 rounded-lg font-semibold transition-all shadow-md active:scale-95">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

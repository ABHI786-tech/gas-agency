"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import {
  getUserBookings,
  getCylinderIcon,
  formatBookingDate,
  getPaymentLabel,
  type Booking,
} from "@/app/lib/firestore";

export default function HistoryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      try {
        const data = await getUserBookings(user.uid);
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "all") return true;
    if (activeTab === "delivered") return b.status === "Delivered";
    if (activeTab === "pending")
      return (
        b.status === "Pending" ||
        b.status === "Confirmed" ||
        b.status === "Out for Delivery"
      );
    if (activeTab === "cancelled") return b.status === "Cancelled";
    return true;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Out for Delivery":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-500 selection:text-white pb-20 mt-10">
      <Header />

      {/* Header Banner */}
      <section className="bg-white border-b border-gray-200 pt-8 pb-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Booking History
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track and reorder your past cylinder deliveries.
            </p>
          </div>
          <Link href="/book-cylinder">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              New Booking
            </button>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: "all", label: "All Bookings" },
            { id: "delivered", label: "Delivered" },
            { id: "pending", label: "In Progress" },
            { id: "cancelled", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm animate-pulse"
              >
                <div className="flex gap-5 items-center">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="h-8 w-20 bg-gray-200 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  You haven&apos;t made any bookings in this category yet. Start
                  your first booking today!
                </p>
                <Link href="/book-cylinder">
                  <button className="bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 px-6 py-2 rounded-lg font-bold transition-all">
                    Book a Cylinder
                  </button>
                </Link>
              </div>
            ) : (
              filteredBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center shadow-sm hover:shadow-md transition-shadow group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-5 items-start">
                    <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                      {getCylinderIcon(booking.cylinderType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm font-bold text-gray-500">
                          #{booking.id?.slice(0, 8).toUpperCase()}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusStyle(
                            booking.status,
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {booking.cylinderType}
                      </h3>
                      <div className="text-sm text-gray-500 flex items-center gap-3 mt-2 font-medium">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          {formatBookingDate(booking.createdAt)}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            ></path>
                          </svg>
                          {getPaymentLabel(booking.paymentMethod)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <div className="text-left lg:text-right flex-1 lg:flex-none">
                      <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                        Total
                      </p>
                      <p className="text-xl font-extrabold text-gray-900">
                        ₹{booking.amount}
                      </p>
                    </div>
                    <Link href="/book-cylinder">
                      <button className="text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-semibold text-sm transition-colors border border-transparent hover:border-orange-200">
                        {booking.status === "Delivered" ? "Reorder" : "Details"}
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}

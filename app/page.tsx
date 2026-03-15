"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import {
  getUserBookings,
  getCylinderIcon,
  formatBookingDate,
  type Booking,
} from "@/app/lib/firestore";

export default function Home() {
  const [user, setUser] = useState<any>(undefined);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setBookingsLoading(true);
        try {
          const data = await getUserBookings(currentUser.uid);
          setRecentBookings(data.slice(0, 3)); // show only 3 most recent
        } catch (err) {
          console.error("Failed to fetch bookings:", err);
        } finally {
          setBookingsLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-500 selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white py-24 px-6 min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-md">
            Book LPG Gas Cylinders <br className="hidden md:block" /> Easily &
            Fast
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto font-light leading-relaxed">
            Manage bookings, track delivery, and get instant support — all in
            one seamless app experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {user === undefined ? (
              <div className="w-56 h-14 bg-white/20 animate-pulse rounded-xl"></div>
            ) : user ? (
              <Link href="/book-cylinder">
                <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto">
                  Order Cylinder Now
                </button>
              </Link>
            ) : (
              <Link href="/register">
                <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto">
                  Get Started for Free
                </button>
              </Link>
            )}
            <Link href="#features">
              <button className="border-2 border-white/80 hover:border-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all w-full sm:w-auto mt-4 sm:mt-0">
                Explore Features
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Why Choose RedFlame Gas?
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the most reliable and convenient way to manage your LPG
            needs with our cutting-edge platform.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Easy Gas Booking",
              desc: "Book your cylinder with just three taps, directly from your smartphone.",
              icon: "🔥",
            },
            {
              title: "Real-Time Tracking",
              desc: "Know exactly when your cylinder will arrive with live delivery updates.",
              icon: "📍",
            },
            {
              title: "Secure Payments",
              desc: "Multiple payment options including UPI, Cards, and Net Banking.",
              icon: "💳",
            },
            {
              title: "24/7 Support",
              desc: "Our dedicated emergency and support team is always just a call away.",
              icon: "🎧",
            },
            {
              title: "Booking History",
              desc: "Easily track your consumption pattern and previous orders.",
              icon: "📊",
            },
            {
              title: "Instant Alerts",
              desc: "Get WhatsApp and SMS notifications for every step of your delivery.",
              icon: "⚡",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-100 transition-all duration-300 group cursor-pointer hover:-translate-y-1"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            How It Works
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full mb-16"></div>

          <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
            <div className="hidden md:block absolute top-[28px] left-[10%] w-[80%] h-0.5 bg-orange-100 z-0"></div>
            {[
              {
                step: "1",
                title: "Sign Up",
                desc: "Create your free account in seconds",
              },
              {
                step: "2",
                title: "Link ID",
                desc: "Enter your Consumer No. to link identity",
              },
              {
                step: "3",
                title: "Book",
                desc: "Select and confirm your cylinder order",
              },
              {
                step: "4",
                title: "Receive",
                desc: "Track and receive at your doorstep",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-orange-500/30 mb-6 ring-8 ring-white">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-orange-50/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Smart Benefits for Smart Consumers
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Switching to RedFlame digital booking saves you time, money, and
              hassle. Avoid long queues and never run out of gas again.
            </p>
            <ul className="space-y-5">
              {[
                "No long physical queues at agencies",
                "Save time with 1-click reordering",
                "Assurance of exact weight and seal intact",
                "Safe, contactless digital payments",
              ].map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-gray-800 font-medium text-lg bg-white p-3 rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden ring-1 ring-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -z-10 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-100 rounded-tr-full -z-10 opacity-50"></div>

            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-8 text-white shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-300">
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold tracking-wider text-xl">
                  REDFLAME GAS
                </span>
                <svg
                  className="w-10 h-10 opacity-80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2c0 10 7 13 7 13s-7 7-7 7-7-7-7-7 7-3 7-13z" />
                </svg>
              </div>
              <div className="space-y-2 mb-8">
                <p className="text-orange-100 text-sm font-medium uppercase tracking-widest">
                  Consumer Number
                </p>
                <p className="text-2xl font-mono tracking-widest drop-shadow-sm">
                  RFG • 8921 • 0045
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-orange-100 text-sm font-medium uppercase tracking-widest mb-1">
                    Status
                  </p>
                  <p className="font-bold text-lg">Active Premium</p>
                </div>
                <div className="text-right">
                  <p className="text-orange-100 text-sm font-medium uppercase tracking-widest mb-1">
                    Since
                  </p>
                  <p className="font-bold text-lg">2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to simplify your gas booking?
          </h2>
          <p className="text-gray-400 text-xl mb-10 leading-relaxed">
            Join thousands of happy customers who have switched to the smart way
            of booking LPG cylinders.
          </p>
          {user ? (
            <Link href="/services">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:-translate-y-1">
                Book a Cylinder Now
              </button>
            </Link>
          ) : (
            <Link href="/register">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:-translate-y-1">
                Register Your Account
              </button>
            </Link>
          )}
        </div>
      </section>
      {/* Booking History Preview — visible only for logged-in users */}

      {user && (
        <section className="py-24 px-6 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  Recent Bookings
                </h2>
                <p className="text-gray-500 mt-1">
                  A quick look at your latest cylinder orders.
                </p>
              </div>
              <Link href="/history">
                <button className="inline-flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:shadow-md active:scale-95 whitespace-nowrap">
                  View All History
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {bookingsLoading ? (
                // Skeleton loader
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-2xl p-5 flex gap-4 items-center animate-pulse border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="h-6 w-16 bg-gray-200 rounded-lg" />
                  </div>
                ))
              ) : recentBookings.length === 0 ? (
                // Empty state
                <div className="bg-gray-50 rounded-2xl p-10 text-center border border-dashed border-gray-200">
                  <p className="text-4xl mb-3">📦</p>
                  <p className="font-bold text-gray-700 mb-1">
                    No bookings yet
                  </p>
                  <p className="text-sm text-gray-400 mb-5">
                    Your recent cylinder orders will appear here.
                  </p>
                  <Link href="/book-cylinder">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95">
                      Book Your First Cylinder
                    </button>
                  </Link>
                </div>
              ) : (
                recentBookings.map((booking, index) => {
                  const statusStyle =
                    booking.status === "Delivered"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : booking.status === "Cancelled"
                      ? "bg-red-100 text-red-700 border-red-200"
                      : "bg-orange-100 text-orange-700 border-orange-200";

                  return (
                    <div
                      key={booking.id}
                      className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-orange-100 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center shadow-sm hover:shadow-md transition-all duration-200 group"
                    >
                      {/* Left: Icon + Info */}
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                          {getCylinderIcon(booking.cylinderType)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-mono text-xs font-bold text-gray-400">
                              #{booking.id?.slice(0, 8).toUpperCase()}
                            </span>
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusStyle}`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <p className="font-bold text-gray-900">
                            {booking.cylinderType}
                          </p>
                          <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {formatBookingDate(booking.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Right: Amount + Action */}
                      <div className="flex items-center gap-6 pl-16 sm:pl-0">
                        <div className="text-left sm:text-right">
                          <p className="text-xs text-gray-400 font-semibold uppercase mb-0.5">
                            Total
                          </p>
                          <p className="text-xl font-extrabold text-gray-900">
                            ₹{booking.amount}
                          </p>
                        </div>
                        <Link href="/history">
                          <button className="text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-semibold text-sm transition-colors border border-transparent hover:border-orange-200">
                            {booking.status === "Delivered"
                              ? "Reorder"
                              : "Details"}
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 text-center">
              <Link href="/book-cylinder">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-orange-500/30 active:scale-95 inline-flex items-center gap-2">
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
                    />
                  </svg>
                  Book a New Cylinder
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6 grayscale opacity-50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-8 h-8"
          >
            <path d="M12 2c0 10 7 13 7 13s-7 7-7 7-7-7-7-7 7-3 7-13z" />
          </svg>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            RedFlame
          </span>
        </div>
        <p className="text-gray-500 font-medium tracking-wide">
          © 2026 RedFlame Gas Agency. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

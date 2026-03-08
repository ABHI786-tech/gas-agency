"use client";

import React from "react";
import Link from "next/link";
import Header from "../components/header";

export default function Page() {
  const services = [
    {
      title: "LPG Refill Booking",
      desc: "Instant booking for 14.2kg domestic cylinders with priority delivery.",
      icon: "🔥",
      color: "from-orange-400 to-red-500",
      delay: "delay-100",
    },
    {
      title: "New Connection",
      desc: "Hassle-free new LPG connection with minimal documentation.",
      icon: "✨",
      color: "from-blue-400 to-indigo-500",
      delay: "delay-150",
    },
    {
      title: "Mechanic Service",
      desc: "Certified mechanics for stove repair and safety checks.",
      icon: "🔧",
      color: "from-emerald-400 to-teal-500",
      delay: "delay-200",
    },
    {
      title: "Commercial Use",
      desc: "19kg commercial cylinders for restaurants and hotels.",
      icon: "🏢",
      color: "from-purple-400 to-pink-500",
      delay: "delay-300",
    },
    {
      title: "Name Change/Transfer",
      desc: "Smooth process for transferring ownership or moving locations.",
      icon: "🔄",
      color: "from-amber-400 to-orange-500",
      delay: "delay-500",
    },
    {
      title: "Surrender Cylinder",
      desc: "Safe and secure return process with immediate deposit refund.",
      icon: "🛡️",
      color: "from-slate-400 to-slate-600",
      delay: "delay-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-500 selection:text-white pb-20">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-32 pb-24 px-6 min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
          <span className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-semibold tracking-wider uppercase border border-orange-500/20 inline-block mb-4">
            Premium Offerings
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Services Tailored{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              For You
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Beyond just gas delivery. Explore our comprehensive range of
            services designed for your comfort and safety.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100/50 hover:shadow-2xl hover:shadow-orange-100 hover:-translate-y-2 transition-all duration-300 group cursor-pointer relative overflow-hidden`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.color} opacity-10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500`}
              ></div>

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-3xl mb-8 shadow-lg group-hover:rotate-6 transition-transform group-hover:scale-110`}
              >
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-8">
                {service.desc}
              </p>

              <div className="flex items-center text-orange-600 font-semibold group/link">
                <span>Explore Service</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support / Safety CTA Section */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-orange-500/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] opacity-10 pointer-events-none"></div>

          <div className="md:w-2/3 space-y-6 relative z-10 text-center md:text-left mb-10 md:mb-0">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-2 text-3xl text-white">
              🚨
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Experiencing Gas Leakage or Emergency?
            </h2>
            <p className="text-orange-100 text-lg md:text-xl font-light max-w-xl">
              Do not panic. Turn off your stove and regulator immediately. Open
              doors and windows. Do not light a match.
            </p>
          </div>

          <div className="md:w-1/3 flex flex-col items-center md:items-end justify-center relative z-10 w-full">
            <a href="tel:1906" className="group w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-red-600 border border-white/30 px-8 py-5 rounded-2xl font-bold text-xl md:text-2xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-4">
                <svg
                  className="w-8 h-8 group-hover:animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Dial 1906
              </button>
            </a>
            <p className="text-white/80 mt-4 font-medium text-sm text-center">
              Toll-free • 24/7 Available
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

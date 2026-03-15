"use client";

import React, { useState } from "react";
import Header from "@/app/components/header";

export default function SafetyPage() {
  const [activeVideoTab, setActiveVideoTab] = useState(0);

  const videos = [
    {
      title: "How to Detect a Gas Leak Safely",
      desc: "Learn the proper technique for identifying potential LPG leaks without using open flames.",
      duration: "3:45",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1584985289945-814bfbaf6424?auto=format&fit=crop&q=80&w=800", // Using Unsplash for premium placeholder
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Connecting a New Cylinder",
      desc: "Step-by-step instructions on how to safely connect a fresh LPG cylinder to your stove.",
      duration: "5:12",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Emergency Shut-off Guide",
      desc: "Critical steps to take immediately if you suspect a significant gas leak or fire risk.",
      duration: "2:30",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517722014278-c256a91a6fba?auto=format&fit=crop&q=80&w=800",
      color: "from-red-500 to-rose-500",
    },
  ];

  const safetyTools = [
    {
      name: "ISI Certified Suraksha Hose",
      desc: "Steel wire reinforced, fire retardant, and weather resistant. Replace every 5 years.",
      icon: "🐍",
      badge: "Essential",
      imageUrl:
        "https://images.unsplash.com/photo-1585832770485-e68a5dbcf50d?auto=format&fit=crop&q=80&w=600",
      price: 199,
      originalPrice: 299,
      rating: 4.8,
      reviews: 1250,
    },
    {
      name: "LPG Leakage Detector",
      desc: "Smart plug-in alarm that sounds a loud 85dB siren when gas concentration exceeds safe limits.",
      icon: "🚨",
      badge: "Highly Recommended",
      imageUrl:
        "https://images.unsplash.com/photo-1650551182991-b07558247564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGdhcyUyMGxlYWthZ2UlMjBkZXRlY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
      price: 799,
      originalPrice: 1299,
      rating: 4.6,
      reviews: 840,
    },
    {
      name: "Fire Extinguisher (ABC Type)",
      desc: "Dry chemical powder extinguisher suitable for tackling initial stages of kitchen and gas fires.",
      icon: "🧯",
      badge: "Must Have",
      imageUrl:
        "https://images.unsplash.com/photo-1595306394931-b35768661692?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 1299,
      originalPrice: 1999,
      rating: 4.9,
      reviews: 3200,
    },
    {
      name: "Standard LPG Regulator",
      desc: "High-quality pressure regulator ensuring consistent and safe flow from cylinder to stove.",
      icon: "⚙️",
      badge: "Essential",
      imageUrl: "/images/regulator.webp",
      price: 349,
      originalPrice: 499,
      rating: 4.7,
      reviews: 2100,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-500 selection:text-white pb-20">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-32 pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm uppercase tracking-widest">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Protect Your Home
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
            Safety is Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              First Priority
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Empowering you with the knowledge, tools, and best practices to
            ensure a secure and worry-free LPG experience in your household.
          </p>
        </div>
      </section>

      {/* Emergency Action Plan Banner - Overlapping Hero */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 shadow-2xl shadow-red-600/30 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex items-center gap-6 z-10">
            <div className="w-16 h-16 bg-white shrink-0 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              ⚠️
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Smell Gas? Act Immediately!
              </h2>
              <p className="text-red-100 font-medium">
                Do not panic. Do not light a match. Do not switch any electrical
                appliances on or off.
              </p>
            </div>
          </div>

          <div className="shrink-0 z-10 w-full md:w-auto">
            <a href="tel:1906">
              <button className="w-full md:w-auto bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3">
                <svg
                  className="w-6 h-6 animate-pulse"
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
                Call Emergency 1906
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Video Demonstrations */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Interactive Video Guides
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed text-balance">
            Watch our expert technicians demonstrate essential safety
            procedures. Visual learning is the best way to prepare for
            real-world scenarios.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Player Area (Mockup) */}
          <div className="lg:col-span-8 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative group aspect-video flex flex-col justify-end border border-gray-800">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-overlay"
              style={{
                backgroundImage: `url(${videos[activeVideoTab].thumbnailUrl})`,
              }}
            ></div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-orange-500 hover:scale-110 transition-all shadow-2xl group/btn ring-1 ring-white/50 hover:ring-orange-400">
                <svg
                  className="w-8 h-8 text-white ml-2 transition-transform group-hover/btn:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            <div className="relative z-20 p-8 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pt-32">
              <span
                className={`inline-block px-3 py-1 rounded-md text-white text-xs font-bold uppercase tracking-wider mb-3 bg-gradient-to-r ${videos[activeVideoTab].color}`}
              >
                Featured Guide
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">
                {videos[activeVideoTab].title}
              </h3>
              <p className="text-gray-300 max-w-2xl text-lg">
                {videos[activeVideoTab].desc}
              </p>
            </div>
          </div>

          {/* Video Playlist Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            <h3 className="font-bold text-gray-900 text-xl pl-2 mb-2">
              Up Next
            </h3>
            {videos.map((video, idx) => (
              <div
                key={idx}
                onClick={() => setActiveVideoTab(idx)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border flex gap-4 items-center group
                  ${
                    activeVideoTab === idx
                      ? "bg-white border-orange-200 shadow-lg shadow-orange-100/50 relative overflow-hidden"
                      : "bg-gray-50 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-md"
                  }`}
              >
                {activeVideoTab === idx && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div>
                )}

                <div
                  className="w-28 h-20 rounded-xl bg-cover bg-center shrink-0 border border-gray-200 shadow-sm relative overflow-hidden"
                  style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white/80"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-medium tracking-wide backdrop-blur-sm">
                    {video.duration}
                  </div>
                </div>

                <div>
                  <h4
                    className={`font-bold line-clamp-2 leading-tight ${
                      activeVideoTab === idx ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {video.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Guidelines (Do's and Don'ts) */}
      <section className="py-24 bg-white border-y border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/pattern.svg')] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Essential Guidelines
            </h2>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Do's */}
            <div className="bg-green-50/50 rounded-3xl p-8 lg:p-12 border border-green-100 shadow-lg shadow-green-100/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md shadow-green-500/30 shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-extrabold text-green-800">
                  Do This
                </h3>
              </div>

              <ul className="space-y-6">
                {[
                  {
                    title: "Keep Upright",
                    desc: "Always keep the cylinder in a vertical position on a flat surface.",
                  },
                  {
                    title: "Ventilation",
                    desc: "Ensure your kitchen is well-ventilated with windows open while cooking.",
                  },
                  {
                    title: "Check Seal",
                    desc: "Always check the company seal and safety cap when receiving a refill.",
                  },
                  {
                    title: "Turn Off Nightly",
                    desc: "Turn off the regulator knob securely every night before going to bed.",
                  },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-green-50 hover:-translate-y-1 transition-transform"
                  >
                    <div className="text-green-500 text-xl font-black mt-0.5">
                      •
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-red-50/50 rounded-3xl p-8 lg:p-12 border border-red-100 shadow-lg shadow-red-100/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-md shadow-red-500/30 shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-extrabold text-red-800">
                  Never Do This
                </h3>
              </div>

              <ul className="space-y-6">
                {[
                  {
                    title: "No Open Flames Near Cylinders",
                    desc: "Never place the cylinder near heat sources, diyas, or open fires.",
                  },
                  {
                    title: "Don't Check Leaks With Fire",
                    desc: "Never use a matchstick to check for leaks. Use soap water instead.",
                  },
                  {
                    title: "Avoid Enclosed Cabinets",
                    desc: "Do not keep the cylinder inside a fully closed, unventilated cabinet.",
                  },
                  {
                    title: "No DIY Repairs",
                    desc: "Never try to repair regulators, valves, or hoses yourself. Call a mechanic.",
                  },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-red-50 hover:-translate-y-1 transition-transform"
                  >
                    <div className="text-red-500 text-xl font-black mt-0.5">
                      ⊗
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Safety Gear Store */}
      <section className="py-24 max-w-7xl mx-auto px-6 bg-gray-50/50 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/50 text-orange-600 font-bold text-sm uppercase tracking-widest mb-4 border border-orange-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Official Store
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Shop Certified Safety Gear
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Invest in these certified safety tools to ensure maximum
              protection for your kitchen and loved ones. Guaranteed quality &
              returns.
            </p>
          </div>
          <button className="bg-white border-2 border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-600 px-8 py-4 rounded-xl font-bold transition-all shadow-sm shrink-0 flex items-center gap-2 group">
            View All Products
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-orange-100 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                  {/* {Math.round(
                    ((tool.originalPrice || tool.price * 1.3 - tool.price) /
                      (tool.originalPrice || tool.price * 1.3)) *
                      100,
                  )} */}
                  {Math.round(
                    ((tool.originalPrice - tool.price) / tool.originalPrice) *
                      100,
                  )}
                  % OFF
                </span>
              </div>
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl z-20 shadow-sm">
                {tool.badge}
              </div>

              <div className="w-full h-56 bg-gray-50 bg-cover bg-center relative overflow-hidden flex items-center justify-center p-6 border-b border-gray-50">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${tool.imageUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>

                {/* Fallback Icon badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-xl ring-1 ring-white/50 group-hover:opacity-0 transition-opacity duration-300">
                  {tool.icon}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(Math.floor(tool.rating || 5))}
                    {"☆".repeat(5 - Math.floor(tool.rating || 5))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium ml-1">
                    ({tool.reviews || 800})
                  </span>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                  {tool.desc}
                </p>

                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span className="text-gray-400 text-sm line-through decoration-red-500/50">
                      ₹{tool.originalPrice || (tool.price * 1.3).toFixed(0)}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-gray-900 tracking-tight">
                        ₹{tool.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button className="py-3 bg-gray-50 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200">
                    Details
                  </button>
                  <button className="py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center justify-center gap-2">
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

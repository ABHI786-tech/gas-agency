"use client";

import React, { useState } from "react";
import Header from "@/app/components/header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Mock API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });

      // Reset status after a few seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      title: "Talk to Sales",
      desc: "Interested in our commercial bulk connections? Just pick up the phone to chat with a member of our sales team.",
      linkText: "+91 800-123-4567",
      linkUrl: "tel:+918001234567",
      icon: "📞",
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Contact Support",
      desc: "Sometimes you need a little help. Dive into our support center or reach out directly to our dedicated team.",
      linkText: "support@redflame.com",
      linkUrl: "mailto:support@redflame.com",
      icon: "✉️",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Emergency Response",
      desc: "For gas leakages or immediate hazards, our 24/7 dedicated emergency response team is available immediately.",
      linkText: "Dial 1906 (Toll Free)",
      linkUrl: "tel:1906",
      icon: "🚨",
      color: "from-red-600 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-500 selection:text-white pb-20">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-32 pb-48 px-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
          <span className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-semibold tracking-wider uppercase border border-orange-500/20 inline-block mb-4">
            We're Here For You
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about our services, need to track a cylinder, or
            looking to partner with us? Our team is ready to answer all your
            questions.
          </p>
        </div>
      </section>

      {/* Main Content Area: Cards & Form */}
      <section className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Methods Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} text-white flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  {method.desc}
                </p>
                <a
                  href={method.linkUrl}
                  className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                >
                  {method.linkText}
                  <svg
                    className="w-4 h-4 ml-1"
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
                </a>
              </div>
            ))}

            {/* Address Card */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-8 border border-orange-200/50">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-xl">🏢</span> Headquarters
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                RedFlame Gas Agency Main Office
                <br />
                123 Innovation Drive, Sector 45
                <br />
                Tech Park, Metro City 400012
              </p>
              <div className="pt-4 border-t border-orange-200/50">
                <p className="text-sm font-medium text-gray-900">
                  Working Hours
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Mon-Sat: 9:00 AM - 6:00 PM
                </p>
                <p className="text-sm text-gray-600">
                  Sun: Closed (Emergency Only)
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 h-full">
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                  Send us a Message
                </h2>
                <p className="text-gray-500">
                  Fill out the form below and our customer service team will get
                  back to you within 24 hours.
                </p>
              </div>

              {submitStatus === "success" && (
                <div className="mb-8 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3 animate-fade-in">
                  <svg
                    className="w-6 h-6 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p className="font-medium">
                    Thank you! Your message has been sent successfully. We'll be
                    in touch soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 ml-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 ml-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Subject Select */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-700 ml-1"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Booking Issue">
                        Booking Issue / Delay
                      </option>
                      <option value="New Connection">
                        New Connection Enquiry
                      </option>
                      <option value="Commercial Inquiry">
                        Commercial Bulk Inquiry
                      </option>
                      <option value="Feedback">Feedback & Suggestions</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-gray-500">
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
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700 ml-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-5 rounded-2xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? "opacity-80 cursor-not-allowed"
                      : "hover:-translate-y-1"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
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
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

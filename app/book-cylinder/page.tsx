"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { createBooking, getCylinderPrice } from "@/app/lib/firestore";
import { toast } from "react-toastify";

export default function BookCylinderPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [cylinderType, setCylinderType] = useState("14.2kg Domestic");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to book a cylinder.");
      return;
    }
    console.log("user", user);
    console.log("user.uid", user.uid);
    const isOnlinePayment = paymentMethod === "upi" || paymentMethod === "card";
    if (isOnlinePayment && !paymentVerified) {
      toast.error("Please complete and verify the online payment first.");
      return;
    }
    setIsSubmitting(true);
    try {
      const paymentStatus = isOnlinePayment ? "Paid" : "Pending";
      const amount = getCylinderPrice(cylinderType);

      console.log("Creating booking with data:", {
        userId: user.uid,
        cylinderType,
        address,
        paymentMethod,
        amount,
        status: "Pending",
      });

      const id = await createBooking({
        userId: user.uid,
        cylinderType,
        address,
        paymentMethod,
        amount,
        status: "Pending",
        paymentStatus,
        adminStatus: "Pending",
      });

      setBookingId(id);
      setIsSuccess(true);
      toast.success("Booking confirmed! 🎉");
    } catch (err: any) {
      console.error("Critical booking failure:", err);
      toast.error(`Booking failed: ${err.message || "Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-500 selection:text-white pb-20">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-24 pb-16 px-6 min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
            Book Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Cylinder
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Fast, secure, and hassle-free LPG delivery right to your doorstep.
          </p>
        </div>
      </section>

      {/* Booking Form Content */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
          {isSuccess ? (
            <div className="text-center py-12 animate-fade-in-up">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-green-500"
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
                Your {cylinderType} cylinder has been successfully booked and
                will be delivered to your address soon.
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 max-w-md mx-auto border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500">Booking ID:</span>
                  <span className="font-bold font-mono text-sm">
                    #{bookingId.slice(0, 10).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500">Estimated Delivery:</span>
                  <span className="font-semibold">Tomorrow by 5 PM</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-gray-500">Amount to Pay:</span>
                  <span className="font-extrabold text-orange-600 text-xl">
                    ₹{getCylinderPrice(cylinderType)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/history">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/30 active:scale-95 w-full sm:w-auto">
                    View History
                  </button>
                </Link>
                <Link href="/">
                  <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-3.5 rounded-xl font-bold transition-all active:scale-95 w-full sm:w-auto">
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 -z-10 rounded-full transition-all duration-500"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>

                {[
                  { num: 1, label: "Details" },
                  { num: 2, label: "Address" },
                  { num: 3, label: "Payment" },
                ].map((s) => (
                  <div key={s.num} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ring-4 ring-white ${
                        step >= s.num
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > s.num ? "✓" : s.num}
                    </div>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        step >= s.num ? "text-orange-600" : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Cylinder Type */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Select Cylinder Type
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        {
                          type: "14.2kg Domestic",
                          price: `₹${getCylinderPrice("14.2kg Domestic")}`,
                          desc: "Ideal for daily home cooking",
                          icon: "🏠",
                        },
                        {
                          type: "19kg Commercial",
                          price: `₹${getCylinderPrice("19kg Commercial")}`,
                          desc: "Perfect for restaurants & businesses",
                          icon: "🏢",
                        },
                        {
                          type: "5kg Chhotu",
                          price: `₹${getCylinderPrice("5kg Chhotu")}`,
                          desc: "Portable cylinder for small needs",
                          icon: "🎒",
                        },
                        {
                          type: "10 kg Fiber Cylinder",
                          price: `₹${getCylinderPrice("10kg-fiber")}`,
                          desc: "Portable cylinder for small needs",
                          icon: "🧴",
                        },
                      ].map((cy, idx) => (
                        <div
                          key={idx}
                          onClick={() => setCylinderType(cy.type)}
                          className={`p-6 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
                            cylinderType === cy.type
                              ? "border-orange-500 bg-orange-50 shadow-md transform scale-[1.02]"
                              : "border-gray-100 hover:border-orange-200 hover:bg-gray-50"
                          }`}
                        >
                          <div className="text-3xl mb-3">{cy.icon}</div>
                          <h4 className="font-bold text-lg text-gray-900">
                            {cy.type}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1 mb-3">
                            {cy.desc}
                          </p>
                          <p className="font-extrabold text-xl text-orange-600">
                            {cy.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery Address */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Delivery Address
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Where should we deliver your {cylinderType} cylinder?
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Complete Address
                        </label>
                        <textarea
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter house no, building name, street, area..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all h-32 resize-none"
                        ></textarea>
                      </div>
                      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 items-start border border-blue-100">
                        <svg
                          className="w-6 h-6 shrink-0 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p className="text-sm">
                          Please ensure someone is available at this address to
                          receive the delivery and make the payment if choosing
                          Cash on Delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Payment Method
                    </h3>
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl">
                          🔥
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {cylinderType}
                          </p>
                          <p className="text-sm text-gray-500">
                            Standard Delivery
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="text-2xl font-extrabold text-orange-600">
                          ₹{getCylinderPrice(cylinderType)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          id: "upi",
                          label: "UPI / QR Code",
                          icon: "📱",
                          desc: "Pay via Google Pay, PhonePe, Paytm",
                        },
                        {
                          id: "card",
                          label: "Credit / Debit Card",
                          icon: "💳",
                          desc: "Visa, Mastercard, RuPay accepted",
                        },
                        {
                          id: "cash",
                          label: "Cash on Delivery",
                          icon: "💵",
                          desc: "Pay when cylinder is delivered",
                        },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all ${
                            paymentMethod === method.id
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => {
                              setPaymentMethod(e.target.value);
                              setPaymentVerified(false);
                            }}
                            className="hidden"
                          />
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 transition-colors ${
                              paymentMethod === method.id
                                ? "border-orange-500"
                                : "border-gray-300"
                            }`}
                          >
                            {paymentMethod === method.id && (
                              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 flex justify-between items-center">
                            <div>
                              <p className="font-bold text-gray-900">
                                {method.label}
                              </p>
                              <p className="text-sm text-gray-500">
                                {method.desc}
                              </p>
                            </div>
                            <div className="text-2xl opacity-70">
                              {method.icon}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Simple simulated payment gateway for online methods */}
                    {paymentMethod !== "cash" && (
                      <div className="mt-8 bg-white rounded-2xl border border-orange-100 p-6 space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          Complete Online Payment
                        </h4>
                        <p className="text-sm text-gray-500 mb-3">
                          Scan the QR / proceed through your preferred app and
                          then click the button below to verify that the payment
                          is completed.
                        </p>
                        <div className="grid sm:grid-cols-[1.2fr,2fr] gap-4 items-center">
                          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-4">
                            <div className="w-32 h-32 bg-gray-100 rounded-xl mb-2 flex items-center justify-center text-gray-400 text-xs text-center">
                              QR / Payment Preview
                            </div>
                            <p className="text-xs text-gray-400">
                              (Integrate real gateway later)
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                              Amount to pay:{" "}
                              <span className="font-bold text-orange-600">
                                ₹{getCylinderPrice(cylinderType)}
                              </span>
                            </p>
                            <button
                              type="button"
                              onClick={() => setPaymentVerified(true)}
                              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                paymentVerified
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
                              }`}
                            >
                              {paymentVerified
                                ? "Payment Marked as Verified"
                                : "I Have Completed the Payment"}
                            </button>
                            <p className="text-xs text-gray-400">
                              This is a test payment flow. In production, hook
                              this step to your real payment gateway&apos;s
                              success callback.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Form Navigation Controls */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="text-gray-500 hover:text-gray-900 font-semibold px-6 py-3 transition-colors flex gap-2 items-center"
                    >
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
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                      Back
                    </button>
                  ) : (
                    <div></div> // Empty div to keep alignment
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (step === 2 && !address.trim()) {
                          toast.error("Please enter a delivery address.");
                          return;
                        }
                        setStep(step + 1);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                    >
                      Next Step
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
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 relative overflow-hidden group"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm Booking
                          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

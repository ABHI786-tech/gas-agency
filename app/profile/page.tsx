"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import {
  getUserProfile,
  updateUserProfile,
  getUserBookings,
  type UserProfile,
  type Booking,
} from "@/app/lib/firestore";
import { toast } from "react-toastify";
import Header from "../components/header";

/* ─── Stat Card ─── */
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ProfilePage() {
  const router = useRouter();

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [editMode, setEditMode] = useState(false);

  /* Editable form state */
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");

  /* ── Auth listener ── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setAuthUser(user);
      try {
        const [prof, bookingList] = await Promise.all([
          getUserProfile(user.uid),
          getUserBookings(user.uid),
        ]);
        setProfile(prof);
        setBookings(bookingList);
        if (prof) {
          setFormName(prof.name || "");
          setFormPhone(prof.phone || "");
          setFormAddress(prof.address || "");
        }
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [router]);

  /* ── Save handler ── */
  const handleSave = async () => {
    if (!authUser) return;
    if (!formName.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      await updateUserProfile(authUser.uid, {
        name: formName.trim(),
        phone: formPhone.trim(),
        address: formAddress.trim(),
      });
      // Also sync displayName in Firebase Auth
      await updateProfile(authUser, { displayName: formName.trim() });

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: formName.trim(),
              phone: formPhone.trim(),
              address: formAddress.trim(),
            }
          : prev,
      );
      setEditMode(false);
      toast.success("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormName(profile?.name || "");
    setFormPhone(profile?.phone || "");
    setFormAddress(profile?.address || "");
    setEditMode(false);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut(auth);
    router.push("/login");
  };

  /* ── Derived ── */
  const displayName = profile?.name || authUser?.displayName || "User";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt.toDate()).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "—";
  const delivered = bookings.filter((b) => b.status === "Delivered").length;
  const pending = bookings.filter(
    (b) => b.status === "Pending" || b.status === "Confirmed",
  ).length;

  /* ── Skeleton ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 pt-32 space-y-6 animate-pulse">
          <div className="bg-white rounded-3xl p-8 flex gap-6 items-center shadow border border-gray-100">
            <div className="w-24 h-24 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-20 border border-gray-100"
              />
            ))}
          </div>
          <div className="bg-white rounded-3xl h-64 border border-gray-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-500 selection:text-white pb-28">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white space-y-2">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest">
            My Account
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Your Profile
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-10 space-y-6">
        {/* ── Avatar card ── */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-orange-200">
              {initials}
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white bg-green-400" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-gray-900">
              {displayName}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{authUser?.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  profile?.connectionType === "Commercial"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {profile?.connectionType ?? "Domestic"} Connection
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                Member since {memberSince}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <Link href="/book-cylinder">
              <button className="w-full px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95">
                🔥 New Booking
              </button>
            </Link>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="px-5 py-2.5 border-2 border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600 text-sm font-bold rounded-xl transition-all active:scale-95"
            >
              {signingOut ? "Signing out…" : "Sign Out"}
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            icon="📦"
            label="Total"
            value={bookings.length}
            color="bg-orange-50"
          />
          <StatCard
            icon="✅"
            label="Delivered"
            value={delivered}
            color="bg-green-50"
          />
          <StatCard
            icon="⏳"
            label="Pending"
            value={pending}
            color="bg-yellow-50"
          />
        </div>

        {/* ── Personal Info (Editable) ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm">
                👤
              </span>
              Personal Information
            </h2>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-orange-600 border border-orange-200 hover:bg-orange-50 transition-all"
              >
                ✏️ Edit
              </button>
            )}
          </div>

          <div className="space-y-5">
            {/* Name — editable */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm font-medium transition-all"
                />
              ) : (
                <p className="px-4 py-3 rounded-xl bg-gray-50 text-sm font-semibold text-gray-900 border border-gray-100">
                  {profile?.name || "—"}
                </p>
              )}
            </div>

            {/* Email — always read-only */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5 flex items-center gap-2">
                Email Address
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                  Read-only
                </span>
              </label>
              <p className="px-4 py-3 rounded-xl bg-gray-50 text-sm font-semibold text-gray-500 border border-gray-100 cursor-not-allowed">
                {authUser?.email || "—"}
              </p>
            </div>

            {/* Phone — editable */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">
                Phone Number
              </label>
              {editMode ? (
                <input
                  type="tel"
                  value={formPhone}
                  maxLength={10}
                  onChange={(e) =>
                    setFormPhone(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm font-medium transition-all"
                  placeholder="10-digit mobile number"
                />
              ) : (
                <p className="px-4 py-3 rounded-xl bg-gray-50 text-sm font-semibold text-gray-900 border border-gray-100">
                  {profile?.phone || "Not provided"}
                </p>
              )}
            </div>

            {/* Address — editable */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">
                Delivery Address
              </label>
              {editMode ? (
                <textarea
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm font-medium transition-all resize-none"
                  placeholder="House No., Street, City, Pincode"
                />
              ) : (
                <p className="px-4 py-3 rounded-xl bg-gray-50 text-sm font-semibold text-gray-900 border border-gray-100 min-h-[60px]">
                  {profile?.address || "Not provided"}
                </p>
              )}
            </div>

            {/* Connection Type — read-only */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5 flex items-center gap-2">
                Connection Type
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                  Read-only
                </span>
              </label>
              <p className="px-4 py-3 rounded-xl bg-gray-50 text-sm font-semibold text-gray-500 border border-gray-100 cursor-not-allowed">
                {profile?.connectionType || "Domestic"}
              </p>
            </div>
          </div>

          {/* Edit action buttons */}
          {editMode && (
            <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex-1 py-3 rounded-xl font-bold text-white transition-all active:scale-95 ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-200"
                }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Saving…
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          )}
        </div>

        {/* ── Recent Bookings ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm">
                📋
              </span>
              Recent Bookings
            </h2>
            <Link
              href="/history"
              className="text-orange-500 hover:text-orange-600 text-sm font-semibold"
            >
              View all →
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p className="text-4xl mb-3">📦</p>
              <p className="font-semibold">No bookings yet</p>
              <p className="text-sm mt-1">
                Your booking history will appear here.
              </p>
              <Link href="/book-cylinder">
                <button className="mt-4 px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 rounded-xl text-sm font-bold transition-all">
                  Book a Cylinder
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b) => {
                const statusColor: Record<string, string> = {
                  Pending: "bg-yellow-100 text-yellow-700",
                  Confirmed: "bg-blue-100 text-blue-700",
                  Delivered: "bg-green-100 text-green-700",
                  Cancelled: "bg-red-100 text-red-700",
                };
                return (
                  <div
                    key={b.id}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🔥</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">
                          {b.cylinderType}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          #{b.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900 text-sm">
                        ₹{b.amount}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          statusColor[b.status] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

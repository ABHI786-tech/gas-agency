"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile, UserCredential } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  connectionType: "Domestic" | "Commercial";
}

const Register: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    connectionType: "Domestic",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Input handler
  const inputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      alert("Registration Successful ✅");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        connectionType: "Domestic",
      });

      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message.replace("Firebase:", ""));
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-200 p-6">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-extrabold text-center mb-6 text-orange-700">
            Gas Agency Registration
          </h2>

          {/* Name */}
          <div className="mb-3">
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={inputHandler}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="font-semibold">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={inputHandler}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter mobile number"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={inputHandler}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="font-semibold">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={inputHandler}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter address"
              required
            />
          </div>

          {/* Connection Type */}
          <div className="mb-4">
            <label className="font-semibold">Connection Type</label>
            <select
              name="connectionType"
              value={formData.connectionType}
              onChange={inputHandler}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Domestic">Domestic</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-orange-600 font-bold"
            >
              Login
            </button>
          </p>
        </form>
      </div>

      {/* Right - Image */}
      <div className="flex-1 hidden md:block relative min-h-screen">
        <Image
          src="/images/register.jpg"
          alt="Gas Agency"
          fill
          className="object-cover opacity-80"
        />
      </div>
    </div>
  );
};

export default Register;
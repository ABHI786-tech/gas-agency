"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Input Handler
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Login Submit
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      alert("Login Successful ✅");
      router.push("/");
    } catch (error: any) {
      console.error(error);
      alert(error.message?.replace("Firebase:", ""));
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Handler
  const forgotPasswordHandler = async (): Promise<void> => {
    if (!formData.email) {
      alert("Please enter your email first!");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      alert("Password reset email sent 📩");
    } catch (error: any) {
      alert(error.message?.replace("Firebase:", ""));
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-blue-50 p-6">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-extrabold text-center mb-6 text-orange-600">
            Login Now
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-md font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={inputHandler}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-md font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <button
              type="button"
              onClick={forgotPasswordHandler}
              className="text-sm text-orange-500 hover:underline font-semibold"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-800 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register */}
          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-orange-500 hover:underline font-bold"
            >
              Register
            </button>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 hidden md:block relative min-h-screen">
        <Image
          src="/images/register-bg.jpg"
          alt="login Illustration"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>
    </div>
  );
};

export default Login;
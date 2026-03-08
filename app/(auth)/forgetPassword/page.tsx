"use client";
import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomInput } from "@/app/common/CustomInput";
import { toast } from "react-toastify";

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Send the reset email using Firebase
      await sendPasswordResetEmail(auth, data.email);

      toast.success("Password reset email sent! 📩 Check your inbox.");

      // Optionally redirect the user back to the login page
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message?.replace("Firebase:", ""));
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-extrabold text-center mb-2 text-orange-600">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          {/* Email Input */}
          <CustomInput
            register={register}
            name="email"
            label="Email"
            placeholder="Enter your registered email"
            type="text"
            isRequired={true}
            validation={{
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // More robust email regex
                message: "Please enter a valid email address",
              },
            }}
          />
          {errors.email && (
            <p className="text-red-500 mb-2 mt-1 text-sm font-medium">
              {errors.email.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white py-2 rounded mt-6 hover:bg-orange-800 disabled:opacity-60 transition-colors"
          >
            {isSubmitting ? "Sending Link..." : "Send Reset Link"}
          </button>

          {/* Back to Login */}
          <p className="text-sm text-center mt-6">
            Remembered your password?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-orange-500 hover:underline font-bold px-2"
            >
              Back to Login
            </button>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 hidden md:block relative min-h-screen">
        <Image
          src="/images/register-bg.jpg"
          alt="Forgot Password Illustration"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>
    </div>
  );
};

export default ForgotPassword;

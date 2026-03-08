"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomInput } from "@/app/common/CustomInput";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  phone: number;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (loginMethod === "email") {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password,
        );

        const token = await userCredential.user.getIdToken();
        localStorage.setItem("authToken", token);

        toast.success("Login Successful ✅");
        router.push("/");
      } else {
        toast.error("Phone number authentication is under development.", {
          autoClose: 3000,
        });
      }
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
          className="bg-white p-8 rounded-lg  w-full"
          id="loginForm"
        >
          <h2 className="text-2xl font-extrabold text-center mb-6 text-orange-600">
            Login Now
          </h2>

          {/* Toggle Login Method */}
          <div className="flex bg-gray-100 p-1 rounded-md mb-6">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                loginMethod === "email"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setLoginMethod("email")}
            >
              Email
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                loginMethod === "phone"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setLoginMethod("phone")}
            >
              Mobile Number
            </button>
          </div>

          {loginMethod === "email" ? (
            <>
              {/* Email */}
              <CustomInput
                register={register}
                name="email"
                label="Email"
                placeholder="Enter email"
                type="text"
                isRequired={true}
                validation={{
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /@/,
                    message: "Email is invalid",
                  },
                }}
              />
              {errors.email && (
                <p className="text-red-500 mb-2">{errors.email.message}</p>
              )}
            </>
          ) : (
            <>
              {/* Phone */}
              <CustomInput
                register={register}
                name="phone"
                label="Mobile Number"
                placeholder="Enter mobile number"
                type="tel"
                isRequired={true}
                validation={{
                  required: {
                    value: true,
                    message: "Mobile number is required",
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (
                    (!/^[0-9]$/.test(e.key) && e.key.length === 1) ||
                    (e.currentTarget.value.length >= 10 &&
                      /^[0-9]$/.test(e.key))
                  )
                    e.preventDefault();
                }}
              />
              {errors.phone && (
                <p className="text-red-500 mb-2">{errors.phone.message}</p>
              )}
            </>
          )}

          {/* Password */}
          {loginMethod === "email" && (
            <>
              <CustomInput
                register={register}
                name="password"
                label="Password"
                placeholder="Enter password"
                type="password"
                isRequired={true}
                validation={{
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                }}
              />
              {errors.password && (
                <p className="text-red-500 mb-2">{errors.password.message}</p>
              )}
            </>
          )}

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <button
              type="button"
              onClick={() => router.push("/forgetPassword")}
              className="text-sm text-orange-500 hover:underline font-semibold"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-800 disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Register */}
          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-orange-500 hover:underline font-bold px-2"
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

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomInput } from "@/app/common/CustomInput";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { createUserProfile } from "@/app/lib/firestore";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  connectionType: "Domestic" | "Commercial";
}

const Register: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // 1. Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      // 2. Set display name in Firebase Auth
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      // 3. Save full profile to Firestore `users` collection
      await createUserProfile({
        uid: userCredential.user.uid,
        name: data.name,
        email: data.email,
        phone: String(data.phone),
        address: data.address,
        connectionType: data.connectionType,
      });

      toast.success("Registration Successful ✅");
      router.push("/login");
    } catch (error: any) {
      let message = "Something went wrong";

      if (error.code === "auth/email-already-in-use") {
        message = "Email already exists. Please use another email.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else {
        message = error.message.replace("Firebase:", "");
      }

      toast.error(message);
      console.log("message", message);
    }
  };

  console.log("isSubmitting", isSubmitting);
  console.log("register errors", errors);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 rounded-lg w-full "
          id="registerationForm"
        >
          <h2 className="text-2xl font-extrabold text-center mb-6 text-orange-600">
            Gas Agency Registration
          </h2>

          {/* Name */}
          <CustomInput
            register={register}
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            type="text"
            isRequired={true}
            validation={{
              required: {
                value: true,
                message: "Name is required",
              },

              maxLength: {
                value: 20,
                message: "Name must be at most 20 characters long",
              },
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (!/^[a-zA-Z ]+$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {errors.name && (
            <p className="text-red-500 mb-2">{errors.name.message}</p>
          )}

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
                (e.currentTarget.value.length >= 10 && /^[0-9]$/.test(e.key))
              )
                e.preventDefault();
            }}
          />
          {errors.phone && (
            <p className="text-red-500 mb-2">{errors.phone.message}</p>
          )}

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

          {/* Password */}
          <CustomInput
            register={register}
            name="password"
            label="Password"
            placeholder="Enter password"
            type="text"
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

          {/* Address */}
          <CustomInput
            register={register}
            name="address"
            label="Address"
            placeholder="Enter address"
            type="text"
            isRequired={true}
            validation={{
              required: {
                value: true,
                message: "Address is required",
              },
            }}
          />
          {errors.address && (
            <p className="text-red-500 mb-2">{errors.address.message}</p>
          )}

          {/* Connection Type */}
          <div className="mb-4">
            <label className="font-semibold">Connection Type</label>
            <select
              {...register("connectionType")}
              name="connectionType"
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Domestic">Domestic</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-400"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-orange-600 font-bold px-2"
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

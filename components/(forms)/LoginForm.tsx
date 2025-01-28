"use client";
import { Loader2, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { LoginProps } from "@/types/types";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import TextInput from "../(formInputs)/TextInput";
import PasswordInput from "../(formInputs)/PasswordInput";
import SubmitButton from "../(formInputs)/SubmitButton";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginProps>();
  const params = useSearchParams();
  const returnUrl = params.get("returnUrl") || "/dashboard";
  const [passErr, setPassErr] = useState("");
  const router = useRouter();
  async function onSubmit(data: LoginProps) {
    try {
      setLoading(true);
      setPassErr("");
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setLoading(false);
        toast.error("Sign-in error: Check your credentials");
        setPassErr("Wrong Credentials, Check again");
        // setShowNotification(true);
      } else {
        // Sign-in was successful
        // setShowNotification(false);
        reset();
        setLoading(false);
        toast.success("Login Successful");
        setPassErr("");
        router.push(returnUrl);
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      // toast.error("Its seems something is wrong with your Network");
    }
  }
  return (
    <div className="w-full lg:px-8 px-6 p-2 ">
      <div className="">
        <div className="py-4 text-[#004D40]">
          <h2 className="text-xl lg:text-2xl font-bold leading-9 tracking-tight  ">
            Login in to your account
          </h2>
          <p className="text-xs">Welcome Back, fill in details to login</p>
        </div>
      </div>
      <div className="">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            register={register}
            errors={errors}
            label="Email Address"
            name="email"
            icon={Mail}
            placeholder="email"
          />
          <PasswordInput
            register={register}
            errors={errors}
            label="Password"
            name="password"
            icon={Lock}
            placeholder="password"
            forgotPasswordLink="/forgot-password"
          />
          {passErr && <p className="text-red-500 text-xs">{passErr}</p>}
          <div>
            <SubmitButton
              title="Sign In"
              loadingTitle="Loading Please wait.."
              loading={loading}
              className="w-full"
              loaderIcon={Loader2}
              showIcon={false}
            />
          </div>
        </form>
        <div className="flex items-center py-4 justify-center space-x-1 text-slate-900">
          <div className="h-[1px] w-full bg-slate-200"></div>
          <div className="uppercase">Or</div>
          <div className="h-[1px] w-full bg-slate-200"></div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a Registered ?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-amber-600 hover:text-amber-500"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

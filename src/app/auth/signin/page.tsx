"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import { loginUser, fetchUserData } from "@/state/thunks/auth";
import TextField from "@/components/FormElements/TextField";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomAlert from "@/components/common/notification/Alert";

// Yup validation schema
const schema = Yup.object({
  username: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(4, "Password must be at least 8 characters").required("Password is required"),
}).required();

const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const { status, error: reduxError } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setError(null);
    const { username, password } = data;
    const loginPayload = { username, password };

    try {
      const loginResponse = await dispatch(loginUser(loginPayload)).unwrap();
      if (loginResponse.accessToken) {
        const userResponse = await dispatch(fetchUserData(loginResponse.accessToken)).unwrap();
        if (userResponse) {
          window.location.href = "/dashboard/client";
        }
      } else {
        throw new Error("Failed to retrieve access token");
      }
    } catch (err: any) {
      console.log(err)
      setError(err || "Failed to login. Please check your credentials.");
    }
  };

  return (
    <AuthLayout>


      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Banner Section - Hidden on mobile */}
        <div className="hidden md:block md:w-2/3 relative overflow-hidden">
          <Image
            src="/backgrounds/login_back.png"
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/3 flex items-center justify-center bg-gray-50 p-6 md:p-8">
          <div className="w-full max-w-md space-y-4 md:space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Welcome to <span className="text-lime-600">StartUp</span>
              </h2>
              <p className="text-gray-500 text-sm mt-2">To get started, please login</p>
            </div>
            {error && <CustomAlert title="Opps something went wrong" subtitle={error} type={"error"} ></CustomAlert>}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <TextField
                  type="text"
                  placeholder="Enter your email"
                  error={errors.username?.message}
                  {...register("username")}
                />
              </div>

              <div className="mb-6">
                <TextField
                  type="password"
                  placeholder="Password"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>

              <div className="text-right text-sm">
                <Link href="/auth/forgot-password" title="Forgot Password" className="text-blue-600 hover:underline">Forgot Password?</Link>
              </div>

              <div className="flex space-x-4">

                <CustomButton
                  fullWidth
                  type="submit" variant="solid" isLoading={status === "loading"} disabled={status === "loading"}>
                  Login
                </CustomButton>

                <CustomButton
                  onClick={
                    () => router.push('/auth/signup')
                  }
                  fullWidth type="button" variant="outlined" isLoading={status === "loading"}>
                  Register
                </CustomButton>

              </div>

              <div className="flex items-center gap-2 my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-lg">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_191_13499)">
                      <path
                        d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                        fill="#34A853"
                      />
                      <path
                        d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                        fill="#EB4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_191_13499">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;

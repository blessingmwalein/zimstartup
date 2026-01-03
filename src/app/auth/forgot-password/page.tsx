"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { forgotPasswordAsync } from "@/state/thunks/auth";
import TextField from "@/components/FormElements/TextField";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomAlert from "@/components/common/notification/Alert";

// Yup validation schema
const schema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
}).required();

const ForgotPassword: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { status } = useSelector((state: RootState) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            await dispatch(forgotPasswordAsync(data.email)).unwrap();
            setSuccessMessage("If an account exists with this email, a password reset link has been sent.");
        } catch (err: any) {
            setErrorMessage(err || "Failed to process request.");
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
                                Forgot Password
                            </h2>
                            <p className="text-gray-500 text-sm mt-2">Enter your email to receive a reset link</p>
                        </div>

                        {successMessage && <CustomAlert title="Success" subtitle={successMessage} type={"success"} />}
                        {errorMessage && <CustomAlert title="Error" subtitle={errorMessage} type={"error"} />}

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <TextField
                                    type="text"
                                    placeholder="Enter your email"
                                    error={errors.email?.message}
                                    {...register("email")}
                                />
                            </div>

                            <div className="flex space-x-4">
                                <CustomButton
                                    fullWidth
                                    type="submit" variant="solid" isLoading={status === "loading"} disabled={status === "loading"}>
                                    Send Reset Link
                                </CustomButton>
                            </div>

                            <div className="text-center mt-4">
                                <Link href="/auth/signin" className="text-sm text-blue-600 hover:underline">
                                    Back to Sign In
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;

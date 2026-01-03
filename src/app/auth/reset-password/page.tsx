"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { resetPasswordAsync } from "@/state/thunks/auth";
import TextField from "@/components/FormElements/TextField";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomAlert from "@/components/common/notification/Alert";
import { useSearchParams, useRouter } from "next/navigation";

// Yup validation schema
const schema = Yup.object({
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
}).required();

const ResetPasswordContent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { status } = useSelector((state: RootState) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!token) {
            setErrorMessage("Invalid or missing token.");
            return;
        }

        try {
            await dispatch(resetPasswordAsync({ token, new_password: data.password })).unwrap();
            setSuccessMessage("Password has been reset successfully. Redirecting to login...");
            setTimeout(() => {
                router.push("/auth/signin");
            }, 3000);
        } catch (err: any) {
            console.error('Reset password error:', err);
            const errorMsg = typeof err === 'string' ? err : err?.message || "Failed to reset password.";
            setErrorMessage(errorMsg);
        }
    };

    return (
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
                            Reset Password
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">Enter your new password</p>
                    </div>

                    {successMessage && <CustomAlert title="Success" subtitle={successMessage} type={"success"} />}
                    {errorMessage && <CustomAlert title="Error" subtitle={errorMessage} type={"error"} />}

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <TextField
                                type="password"
                                placeholder="New Password"
                                error={errors.password?.message}
                                {...register("password")}
                            />
                        </div>

                        <div className="mb-6">
                            <TextField
                                type="password"
                                placeholder="Confirm Password"
                                error={errors.confirmPassword?.message}
                                {...register("confirmPassword")}
                            />
                        </div>

                        <div className="flex space-x-4">
                            <CustomButton
                                fullWidth
                                type="submit" variant="solid" isLoading={status === "loading"} disabled={status === "loading"}>
                                Reset Password
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ResetPassword: React.FC = () => {
    return (
        <AuthLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </AuthLayout>
    )
}

export default ResetPassword;

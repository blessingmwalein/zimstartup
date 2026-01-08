import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Instagram,
    Linkedin,
    Twitter,
    Building2,
    ChevronRight,
} from "lucide-react";

import TextField from "@/components/FormElements/TextField";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomAlert from "@/components/common/notification/Alert";

import { useAppDispatch, useAppSelector } from "@/state/store";
import { createCompanyContact } from "@/state/slices/companySlice";
import { setStep, resetCompanyCreation } from "@/state/slices/companyCreationSlice";

// Yup validation schema
const schema = Yup.object({
    instagram: Yup.string().nullable(),
    linkedin: Yup.string().nullable(),
    twitter: Yup.string().nullable(),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    work_email: Yup.string().email("Invalid email address").required("Work email is required"),
    phone1: Yup.number().required("Phone number 1 is required"),
    phone2: Yup.number().nullable(),
    phone3: Yup.number().nullable(),
    address: Yup.string().required("Address is required"),
    address_city: Yup.string().required("City is required"),
    state_code: Yup.number().required("State code is required"),
    region: Yup.string().required("Region is required"),
    country: Yup.string().required("Country is required"),
}).required();

const ContactDetailsStep: React.FC = () => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { companyId, companyName } = useAppSelector((state: any) => state.companyCreation);
    const { marketTypesList, stockExchangeList } = useAppSelector((state: any) => state.companyConfig);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: Record<string, any>) => {
        setError(null);
        setIsSubmitting(true);

        if (!companyId) {
            setError("Company ID is missing. Please go back and save general details.");
            setIsSubmitting(false);
            return;
        }

        const contactDetailsPayload = {
            ...data,
            company_id: companyId,
        };

        try {
            const response = await dispatch(createCompanyContact(contactDetailsPayload)).unwrap();

            if (response.data) {
                toast.success("Company contact details added successfully");
                dispatch(setStep(3)); // Move to Stock Market Details
            } else {
                toast.error("Something went wrong");
            }
        } catch (err: any) {
            setError(err || "Failed to submit company contact details");
            toast.error(err || "Failed to submit company contact details");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto ">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                {/* Step Header */}
                <div className="flex items-center space-x-4 border-b border-gray-50 bg-gray-50/50 p-6">
                    <div className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg ring-4 ring-blue-100">
                        2
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
                        <p className="text-sm text-gray-500">How can we reach {companyName}?</p>
                    </div>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6">
                            <CustomAlert title="Submission Error" subtitle={error} type="error" />
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Email Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <Mail className="mr-2 h-5 w-5 text-blue-600" />
                                Email Addresses
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <TextField
                                    label="Email"
                                    placeholder="company@example.com"
                                    {...register("email")}
                                    error={errors.email?.message}
                                    icon={<Mail className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Work Email"
                                    placeholder="work@example.com"
                                    {...register("work_email")}
                                    error={errors.work_email?.message}
                                    icon={<Mail className="h-5 w-5" />}
                                />
                            </div>
                        </div>

                        {/* Phone Numbers */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <Phone className="mr-2 h-5 w-5 text-blue-600" />
                                Contact Numbers
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <TextField
                                    label="Phone Number 1"
                                    placeholder="Primary phone number"
                                    {...register("phone1")}
                                    error={errors.phone1?.message}
                                    icon={<Phone className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Phone Number 2 (Optional)"
                                    placeholder="Secondary phone number"
                                    {...register("phone2")}
                                    error={errors.phone2?.message}
                                    icon={<Phone className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Phone Number 3 (Optional)"
                                    placeholder="Alternative phone number"
                                    {...register("phone3")}
                                    error={errors.phone3?.message}
                                    icon={<Phone className="h-5 w-5" />}
                                />
                            </div>
                        </div>

                        {/* Social Media Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <Globe className="mr-2 h-5 w-5 text-blue-600" />
                                Social Channels
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <TextField
                                    label="Instagram"
                                    placeholder="Instagram handle"
                                    {...register("instagram")}
                                    error={errors.instagram?.message}
                                    icon={<Instagram className="h-5 w-5" />}
                                />

                                <TextField
                                    label="LinkedIn"
                                    placeholder="LinkedIn profile"
                                    {...register("linkedin")}
                                    error={errors.linkedin?.message}
                                    icon={<Linkedin className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Twitter"
                                    placeholder="Twitter handle"
                                    {...register("twitter")}
                                    error={errors.twitter?.message}
                                    icon={<Twitter className="h-5 w-5" />}
                                />
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                                Office Address
                            </h3>

                            <div className="mb-6">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Address</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-3 text-gray-500">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <textarea
                                        className={`w-full rounded-xl border ${errors.address ? "border-red-500" : "border-gray-200"
                                            } p-3 pl-10 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10`}
                                        rows={3}
                                        placeholder="Company address"
                                        {...register("address")}
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <TextField
                                    label="City"
                                    placeholder="City"
                                    {...register("address_city")}
                                    error={errors.address_city?.message}
                                    icon={<Building2 className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Region"
                                    placeholder="Region"
                                    {...register("region")}
                                    error={errors.region?.message}
                                    icon={<MapPin className="h-5 w-5" />}
                                />

                                <TextField
                                    label="State Code"
                                    placeholder="State code (e.g. 263)"
                                    {...register("state_code")}
                                    error={errors.state_code?.message}
                                    icon={<Building2 className="h-5 w-5" />}
                                />
                            </div>

                            <div className="mt-6">
                                <TextField
                                    label="Country"
                                    placeholder="Country"
                                    {...register("country")}
                                    error={errors.country?.message}
                                    icon={<Globe className="h-5 w-5" />}
                                />
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-6">
                            <CustomButton variant="outline" onClick={() => dispatch(setStep(1))} type="button">
                                Previous
                            </CustomButton>
                            <CustomButton type="submit" disabled={isSubmitting} variant="solid">
                                <span>{isSubmitting ? "Saving..." : "Continue to Next Step"}</span>
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsStep;

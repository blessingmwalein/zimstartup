import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DollarSign, Users, Building2, ChevronRight, PieChart } from "lucide-react";

import Select from "@/components/FormElements/SelectInput";
import TextField from "@/components/FormElements/TextField";
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomAlert from "@/components/common/notification/Alert";

import { useAppDispatch, useAppSelector } from "@/state/store";
import { createCompanyPreviousFunds } from "@/state/slices/companySlice";
import { resetCompanyCreation } from "@/state/slices/companyCreationSlice";

// Yup validation schema
const schema = Yup.object({
    investor_type: Yup.string().required("Investor Type is required"),
    investor_information: Yup.string().required("Investor Information is required"),
    investment_type: Yup.string().required("Investment Type is required"),
    date_of_funds: Yup.date().required("Date of Funds is required"),
    investment_amount: Yup.number().required("Investment Amount is required"),
    investment_currency: Yup.string().required("Investment Currency is required"),
    company_valuation: Yup.number().required("Company Valuation is required"),
    company_valuation_currency: Yup.string().required("Company Valuation Currency is required"),
    valuation_date: Yup.date().required("Valuation Date is required"),
}).required();

const FundsDetailsStep: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { companyId, companyName } = useAppSelector((state) => state.companyCreation);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setError(null);
        setIsSubmitting(true);

        if (!companyId) {
            setError("Company ID is missing. Please go back.");
            setIsSubmitting(false);
            return;
        }

        const fundsPayload = {
            ...data,
            company_id: companyId,
            valuation_date: format(new Date(data.valuation_date), "yyyy-MM-dd"),
            date_of_funds: format(new Date(data.date_of_funds), "yyyy-MM-dd"),
        };

        try {
            const response = await dispatch(createCompanyPreviousFunds(fundsPayload)).unwrap();

            if (response.data) {
                toast.success("Company funds details added successfully");
                finish();
            } else {
                toast.error("Something went wrong");
            }
        } catch (err: any) {
            setError(err || "Failed to submit company funds details");
            toast.error(err || "Failed to submit company funds details");
        } finally {
            setIsSubmitting(false);
        }
    };

    const finish = () => {
        // Clear persistence and redirect
        dispatch(resetCompanyCreation());
        router.push(`/profile/companies/view-company/${companyId}`);
    }

    return (
        <div className="mx-auto ">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                {/* Step Header */}
                <div className="flex items-center space-x-4 border-b border-gray-50 bg-gray-50/50 p-6">
                    <div className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg ring-4 ring-blue-100">
                        4
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Funds & Valuation</h2>
                        <p className="text-sm text-gray-500">Financial history and valuation for {companyName}</p>
                    </div>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6">
                            <CustomAlert title="Submission Error" subtitle={error} type="error" />
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Investor Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <Users className="mr-2 h-5 w-5 text-blue-600" />
                                Investor Details
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <Controller
                                    control={control}
                                    name="investor_type"
                                    render={({ field }) => (
                                        <Select
                                            label="Investor Type"
                                            options={[
                                                { value: "Individual", label: "Individual" },
                                                { value: "Government", label: "Government" },
                                                { value: "Organization", label: "Organization" },
                                            ]}
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select investor type"
                                            error={errors.investor_type?.message}
                                            icon={<Users className="h-5 w-5" />}
                                        />
                                    )}
                                />

                                <TextField
                                    label="Investor Information"
                                    placeholder="Enter investor information"
                                    {...register("investor_information")}
                                    error={errors.investor_information?.message}
                                    icon={<Users className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Investment Type"
                                    placeholder="Enter investment type"
                                    {...register("investment_type")}
                                    error={errors.investment_type?.message}
                                    icon={<Building2 className="h-5 w-5" />}
                                />
                            </div>
                        </div>

                        {/* Investment Details */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <DollarSign className="mr-2 h-5 w-5 text-blue-600" />
                                Funding Details
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <CustomDatePicker
                                    control={control}
                                    name="date_of_funds"
                                    label="Date of Funds"
                                    placeholder="Select date of funds"
                                    error={errors.date_of_funds?.message}
                                />

                                <TextField
                                    label="Investment Amount"
                                    placeholder="Enter investment amount"
                                    type="number"
                                    {...register("investment_amount")}
                                    error={errors.investment_amount?.message}
                                    icon={<DollarSign className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Investment Currency"
                                    placeholder="Enter currency (e.g. USD)"
                                    {...register("investment_currency")}
                                    error={errors.investment_currency?.message}
                                    icon={<DollarSign className="h-5 w-5" />}
                                />
                            </div>
                        </div>

                        {/* Valuation Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <PieChart className="mr-2 h-5 w-5 text-blue-600" />
                                Company Valuation
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <TextField
                                    label="Company Valuation"
                                    placeholder="Enter company valuation"
                                    type="number"
                                    {...register("company_valuation")}
                                    error={errors.company_valuation?.message}
                                    icon={<DollarSign className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Valuation Currency"
                                    placeholder="Enter valuation currency"
                                    {...register("company_valuation_currency")}
                                    error={errors.company_valuation_currency?.message}
                                    icon={<DollarSign className="h-5 w-5" />}
                                />

                                <CustomDatePicker
                                    control={control}
                                    name="valuation_date"
                                    label="Valuation Date"
                                    placeholder="Select valuation date"
                                    error={errors.valuation_date?.message}
                                />
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-6">
                            <div className="flex space-x-4">
                                <CustomButton variant="outline" onClick={() => dispatch(setStep(3))} type="button">
                                    Previous
                                </CustomButton>
                                <CustomButton variant="outline" onClick={finish} type="button">
                                    Finish later
                                </CustomButton>
                            </div>
                            <CustomButton type="submit" disabled={isSubmitting} variant="solid">
                                <span>{isSubmitting ? "Saving..." : "Complete Registration"}</span>
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FundsDetailsStep;

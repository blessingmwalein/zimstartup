import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
    Building2,
    Info,
    MapPin,
    Users,
    Briefcase,
    FileText,
    ChevronRight,
    Globe,
    Plus,
} from "lucide-react";

import TextField from "@/components/FormElements/TextField";
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker";
import Select from "@/components/FormElements/SelectInput";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomAlert from "@/components/common/notification/Alert";

import { useAppDispatch, useAppSelector } from "@/state/store";
import {
    setCompanyId,
    setStep,
    setCompanyName as updateStoredCompanyName,
    updateStepData,
} from "@/state/slices/companyCreationSlice";
import { createNewCompany, submitUpdateCompanyDetails } from "@/state/slices/companySlice";
import { fetchAllConfigs } from "@/state/slices/configSlice";
import type {
    BusinessState,
    CompanyIndustry,
    StockExchangeEntity,
} from "@/state/models/config";

const schema = Yup.object({
    company_abbreviations: Yup.string().required("Company abbreviation is required"),
    company_name: Yup.string().required("Company name is required"),
    company_start_date: Yup.date().required("Company start date is required"),
    company_short_description: Yup.string().required("Company short description is required"),
    industry_id: Yup.string().required("Industry is required"),
    stock_id: Yup.string().required("Stock Market is required"),
    location: Yup.string().required("Location is required"),
    website: Yup.string().required("Website is required"),
    employees: Yup.number()
        .positive("Employees must be a positive number")
        .required("Number of employees is required"),
    business_state_id: Yup.string().required("Business state is required"),
}).required();

const GeneralDetailsStep: React.FC = () => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useAppSelector((state) => state.auth);
    const { industryList, businessStatesList, stockExchangeList } = useAppSelector(
        (state) => state.companyConfig
    );
    const { companyName, stepsData, companyId } = useAppSelector((state) => state.companyCreation);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: stepsData.general || {
            company_name: companyName || "",
        },
    });

    const isFetched = useRef(false);

    useEffect(() => {
        if (!isFetched.current) {
            dispatch(fetchAllConfigs());
            isFetched.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        if (companyName) {
            setValue("company_name", companyName);
        }
    }, [companyName, setValue]);

    const onSubmit = async (data: Record<string, any>) => {
        setError(null);
        setIsSubmitting(true);

        const updatePayload = {
            ...data,
            national_id: user?.national_id,
            company_start_date: format(new Date(data.company_start_date), "yyyy-MM-dd"),
        };

        try {
            let response;
            if (companyId) {
                // Update existing company
                response = await dispatch(submitUpdateCompanyDetails({ data: updatePayload as any, companyId })).unwrap();
            } else {
                // Create new company
                response = await dispatch(createNewCompany(updatePayload as any)).unwrap();
            }

            if (response.data) {
                toast.success(companyId ? "Company details updated successfully" : "Company details added successfully");
                dispatch(updateStepData({ step: "general", data }));
                dispatch(setCompanyId(response.data.company_id || companyId));
                dispatch(updateStoredCompanyName(response.data.company_name));
                dispatch(setStep(2));
            } else {
                toast.error("Something went wrong");
            }
        } catch (err: any) {
            setError(err || "Failed to update company details");
            toast.error(err || "Failed to update company details");
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
                        1
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">General Details</h2>
                        <p className="text-sm text-gray-500">Provide basic information about your company</p>
                    </div>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6">
                            <CustomAlert title="Submission Error" subtitle={error} type="error" />
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Company Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <TextField
                                    label="Company Abbreviations"
                                    placeholder="Enter company abbreviation"
                                    {...register("company_abbreviations")}
                                    error={errors.company_abbreviations?.message}
                                    icon={<Building2 className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Company Name"
                                    placeholder="Enter company name"
                                    {...register("company_name")}
                                    error={errors.company_name?.message}
                                    icon={<Building2 className="h-5 w-5" />}
                                />

                                <CustomDatePicker
                                    control={control}
                                    name="company_start_date"
                                    label="Company Start Date"
                                    placeholder="Select start date"
                                    error={errors.company_start_date?.message}
                                />

                                <div className="w-full">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Company Description
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3 text-gray-500">
                                            <Info className="h-5 w-5" />
                                        </div>
                                        <textarea
                                            className={`w-full rounded-xl border ${errors.company_short_description ? "border-red-500" : "border-gray-200"
                                                } p-3 pl-10 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10`}
                                            rows={3}
                                            placeholder="Brief description of the company"
                                            {...register("company_short_description")}
                                        />
                                        {errors.company_short_description && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.company_short_description.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Industry & Stock Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                                Industry & Stock Market
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <Controller
                                    control={control}
                                    name="industry_id"
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            label="Industry"
                                            options={
                                                industryList?.map((industry: CompanyIndustry) => ({
                                                    value: industry.sector,
                                                    label: industry.sector,
                                                })) || []
                                            }
                                            value={value}
                                            onChange={onChange}
                                            placeholder="Select Industry"
                                            error={errors.industry_id?.message}
                                            icon={<Briefcase className="h-5 w-5" />}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="stock_id"
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            label="Stock Market"
                                            options={[
                                                { value: "None", label: "None" },
                                                ...(stockExchangeList?.map((stock: StockExchangeEntity) => ({
                                                    value: stock.name,
                                                    label: stock.name,
                                                })) || [])
                                            ]}
                                            value={value}
                                            onChange={onChange}
                                            placeholder="Select Stock Market"
                                            error={errors.stock_id?.message}
                                            icon={<Globe className="h-5 w-5" />}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <Info className="mr-2 h-5 w-5 text-blue-600" />
                                Additional Details
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <TextField
                                    label="Location"
                                    placeholder="Company location"
                                    {...register("location")}
                                    error={errors.location?.message}
                                    icon={<MapPin className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Website"
                                    placeholder="https://example.com"
                                    {...register("website")}
                                    error={errors.website?.message}
                                    icon={<Globe className="h-5 w-5" />}
                                />

                                <TextField
                                    label="Employees"
                                    placeholder="Enter number of employees"
                                    type="number"
                                    {...register("employees")}
                                    error={errors.employees?.message}
                                    icon={<Users className="h-5 w-5" />}
                                />

                                <Controller
                                    control={control}
                                    name="business_state_id"
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            label="Business State"
                                            options={
                                                businessStatesList?.map((state: BusinessState) => ({
                                                    value: state.state_name,
                                                    label: state.state_name,
                                                })) || []
                                            }
                                            value={value}
                                            onChange={onChange}
                                            placeholder="Select Business State"
                                            error={errors.business_state_id?.message}
                                            icon={<FileText className="h-5 w-5" />}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-6">
                            <CustomButton variant="outline" onClick={() => dispatch(setStep(0))} type="button">
                                Back
                            </CustomButton>
                            <CustomButton type="submit" disabled={isSubmitting} variant="solid">
                                <span>{isSubmitting ? "Saving..." : "Continue to Contact Details"}</span>
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GeneralDetailsStep;

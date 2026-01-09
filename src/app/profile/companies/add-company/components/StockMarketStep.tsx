import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { DollarSign, Building2, BarChart2, ChevronRight } from "lucide-react";

import Select from "@/components/FormElements/SelectInput";
import CustomDatePicker from "@/components/FormElements/DatePicker/CustomDatePicker";
import TextField from "@/components/FormElements/TextField";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomAlert from "@/components/common/notification/Alert";

import { useAppDispatch, useAppSelector } from "@/state/store";
import { createStockMarketDetails } from "@/state/slices/companySlice";
import { fetchAllConfigs } from "@/state/slices/configSlice";
import { setStep, updateStepData } from "@/state/slices/companyCreationSlice";
import type { MarketType, StockExchangeEntity } from "@/state/models/config";

// Yup validation schema
const schema = Yup.object({
    market_type_id: Yup.string().required("Type of Market is required"),
    listed_date: Yup.date().required("Listed Date is required"),
    listing_capital: Yup.number().required("Listing Capital is required"),
    listing_currency: Yup.string().required("Listing Currency is required"),
    delisted_date: Yup.date().nullable().notRequired(),
    current_market_cap: Yup.number().required("Current Market Capital is required"),
    stock_id: Yup.string().required("Stock Market is required"),
    financial_year_end: Yup.date().required("Financial Year End is required"),
    transfer_secretary: Yup.string().required("Transfer Secretary is required"),
    reporting_currency: Yup.string().required("Reporting Currency is required"),
    ISIN: Yup.string().required("ISIN is required"),
}).required();

const currencies = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "ZAR", label: "ZAR - South African Rand" },
    { value: "ZiG", label: "ZiG - Zimbabwe Gold" },
    { value: "RTGS", label: "RTGS - Real Time Gross Settlement" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "BWP", label: "BWP - Botswana Pula" },
];

const StockMarketStep: React.FC = () => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { companyId, companyName, stepsData } = useAppSelector((state) => state.companyCreation);
    const { marketTypesList, stockExchangeList } = useAppSelector((state) => state.companyConfig);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: stepsData.stock || {},
    });

    const isFetched = useRef(false);

    useEffect(() => {
        if (!isFetched.current) {
            dispatch(fetchAllConfigs());
            isFetched.current = true;
        }
    }, [dispatch]);

    const onSubmit = async (data: any) => {
        setError(null);
        setIsSubmitting(true);

        if (!companyId) {
            setError("Company ID is missing. Please go back.");
            setIsSubmitting(false);
            return;
        }

        const stockMarketPayload = {
            ...data,
            listed_date: format(new Date(data.listed_date), "yyyy-MM-dd"),
            delisted_date: data.delisted_date ? format(new Date(data.delisted_date), "yyyy-MM-dd") : null,
            financial_year_end: format(new Date(data.financial_year_end), "yyyy-MM-dd"),
            company_id: companyId,
        };

        try {
            const response = await dispatch(createStockMarketDetails(stockMarketPayload)).unwrap();

            if (response.data) {
                toast.success("Company stock market details added successfully");
                dispatch(updateStepData({ step: "stock", data }));
                dispatch(setStep(4)); // Move to Funds Details
            } else {
                toast.error("Something went wrong");
            }
        } catch (err: any) {
            setError(err || "Failed to submit company stock market details");
            toast.error(err || "Failed to submit company stock market details");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSkip = () => {
        dispatch(setStep(4));
    }

    return (
        <div className="mx-auto">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                {/* Step Header */}
                <div className="flex items-center space-x-4 border-b border-gray-50 bg-gray-50/50 p-6">
                    <div className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg ring-4 ring-blue-100">
                        3
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Stock Market</h2>
                        <p className="text-sm text-gray-500">Market listing details for {companyName}</p>
                    </div>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6">
                            <CustomAlert title="Submission Error" subtitle={error} type="error" />
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Market Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <BarChart2 className="mr-2 h-5 w-5 text-blue-600" />
                                Listing Details
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <Controller
                                    control={control}
                                    name="market_type_id"
                                    render={({ field }: { field: any }) => (
                                        <Select
                                            label="Type of Market"
                                            options={
                                                marketTypesList?.map((marketType: MarketType) => ({
                                                    value: marketType.name,
                                                    label: marketType.name,
                                                })) || []
                                            }
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select type of market"
                                            error={errors.market_type_id?.message}
                                            icon={<BarChart2 className="h-5 w-5" />}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="stock_id"
                                    render={({ field }: { field: any }) => (
                                        <Select
                                            label="Stock Market"
                                            options={
                                                stockExchangeList?.map((stock: StockExchangeEntity) => ({
                                                    value: stock.name,
                                                    label: stock.name,
                                                })) || []
                                            }
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select Stock Market"
                                            error={errors.stock_id?.message}
                                            icon={<Building2 className="h-5 w-5" />}
                                        />
                                    )}
                                />

                                <CustomDatePicker
                                    control={control}
                                    name="listed_date"
                                    label="Listed Date"
                                    placeholder="Select listed date"
                                    error={errors.listed_date?.message}
                                />
                            </div>
                        </div>

                        {/* Financial Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <DollarSign className="mr-2 h-5 w-5 text-blue-600" />
                                Market Capitalization
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <TextField
                                    label="Listing Capital"
                                    placeholder="Enter listing capital"
                                    type="number"
                                    {...register("listing_capital")}
                                    error={errors.listing_capital?.message}
                                    icon={<DollarSign className="h-5 w-5" />}
                                />

                                <Controller
                                    control={control}
                                    name="listing_currency"
                                    render={({ field }: { field: any }) => (
                                        <Select
                                            label="Listing Currency"
                                            options={currencies}
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select currency"
                                            error={errors.listing_currency?.message}
                                            icon={<DollarSign className="h-5 w-5" />}
                                        />
                                    )}
                                />

                                <TextField
                                    label="Current Market Capital"
                                    placeholder="Enter current market capital"
                                    type="number"
                                    {...register("current_market_cap")}
                                    error={errors.current_market_cap?.message}
                                    icon={<DollarSign className="h-5 w-5" />}
                                />

                                <CustomDatePicker
                                    control={control}
                                    name="delisted_date"
                                    label="Delisted Date"
                                    placeholder="Select delisted date"
                                    error={errors.delisted_date?.message}
                                />

                                <CustomDatePicker
                                    control={control}
                                    name="financial_year_end"
                                    label="Financial Year End"
                                    placeholder="Select financial year end"
                                    error={errors.financial_year_end?.message}
                                />

                                <Controller
                                    control={control}
                                    name="reporting_currency"
                                    render={({ field }: { field: any }) => (
                                        <Select
                                            label="Reporting Currency"
                                            options={currencies}
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select currency"
                                            error={errors.reporting_currency?.message}
                                            icon={<DollarSign className="h-5 w-5" />}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-800 border-b border-gray-50 pb-2">
                                <Building2 className="mr-2 h-5 w-5 text-blue-600" />
                                Compliance & Registration
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <TextField
                                    label="Transfer Secretary"
                                    placeholder="Enter transfer secretary"
                                    {...register("transfer_secretary")}
                                    error={errors.transfer_secretary?.message}
                                    icon={<Building2 className="h-5 w-5" />}
                                />

                                <TextField
                                    label="ISIN"
                                    placeholder="Enter ISIN"
                                    {...register("ISIN")}
                                    error={errors.ISIN?.message}
                                    icon={<Building2 className="h-5 w-5" />}
                                />
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-6">
                            <div className="flex space-x-4">
                                <CustomButton variant="outline" onClick={() => dispatch(setStep(2))} type="button">
                                    Previous
                                </CustomButton>
                                <CustomButton variant="outline" onClick={handleSkip} type="button">
                                    Skip this step
                                </CustomButton>
                            </div>
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

export default StockMarketStep;

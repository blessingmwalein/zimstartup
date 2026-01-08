import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Building2, ChevronRight, CheckCircle, X, Search } from "lucide-react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

import CustomButton from "@/components/Buttons/CustomButton";
import CustomAlert from "@/components/common/notification/Alert";
import Spinner from "@/components/common/Loader/spinner";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { checkIfCompanyExists } from "@/state/slices/companySlice";
import { setCompanyName as setStoredCompanyName, setStep } from "@/state/slices/companyCreationSlice";

// Define Yup schema for form validation
const schema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
});

const CheckCompanyStep: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, error: reduxError } = useAppSelector((state: any) => state.company);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [errorAlert, setErrorAlert] = useState("");
    const [localCompanyName, setLocalCompanyName] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: { companyName: string }) => {
        setErrorAlert("");
        try {
            const response = await dispatch(checkIfCompanyExists(data.companyName)).unwrap();
            if (response.message) {
                setLocalCompanyName(data.companyName);
                setDialogMessage(response.message);
                setDialogVisible(true);
            }
        } catch (error: any) {
            setErrorAlert(error || "An error occurred.");
        }
    };

    const handleRegister = () => {
        dispatch(setStoredCompanyName(localCompanyName));
        dispatch(setStep(1));
    };

    return (
        <div className="relative">
            <section className="relative mt-8 py-16">
                <div className="relative z-10 flex flex-col items-center space-y-6">
                    <div className="mb-2 flex items-center justify-center">
                        <Building2 className="mr-2 h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-800">Let's Make Sure The Company Doesn't Already Exist</h1>
                    </div>
                    <p className="max-w-2xl text-center text-gray-600">
                        Search for the company name to check if it's already registered in our system. If it's not found, you'll
                        be able to register it.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex w-full max-w-4xl items-center overflow-hidden rounded-full border-2 border-gray-200 bg-white p-3 shadow-sm transition-all focus-within:border-blue-500 focus-within:shadow-md"
                    >
                        <div className="pl-4 pr-2 text-gray-500">
                            <Search className="size-6" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter company name to search..."
                            {...register("companyName")}
                            className="flex-grow px-4 py-4 text-gray-700 focus:outline-none"
                        />

                        <div>
                            <CustomButton type="submit" variant="solid" borderRadius="rounded-full">
                                {status === "loading" ? (
                                    <div className="flex flex-row items-center text-center">
                                        <Spinner /> Searching...
                                    </div>
                                ) : (
                                    <span className="font-semibold">Continue</span>
                                )}
                                <ChevronRight />
                            </CustomButton>
                        </div>
                    </form>

                    {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}

                    <div className="max-w-4xl items-center">
                        {errorAlert && <CustomAlert title="Company Search" subtitle={errorAlert} type={"error"} />}
                    </div>
                </div>
            </section>

            {/* Success Dialog */}
            <Transition appear show={dialogVisible} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setDialogVisible(false)}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="absolute right-4 top-4">
                                        <button
                                            type="button"
                                            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                                            onClick={() => setDialogVisible(false)}
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                            <CheckCircle className="h-10 w-10 text-green-600" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900">Great News!</h3>

                                        <div className="mt-4">
                                            <p className="text-gray-600">{dialogMessage}</p>
                                            <p className="mt-2 font-medium text-gray-800">"{localCompanyName}"</p>
                                        </div>

                                        <div className="mt-8 flex w-full justify-center">
                                            <button
                                                onClick={handleRegister}
                                                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                <Building2 className="mr-2 h-5 w-5" />
                                                Register This Company
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                                            onClick={() => setDialogVisible(false)}
                                        >
                                            Search for a different company
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default CheckCompanyStep;

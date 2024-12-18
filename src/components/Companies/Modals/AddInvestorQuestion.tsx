import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../state/store";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addInvestorQuestions } from "../../../../state/slices/companySlice";

const schema = yup.object().shape({
    question_text: yup.string().required("Question is required"),
});

interface InvestorQuestionForm {
    question_text: string;
}

const AddInvestorQuestionDialog: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { status, error: stockError } = useSelector((state: any) => state.company);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InvestorQuestionForm>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: InvestorQuestionForm) => {
        try {
            // Your file upload logic
            const response = dispatch(addInvestorQuestions(data)).unwrap();
            toast.success("Investor question added successfully", {
                position: "bottom-center",
            });
            closeDialog();
        } catch (error) {
            console.error("Error:", error);
            toast.error(error || "Failed to add investor question", {
                position: "bottom-center",
            });
        }
    }

    return (
        <>
            <button
                onClick={openDialog}
                className="flex items-center gap-2 rounded-md border border-orange-500 px-4 py-2 text-orange-500 hover:bg-blue-100"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
                Add Question
            </button>

            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10"
                onClose={closeDialog}
            >
                <div className="fixed inset-0 bg-black bg-opacity-30" />
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
                        <DialogTitle className="text-center text-lg font-medium text-gray-800">
                            Add Investor Question
                        </DialogTitle>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                            <div>
                                <label
                                    htmlFor="question"
                                    className="mb-2 block text-sm font-medium text-gray-800"
                                >
                                    Question
                                </label>
                                <textarea
                                    {...register("question_text")}
                                    id="question"
                                    rows={6}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
                                />
                                {errors.question_text && (
                                    <span className="text-xs text-red-500">
                                        {errors.question_text.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeDialog}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`rounded-md bg-blue-500 px-4 py-2 text-sm text-white ${status === "loading"
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                >
                                    {status === "loading" ? "Processing..." : "Add Question"}

                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default AddInvestorQuestionDialog;

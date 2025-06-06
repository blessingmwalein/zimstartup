"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { handleApiError } from "../../state/services/investment"
import { InvestorTypeData, BasicInfoData, ContactInfoData, CompanyInfoData, AccountVerificationData, CredentialsData, OnboardingStepResponse, submitInvestorType, submitBasicInfo, submitContactInfo, submitCompanyInfo, submitAccountVerification, submitCredentials } from "../../state/services/onboading"
import moment from "moment"


export type OnboardingStep = "type" | "basic" | "contact" | "company" | "account-verification" | "credentials"

export interface OnboardingFormData {
    type?: Partial<InvestorTypeData>
    basic?: Partial<BasicInfoData>
    contact?: Partial<ContactInfoData>
    company?: Partial<CompanyInfoData>
    "account-verification"?: Partial<AccountVerificationData>
    credentials?: Partial<CredentialsData>
}

// Available options matching your project
const investorTypes = [
    "Individual Investor",
    "Institutional Investor",
    "Corporate Investor",
    "Investment Fund",
    "Angel Investor",
    "Venture Capitalist",
]

const titles = ["Mr", "Ms", "Mrs", "Miss", "Dr", "Prof", "Ps"]

export function useOnboarding() {
    const router = useRouter()

    // State management
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [formData, setFormData] = useState<OnboardingFormData>({})
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
    const [initData, setInitData] = useState<any>({}) // Store data passed between steps

    // Loading and error states
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>({})

    // Step configuration
    const stepKeys: OnboardingStep[] = ["type", "basic", "contact",
        // "company", "account-verification", 
        "credentials"]
    const stepTitles = [
        "Investor Type",
        "Basic Information",
        "Contact Details",
        // "Company Information",
        // "Account Verification",
        "Credentials",
    ]

    // Generic error handler
    const handleError = useCallback((err: any, context: string) => {
        const errorMessage = handleApiError(err)
        console.error(`${context}:`, errorMessage)
        setError(errorMessage)
        toast.error(errorMessage)
    }, [])

    // Clear error state
    const clearError = useCallback(() => {
        setError(null)
        setErrors({})
    }, [])

    // Update form data for a specific step
    const updateStepData = useCallback((step: OnboardingStep, data: any) => {
        setFormData((prev) => {
            // Only update if data has actually changed
            const currentStepData = prev[step] || {}
            const hasChanged = JSON.stringify(currentStepData) !== JSON.stringify(data)

            if (!hasChanged) {
                return prev // Return the same object reference if no changes
            }

            return {
                ...prev,
                [step]: { ...data },
            }
        })
    }, [])

    // Submit step data
    const submitStep = useCallback(
        async (step: OnboardingStep, data: any): Promise<OnboardingStepResponse> => {
            setIsSubmitting(true)
            clearError()

            try {
                let response: OnboardingStepResponse
                let payload: any

                switch (step) {
                    case "type":
                        payload = {
                            step: "type",
                            national_id: data.national_id || "",
                            reason: data.reason || "",
                            place: data.place || "",
                        }
                        response = await submitInvestorType(payload)
                        break

                    case "basic":
                        payload = {
                            title: data.title || "",
                            first_name: data.first_name || "",
                            middle_name: data.middle_name || "",
                            nickname: data.nickname || "",
                            last_name: data.last_name || "",
                            gender: data.gender || "",
                            dob: data.dob ? moment(data.dob).format("YYYY-MM-DD") : "",
                            marital_status: data.marital_status || "",
                            nationality: data.nationality || "",
                            national_id: data.national_id || initData.national_id || "",
                        }
                        response = await submitBasicInfo(payload)

                        // Store customer_id from response for next steps
                        if (response.success && response.data?.customer_id) {
                            setInitData((prev: any) => ({
                                ...prev,
                                customer_id: response.data.customer_id,
                                ...response.data,
                            }))
                        }
                        break

                    case "contact":
                        payload = {
                            email: data.email || "",
                            work_email: data.work_email || "",
                            phone1: data.phone1 || "",
                            phone2: data.phone2 || "",
                            address1: data.address1 || "",
                            address2: data.address2 || "",
                            town: data.town || "",
                            city: data.city || "",
                            state: data.state || "",
                            postal_code: data.postal_code || "",
                            customer_id: initData.customer_id, // Use persisted customer_id
                            national_id: data.national_id || initData.national_id || "",
                        }
                        response = await submitContactInfo(payload)
                        break

                    case "company":
                        payload = {
                            company_name: data.company_name || "",
                            position: data.position || "",
                            industry: data.industry || "",
                            annual_income: data.annual_income || 0,
                            customer_id: initData.customer_id, // Use persisted customer_id
                        }
                        response = await submitCompanyInfo(payload, initData.session)
                        break

                    case "account-verification":
                        payload = {
                            verification_type: data.verification_type || "",
                            document_number: data.document_number || "",
                            customer_id: initData.customer_id, // Use persisted customer_id
                        }
                        response = await submitAccountVerification(payload)
                        break

                    case "credentials":
                        payload = {
                            username: data.email || initData.email || "",
                            password: data.password || "",
                            confirm_password: data.confirm_password || "",
                            email: data.email || initData.email || "",
                            national_id: data.national_id || initData.national_id || "",
                            customer_id: initData.customer_id, // Use persisted customer_id
                        }
                        response = await submitCredentials(payload)
                        break

                    default:
                        throw new Error("Invalid step")
                }

                if (response.success) {
                    // Update form data
                    updateStepData(step, data)

                    // Store response data for next steps (including customer_id)
                    setInitData((prev: any) => ({ ...prev, ...response.data }))

                    // Mark step as completed
                    setCompletedSteps((prev) => new Set([...prev, currentStep]))

                    toast.success(response.message || "Step completed successfully!")
                    return response
                } else {
                    // Handle validation errors
                    if (response.errors) {
                        setErrors(response.errors)
                    }
                    throw new Error(response.message || "Submission failed")
                }
            } catch (err) {
                handleError(err, `Failed to submit ${step} information`)
                throw err
            } finally {
                setIsSubmitting(false)
            }
        },
        [currentStep, initData, updateStepData, clearError, handleError],
    )

    // Navigate to next step
    const goToNextStep = useCallback(() => {
        if (currentStep < stepKeys.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }, [currentStep, stepKeys.length])

    // Navigate to previous step
    const goToPreviousStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }, [currentStep])

    // Complete onboarding process
    const completeOnboarding = useCallback(() => {
        toast.success("Onboarding completed successfully!")
        router.push("/auth/signup/complete")
    }, [router])

    // Get current step information
    const getCurrentStepInfo = useCallback(() => {
        const stepKey = stepKeys[currentStep]
        return {
            key: stepKey,
            title: stepTitles[currentStep],
            index: currentStep,
            isFirst: currentStep === 0,
            isLast: currentStep === stepKeys.length - 1,
            isCompleted: completedSteps.has(currentStep),
            data: formData[stepKey] || {},
        }
    }, [currentStep, stepKeys, stepTitles, completedSteps, formData])

    return {
        // State
        currentStep,
        formData,
        completedSteps,
        loading,
        error,
        errors,
        isSubmitting,
        initData,

        // Step information
        stepKeys,
        stepTitles,
        getCurrentStepInfo,

        // Navigation
        goToNextStep,
        goToPreviousStep,

        // Data management
        updateStepData,
        submitStep,

        // Utility functions
        clearError,
        completeOnboarding,

        // Options
        investorTypes,
        titles,

        // Computed values
        totalSteps: stepKeys.length,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === stepKeys.length - 1,
        progressPercentage: Math.round(((currentStep + 1) / stepKeys.length) * 100),
    }
}

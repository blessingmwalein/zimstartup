import { createAxiosInstance } from "./axios"

// Types for onboarding steps
export interface InvestorTypeData {
    investor_type: string
    investment_experience: string
}

export interface BasicInfoData {
    first_name: string
    last_name: string
    other_names?: string
    date_of_birth: Date
    national_id: string
    gender: string
}

export interface ContactInfoData {
    email: string
    phone_number: string
    address: string
    city: string
    country: string
    id?: string
    national_id?: string
    customer_id?: string
}

export interface CompanyInfoData {
    company_name: string
    position: string
    industry: string
    annual_income: number
}

export interface AccountVerificationData {
    verification_type: string
    document_number: string
}

export interface CredentialsData {
    username: string
    password: string
    confirm_password: string
    email: string
    national_id: string
}

export interface OnboardingStepResponse {
    success: boolean
    message: string
    status?: number
    data?: any
    errors?: any
}

// Global Axios instance
const api = createAxiosInstance()

// Submit investor type information
export const submitInvestorType = async (data: InvestorTypeData): Promise<OnboardingStepResponse> => {
    const response: OnboardingStepResponse = {
        success: false,
        message: "",
    }

    try {
        const { data: responseData, status } = await api.post("/enter-investor-knowledge-details", data, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        response.status = status
        if (responseData?.data) {
            response.success = true
            response.data = responseData.data
        } else if (responseData.error) {
            response.message = responseData.error
        }
    } catch (error: any) {
        console.log(error)
        response.success = false
        response.message = error.response?.data?.detail || "Internal server error. Try again later."
    }
    return response
}

// Submit basic information
export const submitBasicInfo = async (data: BasicInfoData): Promise<OnboardingStepResponse> => {
    const response: OnboardingStepResponse = {
        success: false,
        message: "",
    }

    try {
        const { data: responseData, status } = await api.post("/create-new-investor-account", data, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        response.status = status
        if (responseData?.data) {
            response.success = true
            response.data = responseData.data
        } else if (responseData.error) {
            response.message = responseData.error
        }
    } catch (error: any) {
        console.log(error)
        response.success = false
        response.message = error.response?.data?.detail || "Internal server error. Try again later."
    }
    return response
}

// Submit contact information
export const submitContactInfo = async (data: ContactInfoData): Promise<OnboardingStepResponse> => {
    const response: OnboardingStepResponse = {
        success: false,
        message: "",
    }

    try {
        const { data: responseData, status } = await api.put(
            `/investor-contacts?national_id=${data.national_id}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )

        response.status = status
        if (responseData?.data) {
            response.success = true
            response.data = responseData.data
        } else if (responseData.error) {
            response.message = responseData.error
        }
    } catch (error: any) {
        if (Array.isArray(error.response?.data?.detail)) {
            const errors: Record<string, string> = {}
            error.response?.data?.detail.forEach((item: any) => {
                errors[item.loc[1]] = item.msg
            })

            response.errors = errors
            response.message = "An error occurred"
        } else {
            response.message = error.response?.data?.detail || "Internal server error. Try again later."
        }
        response.success = false
    }
    return response
}

// Submit company information
export const submitCompanyInfo = async (data: CompanyInfoData, session: any): Promise<OnboardingStepResponse> => {
    const response: OnboardingStepResponse = {
        success: false,
        message: "",
    }

    try {
        const { data: responseData, status } = await api.post("/create-new-company", data, {
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        })

        response.status = status
        if (responseData?.data) {
            response.success = true
            response.data = responseData.data
        } else if (responseData.error) {
            console.log(responseData)
            response.message = responseData.error
        } else {
            response.message = "An error occurred"
        }
    } catch (error: any) {
        response.success = false
        response.message = error.response?.data?.detail || "Internal server error. Try again later."
    }
    return response
}

// Submit account verification
export const submitAccountVerification = async (data: AccountVerificationData): Promise<OnboardingStepResponse> => {
    const response: OnboardingStepResponse = {
        success: false,
        message: "",
    }

    try {
        const { data: responseData, status } = await api.post(
            "/create-new-investor-account", // Note: This endpoint might need to be updated
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )

        response.status = status
        if (responseData?.data) {
            response.success = true
            response.data = responseData.data
        } else if (responseData.error) {
            response.message = responseData.error
        }
    } catch (error: any) {
        console.log(error)
        response.success = false
        response.message = error.response?.data?.detail || "Internal server error. Try again later."
    }
    return response
}

// Submit credentials
export const submitCredentials = async (data: CredentialsData): Promise<OnboardingStepResponse> => {
    const response: OnboardingStepResponse = {
        success: false,
        message: "",
    }

    if (data.password !== data.confirm_password) {
        response.message = "passwords did not match"
        return response
    }

    try {
        const { data: responseData, status } = await api.post(
            "/create-new-user",
            {
                username: data.email,
                email: data.email,
                national_id: data.national_id,
                hashed_password: data.password,
                status: "ACTIVE",
                disabled: false,
                role_id: 1,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )

        response.status = status

        console.log("CREDENTIALS", responseData)
        if (responseData?.error) {
            response.message = responseData.error
        } else {
            response.success = true
            response.message = "Successful"
        }
    } catch (error: any) {
        console.log(error.response?.data)
        response.success = false
        response.message = error.response?.data?.detail || "Internal server error. Try again later."
    }
    return response
}

// Get user information
export const getUser = async (session: any): Promise<OnboardingStepResponse> => {
    const response: OnboardingStepResponse = {
        success: false,
        message: "",
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        })

        response.success = res.ok
        response.status = res.status

        const resData = await res?.json()
        if (res.status === 500) {
            response.message = "Internal server error. Try again later."
        } else if (res.status === 401) {
            response.data = "401"
        } else if (!res.ok) {
            response.errors = {}
            response.message = resData.detail || "An error occurred."
        } else {
            response.data = resData
            response.success = true
        }
    } catch (error) {
        response.success = false
        response.message = "Internal server error. Try again later."
        response.status = 500
    }
    return response
}

// Get user companies
export const getUserCompanies = async (session: any, id: string): Promise<OnboardingStepResponse> => {
    const response: OnboardingStepResponse = {
        success: false,
        message: "",
    }

    if (process.env.NODE_ENV === "development") {
        // This would need to be imported or defined elsewhere
        // response.companies = offline_userCompanies
        response.success = true
        return response
    }

    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies-owned-by-user/${id}`

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        })

        response.success = res.ok
        response.status = res.status

        const resData = await res?.json()
        if (res.status === 500) {
            response.message = "Internal server error. Try again later."
        } else if (res.status === 401) {
            response.data = "401"
        } else if (!res.ok) {
            response.errors = {}
            response.message = resData.detail || "An error occurred."
        } else {
            response.data = resData
            response.success = true
        }
    } catch (error) {
        response.success = false
        response.message = "Internal server error. Try again later."
        response.status = 500
    }
    return response
}

// Send password reset token
export const sendResetToken = async (payload: any): Promise<OnboardingStepResponse> => {
    const response: OnboardingStepResponse = {
        success: false,
        message: "",
    }

    try {
        const { data: responseData, status } = await api.post("/forgot-password", payload, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        response.status = status
        if (responseData?.data) {
            response.success = true
            response.data = responseData.data
        } else if (responseData.error) {
            response.message = responseData.error
        }
    } catch (error: any) {
        console.log(error)
        response.success = false
        response.message = error.response?.data?.detail || "Internal server error. Try again later."
    }
    return response
}

// Handle API errors
export const handleApiError = (error: any): string => {
    if (error.response) {
        if (Array.isArray(error.response.data?.detail)) {
            return error.response.data.detail[0]?.msg || "An error occurred"
        }
        return error.response.data?.message || error.response.data?.detail || "An error occurred"
    }
    if (error.request) {
        return "Network error. Please check your connection."
    }
    return error.message || "An unexpected error occurred"
}

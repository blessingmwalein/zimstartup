import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    login,
    getLoggedInUser,
    getCustomer,
    updateContactInformation,
    updateEmploymentInformation,
    createNextOfKin,
    forgotPassword,
    resetPassword
} from '../services/auth';
import { LoginRequest } from '../models/login';
import { CreateEmployementDetailsRequest, CreateNextOfKeenRequest, UpdateContactInfoRequest } from '../models/employement';
import { storage } from '../services/storage';
// Import RootState if needed to type getState(), but we can cast locally for now to avoid circular deps if store imports this
// Ideally, slices shouldn't import store, and thunks should be separate.

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginRequest: LoginRequest, { rejectWithValue }) => {
        try {
            const userData = await login(loginRequest);
            const { access_token } = userData;

            storage.setToken(access_token);
            storage.setAuthenticated(true);

            return { accessToken: access_token };
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.log('Error:', error.response.data.detail);
                return rejectWithValue(error.response.data.detail || 'Login failed');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Update contact information
export const updateContactInformationAsync = createAsyncThunk(
    'auth/updateContactInformation',
    async (data: UpdateContactInfoRequest, { rejectWithValue, getState }) => {
        try {
            // Retrieve userId from Redux state if needed, or just pass data
            // const state = getState() as { auth: AuthState }; 
            // Current implementation in slice was checking userId existence but not using it?
            // "const userId = state.auth.user?.national_id;"
            // "if (!userId) { return rejectWithValue('User ID is missing'); }"
            // But it passed `data` to `updateContactInformation`.
            // Let's replicate the check if it was important, but we need to know the state shape.
            // Assuming the user needs to be logged in, which interceptors handle.

            const user = await updateContactInformation(data);
            return user;
        } catch (error: any) {
            console.log('Failed to update contact information:', error.message);
            return rejectWithValue('Failed to update contact information');
        }
    }
);


// Update employment information
export const updateEmploymentInformationAsync = createAsyncThunk(
    'auth/updateEmploymentInformation',
    async (data: CreateEmployementDetailsRequest, { rejectWithValue }) => {
        try {
            const user = await updateEmploymentInformation(data); // Fetch user data from API
            return user;
        } catch (error: any) {
            console.log('Failed to update employment information:', error.message);
            return rejectWithValue('Failed to update employment information');
        }
    }
);

// Create next of kin details
export const createNextOfKinAsync = createAsyncThunk(
    'auth/createNextOfKin',
    async (data: CreateNextOfKeenRequest, { rejectWithValue }) => {
        try {
            const user = await createNextOfKin(data); // Fetch user data from API
            return user;
        } catch (error: any) {
            console.log('Failed to create next of kin:', error.message);
            return rejectWithValue('Failed to create next of kin');
        }
    }
);

// Fetch user data after login
export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (token: string, { rejectWithValue }) => {
        try {
            const user = await getLoggedInUser(token); // Fetch user data from API
            storage.setUser(user); // Store user data in cookies using storage service
            return user;
        } catch (error: any) {
            console.log('Failed to fetch user data:', error.message);
            return rejectWithValue('Failed to fetch user data');
        }
    }
);

// Get customer data
export const getCustomerData = createAsyncThunk(
    'auth/getCustomerData',
    async (nationalId: string, { rejectWithValue }) => {
        try {
            const customer = await getCustomer(nationalId); // Fetch customer data from API
            return customer;
        } catch (error: any) {
            console.log('Failed to fetch customer data:', error.message);
            return rejectWithValue('Failed to fetch customer data');
        }
    }
);

// Forgot Password Thunk
export const forgotPasswordAsync = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await forgotPassword(email);
            return response;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || error.response.data.detail || 'Failed to send reset email');
            }
            return rejectWithValue('Failed to send reset email');
        }
    }
);

// Reset Password Thunk
export const resetPasswordAsync = createAsyncThunk(
    'auth/resetPassword',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await resetPassword(data);
            return response;
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Handle validation errors from API
                if (error.response.data.detail && Array.isArray(error.response.data.detail)) {
                    const errorMessages = error.response.data.detail.map((err: any) => err.msg).join(', ');
                    return rejectWithValue(errorMessages);
                }
                return rejectWithValue(error.response.data.message || error.response.data.detail || 'Failed to reset password');
            }
            return rejectWithValue('Failed to reset password');
        }
    }
);

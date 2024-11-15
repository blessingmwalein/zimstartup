import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { login, getLoggedInUser, getCustomer, updateContactInformation, updateEmploymentInformation, createNextOfKin } from '../services/auth';
import { LoginRequest } from '../models/login';
import { UserResponse } from '../models/user';
import { CustomerDataResponse } from '../models/customer';
import { CreateEmployementDetailsRequest, CreateNextOfKeenRequest, UpdateContactInfoRequest } from '../models/employement';

interface AuthState {
  user: UserResponse | null;
  customerData: CustomerDataResponse | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  accessToken: string | null;
}

const storedAccessToken = Cookies.get('access_token');
const storedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user') || '{}') : null;

const initialState: AuthState = {
  user: storedUser,
  customerData: null,
  isAuthenticated: !!storedAccessToken,
  status: 'idle',
  error: null,
  accessToken: storedAccessToken || null,
};

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginRequest: LoginRequest, { rejectWithValue, dispatch }) => {
    try {
      const userData = await login(loginRequest);
      const { access_token } = userData;

      Cookies.set('access_token', access_token);
      Cookies.set('authenticated', 'true');

      // dispatch(fetchUserData()); // Fetch user data after successful login

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
      // Retrieve userId from Redux state (assuming it's stored in the user object)
      const state = getState() as { auth: AuthState };
      const userId = state.auth.user?.national_id;  // Adjust 'id' to match the field in your user object

      if (!userId) {
        return rejectWithValue('User ID is missing');
      }

      // Now, pass the userId to the updateContactInformation API call
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
  async (token:string, { rejectWithValue }) => {
    try {
      const user = await getLoggedInUser(token); // Fetch user data from API
      Cookies.set('user', JSON.stringify(user)); // Store user data in cookies
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

// Logout user
export const logoutUser = () => (dispatch: any) => {
  dispatch(clearUser());
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      Cookies.remove('access_token');
      Cookies.remove('authenticated');
      Cookies.remove('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        console.log('Error:', action.payload);
        state.error = action.payload as string;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getCustomerData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCustomerData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.customerData = action.payload;
      })
      .addCase(getCustomerData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateContactInformationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateContactInformationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload; // Update the user with the new contact info
      })
      .addCase(updateContactInformationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateEmploymentInformationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmploymentInformationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload; // Update the user with the new employment info
      })
      .addCase(updateEmploymentInformationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createNextOfKinAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNextOfKinAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload; // Update the user with the new next of kin info
      })
      .addCase(createNextOfKinAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;

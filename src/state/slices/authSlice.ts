import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../services/storage';
import { UserResponse } from '../models/user';
import { CustomerDataResponse } from '../models/customer';
import {
  loginUser,
  updateContactInformationAsync,
  updateEmploymentInformationAsync,
  createNextOfKinAsync,
  fetchUserData,
  getCustomerData,
  forgotPasswordAsync,
  resetPasswordAsync
} from '../thunks/auth';

interface AuthState {
  user: UserResponse | null;
  customerData: CustomerDataResponse | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  accessToken: string | null;
}

const storedAccessToken = storage.getToken();
const storedUser = storage.getUser();

const initialState: AuthState = {
  user: storedUser,
  customerData: null,
  isAuthenticated: !!storedAccessToken,
  status: 'idle',
  error: null,
  accessToken: storedAccessToken || null,
};

// Logout thunk to handle side effects
export const logoutUser = () => (dispatch: any) => {
  storage.clearAll();
  dispatch(authSlice.actions.clearUser());
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      // Side effects (clearing cookies) should be handled in the action creator/thunk, 
      // but for safety in case this reducer is called elsewhere, we rely on the state update.
      // Ideally, the thunk 'logoutUser' handles the storage cleaning.
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Fetch User Data
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

      // Get Customer Data
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

      // Update Contact Info
      .addCase(updateContactInformationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateContactInformationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(updateContactInformationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Update Employment Info
      .addCase(updateEmploymentInformationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmploymentInformationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(updateEmploymentInformationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Create Next of Kin
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
      })

      // Forgot Password
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // You might want to store a success message in state if the UI needs it
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Reset Password
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;

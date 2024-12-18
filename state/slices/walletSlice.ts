import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buyStock, exchangeCash, getUserWalletBalance, sellStock, updateStockPrice } from "../services/wallet";
import { ExchangeCashRequest, PostDetails } from "../models/wallet";


interface WalletState {
    walletBalance: PostDetails | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
}

const initialState: WalletState = {
    status: "idle",
    error: null,
    walletBalance: null
};

// Async thunk to check if company exists
export const fetchUserWallet = createAsyncThunk(
    "company/fetchUserWallet",
    async (nationalId: string, { rejectWithValue }) => {
        try {
            return await getUserWalletBalance(nationalId);
        } catch (error: any) {
            // console.error(error);
            if (error.response.status === 400) {
                return rejectWithValue(error?.response?.data?.detail);
            } else {
                return rejectWithValue("Failed to fetch user wallet");
            }
        }
    },
);

//exchang cash 
export const submitExchangeCash = createAsyncThunk(
    "company/exchangeCash",
    async (exchangeData: ExchangeCashRequest, { rejectWithValue }) => {
        try {
            return await exchangeCash(exchangeData);
        } catch (error: any) {
            // console.error(error);
            if (error.response.status === 400) {
                return rejectWithValue(error?.response?.data?.detail);
            } else {
                return rejectWithValue("Failed to exchange cash");
            }
        }
    },
);

//submit sell stock
export const submitSellStock = createAsyncThunk(
    "company/sellStock",
    async (sellStockRequest: any, { rejectWithValue }) => {
        try {
            return await sellStock(sellStockRequest);
        } catch (error: any) {
            // console.error(error);
            if (error.response.status === 400) {
                return rejectWithValue(error?.response?.data?.detail);
            } else {
                return rejectWithValue("Failed to sell stock");
            }
        }
    },
);

//submit buy stock
export const submitBuyStock = createAsyncThunk(
    "company/buyStock",
    async (buyStockRequest: any, { rejectWithValue }) => {
        try {
            return await buyStock(buyStockRequest);
        } catch (error: any) {
            // console.error(error);
            if (error.response.status === 400) {
                return rejectWithValue(error?.response?.data?.detail);
            } else {
                return rejectWithValue("Failed to buy stock");
            }
        }
    },
);

//submit update stock price
export const submitUpdateStockPrice = createAsyncThunk(
    "company/updateStockPrice",
    async (updateStockPriceRequest: any, { rejectWithValue }) => {
        try {
            return await updateStockPrice(updateStockPriceRequest);
        } catch (error: any) {
            // console.error(error);
            if (error.response.status === 400) {
                return rejectWithValue(error?.response?.data?.detail);
            } else {
                return rejectWithValue("Failed to update stock price");
            }
        }
    },
);

const companySlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserWallet.pending, (state) => {
            state.status = "loading";
        }).addCase(fetchUserWallet.fulfilled, (state, action) => {
            state.status = "idle";
            state.walletBalance = action.payload?.post_details;
        }).addCase(fetchUserWallet.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload as string;
        }).addCase(submitExchangeCash.pending, (state) => {
            state.status = "loading";
        }).addCase(submitExchangeCash.fulfilled, (state) => {
            state.status = "idle";
        }).addCase(submitExchangeCash.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload as string;
        }).addCase(submitSellStock.pending, (state) => {
            state.status = "loading";
        }).addCase(submitSellStock.fulfilled, (state) => {
            state.status = "idle";
        }).addCase(submitSellStock.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload as string;
        }).addCase(submitBuyStock.pending, (state) => {
            state.status = "loading";
        }).addCase(submitBuyStock.fulfilled, (state) => {
            state.status = "idle";
        }).addCase(submitBuyStock.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload as string;
        }).addCase(submitUpdateStockPrice.pending, (state) => {
            state.status = "loading";
        }).addCase(submitUpdateStockPrice.fulfilled, (state) => {
            state.status = "idle";
        }).addCase(submitUpdateStockPrice.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload as string;
        });

    },
});

export default companySlice.reducer;

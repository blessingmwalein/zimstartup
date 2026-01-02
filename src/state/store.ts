// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "./slices/authSlice"; // Adjust path if necessary
import companyReducer from "./slices/companySlice"; // Adjust path if necessary
import companyConfigReducer from "./slices/configSlice"; // Adjust path if necessary
import walletReducer from "./slices/walletSlice"; // Adjust path if necessary
import competitionsReducer from "./slices/competitionSlice"
import companyReviewsReducer from "./slices/companyReviewsSlice";
import employeeReducer from "./slices/employeeSlice";
import vccReducer from "./slices/vccSlice";
import fundingOpportunitiesReducer from "./slices/fundingOpportunitiesSlice";
import portfolioReducer from "./slices/portfolioSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    companyConfig: companyConfigReducer,
    wallet: walletReducer,
    competitions: competitionsReducer,
    companyReviews: companyReviewsReducer,
    employee: employeeReducer,
    vcc: vccReducer,
    fundingOpportunities: fundingOpportunitiesReducer,
    portfolio: portfolioReducer,
    // Add your auth slice reducer here
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Export typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

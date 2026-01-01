// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Adjust path if necessary
import companyReducer from "./slices/companySlice"; // Adjust path if necessary
import companyConfigReducer from "./slices/configSlice"; // Adjust path if necessary
import walletReducer from "./slices/walletSlice"; // Adjust path if necessary
import competitionsReducer from "./slices/competitionSlice"
import companyReviewsReducer from "./slices/companyReviewsSlice";
import employeeReducer from "./slices/employeeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    companyConfig: companyConfigReducer,
    wallet: walletReducer,
    competitions: competitionsReducer,
    companyReviews: companyReviewsReducer,
    employee: employeeReducer,
    // Add your auth slice reducer here
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

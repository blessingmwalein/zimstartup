// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import authReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";
import companyConfigReducer from "./slices/configSlice";
import walletReducer from "./slices/walletSlice";
import competitionsReducer from "./slices/competitionSlice";
import companyReviewsReducer from "./slices/companyReviewsSlice";
import employeeReducer from "./slices/employeeSlice";
import vccReducer from "./slices/vccSlice";
import fundingOpportunitiesReducer from "./slices/fundingOpportunitiesSlice";
import portfolioReducer from "./slices/portfolioSlice";
import companyCreationReducer from "./slices/companyCreationSlice";

const rootReducer = combineReducers({
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
  companyCreation: companyCreationReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["companyCreation"], // Only persist companyCreation for now
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Export typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

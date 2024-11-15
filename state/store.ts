// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Adjust path if necessary
import companyReducer from './slices/companySlice'; // Adjust path if necessary

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
     // Add your auth slice reducer here
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

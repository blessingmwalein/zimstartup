import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";

// Aggregate loading status from multiple slices
export const selectGlobalLoading = createSelector(
  [
    (state: RootState) => state.companyConfig.status,
    (state: RootState) => state.company?.status, // Add more slices here
  ],
  (companyConfigStatus, anotherSliceStatus) =>
    companyConfigStatus === "loading" || anotherSliceStatus === "loading",
);

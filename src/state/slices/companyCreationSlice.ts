import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyCreationState {
    currentStep: number;
    companyName: string | null;
    companyId: number | null;
    isCompanyExistent: boolean;
    stepsData: {
        general?: any;
        contact?: any;
        stock?: any;
        funds?: any;
    };
}

const initialState: CompanyCreationState = {
    currentStep: 0, // 0: Check, 1: General, 2: Contact, 3: Stock, 4: Funds
    companyName: null,
    companyId: null,
    isCompanyExistent: false,
    stepsData: {},
};

const companyCreationSlice = createSlice({
    name: "companyCreation",
    initialState,
    reducers: {
        setCompanyName: (state, action: PayloadAction<string>) => {
            state.companyName = action.payload;
        },
        setCompanyId: (state, action: PayloadAction<number>) => {
            state.companyId = action.payload;
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
        updateStepData: (
            state,
            action: PayloadAction<{ step: keyof CompanyCreationState["stepsData"]; data: any }>
        ) => {
            state.stepsData[action.payload.step] = action.payload.data;
        },
        resetCompanyCreation: () => initialState,
    },
});

export const {
    setCompanyName,
    setCompanyId,
    setStep,
    updateStepData,
    resetCompanyCreation,
} = companyCreationSlice.actions;

export default companyCreationSlice.reducer;

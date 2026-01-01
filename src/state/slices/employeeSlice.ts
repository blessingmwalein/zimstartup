import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface EducationalQualification {
  qualification_id: number;
  institution: string;
  education_type: string;
  field_of_study: string;
  year_obtained: number;
}

interface EmploymentHistory {
  history_id: number;
  company_name: string;
  position_history: string;
  start_date_history: string;
  end_date_history: string;
  achievements: string;
  reason_for_leaving: string;
}

interface Award {
  award_id?: number;
  award_name?: string;
  award_date?: string;
  award_description?: string;
}

interface EmployeeData {
  employee_id: number;
  company_id: number;
  title: string;
  first_name: string;
  last_name: string;
  dob: string;
  marital_status: string;
  nationality: string;
  email: string;
}

interface CurrentPosition {
  overall_position: string;
  position: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
}

interface PublicProfile {
  public_profile: string | null;
}

export interface EmployeeDetails {
  employee_data: EmployeeData;
  current_position_at_company: CurrentPosition;
  educational_qualifications: EducationalQualification[];
  previous_employment_history: EmploymentHistory[];
  public_profile: PublicProfile;
  awards: Award[];
}

interface EmployeeState {
  currentEmployee: EmployeeDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  currentEmployee: null,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEmployeeDetails: (state, action: PayloadAction<EmployeeDetails>) => {
      state.currentEmployee = action.payload;
      state.loading = false;
      state.error = null;
    },
    setEmployeeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearEmployeeDetails: (state) => {
      state.currentEmployee = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setEmployeeLoading,
  setEmployeeDetails,
  setEmployeeError,
  clearEmployeeDetails,
} = employeeSlice.actions;

// Selectors
export const selectCurrentEmployee = (state: RootState) => state.employee.currentEmployee;
export const selectEmployeeLoading = (state: RootState) => state.employee.loading;
export const selectEmployeeError = (state: RootState) => state.employee.error;

export default employeeSlice.reducer;

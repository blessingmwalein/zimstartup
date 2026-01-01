import { AppDispatch } from "../store";
import {
  setEmployeeLoading,
  setEmployeeDetails,
  setEmployeeError,
  clearEmployeeDetails,
} from "../slices/employeeSlice";
import { getEmployeeDetails } from "../services/company";

export const fetchEmployeeDetails = (employeeId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setEmployeeLoading(true));
    const data = await getEmployeeDetails(employeeId);
    dispatch(setEmployeeDetails(data));
  } catch (error: any) {
    dispatch(setEmployeeError(error?.response?.data?.message || "Failed to fetch employee details"));
  }
};

export const clearEmployeeData = () => (dispatch: AppDispatch) => {
  dispatch(clearEmployeeDetails());
};

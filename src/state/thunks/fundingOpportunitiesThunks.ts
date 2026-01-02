import { AppDispatch } from "../store";
import {
  setLoading,
  setOpportunities,
  setError,
  setCreating,
  setUpdating,
  setDeleting,
  addOpportunity,
  updateOpportunity as updateOpportunityAction,
  removeOpportunity,
} from "../slices/fundingOpportunitiesSlice";
import {
  getAllFundingOpportunities,
  createFundingOpportunity,
  updateFundingOpportunity,
  deleteFundingOpportunity,
  CreateFundingOpportunityRequest,
  UpdateFundingOpportunityRequest,
} from "../services/fundingOpportunities";

export const fetchFundingOpportunities = (activeOnly: boolean = false) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await getAllFundingOpportunities(activeOnly);
    dispatch(setOpportunities(data));
  } catch (error: any) {
    dispatch(setError(error?.response?.data?.message || "Failed to fetch funding opportunities"));
  }
};

export const createOpportunity = (data: CreateFundingOpportunityRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCreating(true));
    const newOpportunity = await createFundingOpportunity(data);
    dispatch(addOpportunity(newOpportunity));
    return { success: true, opportunity: newOpportunity };
  } catch (error: any) {
    dispatch(setError(error?.response?.data?.message || "Failed to create funding opportunity"));
    return { success: false, error: error?.response?.data?.message };
  }
};

export const updateOpportunity = (id: number, data: UpdateFundingOpportunityRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setUpdating(true));
    const updatedOpportunity = await updateFundingOpportunity(id, data);
    dispatch(updateOpportunityAction(updatedOpportunity));
    return { success: true, opportunity: updatedOpportunity };
  } catch (error: any) {
    dispatch(setError(error?.response?.data?.message || "Failed to update funding opportunity"));
    return { success: false, error: error?.response?.data?.message };
  }
};

export const deleteOpportunity = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setDeleting(true));
    await deleteFundingOpportunity(id);
    dispatch(removeOpportunity(id));
    return { success: true };
  } catch (error: any) {
    dispatch(setError(error?.response?.data?.message || "Failed to delete funding opportunity"));
    return { success: false, error: error?.response?.data?.message };
  }
};

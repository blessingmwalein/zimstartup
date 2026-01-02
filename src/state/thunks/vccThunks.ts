import { AppDispatch } from "../store";
import {
  setLoading,
  setVCCList,
  setError,
  setCreatingVCC,
  setUploadingLogo,
  setCreatingCompetition,
  addVCC,
  addCompetition,
} from "../slices/vccSlice";
import {
  getAllVCCCompetitions,
  createNewVCC,
  uploadVCCLogo,
  createVCCCompetition,
  CreateVCCRequest,
  CreateVCCCompetitionRequest,
} from "../services/vcc";

export const fetchAllVCCs = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getAllVCCCompetitions();
    
    // Transform the array data to proper VCC format
    const transformedVCCs = response.data.map((vcc: any[]) => ({
      vcc_id: vcc[0],
      vcc_abbreviations: vcc[1],
      vcc_name: vcc[2],
      vcc_status: vcc[3],
      banner_url: vcc[4],
      title: vcc[5],
      description: vcc[6],
      start_date: vcc[7],
      end_date: vcc[8],
      status: vcc[9],
      logo_path: vcc[10],
      is_featured: vcc[11],
      region: vcc[12],
    }));
    
    dispatch(setVCCList(transformedVCCs));
  } catch (error: any) {
    dispatch(setError(error?.response?.data?.message || "Failed to fetch VCC competitions"));
  }
};

export const createVCC = (data: CreateVCCRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCreatingVCC(true));
    const response = await createNewVCC(data);
    
    // Transform array response to VCC object
    const newVCC = {
      vcc_id: response.data[0],
      vcc_abbreviations: response.data[1],
      vcc_name: response.data[2],
      created_at: response.data[3],
      vcc_status: response.data[4],
      vcc_short_description: response.data[5],
      contact_person: response.data[6],
      instagram: response.data[7],
      linkedin: response.data[8],
      twitter: response.data[9],
      email: response.data[10],
      phone_number: response.data[11],
      address: response.data[12],
      region: response.data[13],
      country: response.data[14],
      updated_at: response.data[15],
    };
    
    dispatch(addVCC(newVCC));
    return { success: true, vccId: newVCC.vcc_id };
  } catch (error: any) {
    dispatch(setError(error?.response?.data?.message || "Failed to create VCC"));
    return { success: false, error: error?.response?.data?.message };
  }
};

export const uploadLogo = (vccId: number, file: File) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setUploadingLogo(true));
    const response = await uploadVCCLogo(vccId, file);
    dispatch(setUploadingLogo(false));
    return { success: true, message: response.message };
  } catch (error: any) {
    dispatch(setError(error?.response?.data?.message || "Failed to upload logo"));
    return { success: false, error: error?.response?.data?.message };
  }
};

export const createCompetition = (data: CreateVCCCompetitionRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCreatingCompetition(true));
    const response = await createVCCCompetition(data);
    dispatch(addCompetition(response.data));
    return { success: true, competition: response.data };
  } catch (error: any) {
    dispatch(setError(error?.response?.data?.message || "Failed to create competition"));
    return { success: false, error: error?.response?.data?.message };
  }
};

import { createAxiosInstance } from "./axios";

const api = createAxiosInstance();

export interface VCCData {
  vcc_id: number;
  vcc_abbreviations: string;
  vcc_name: string;
  created_at: string;
  vcc_status: string;
  vcc_short_description: string;
  contact_person: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  email: string;
  phone_number: number;
  address: string;
  region: string;
  country: string;
  updated_at: string;
}

export interface CreateVCCRequest {
  vcc_abbreviations: string;
  vcc_name: string;
  vcc_short_description: string;
  contact_person: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  email: string;
  phone_number: number;
  address: string;
  region: string;
  country: string;
}

export interface VCCCompetition {
  competition_id: number;
  vcc_id: number;
  name: string;
  slug: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface CreateVCCCompetitionRequest {
  vcc_id: number;
  competition_name: string;
  competition_category: string;
  competition_description: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  min_participants: number;
}

// Get all VCC competitions available
export const getAllVCCCompetitions = async (): Promise<any> => {
  const response = await api.get<any>(`get-all-vcc-competitions-available`);
  return response.data;
};

// Create new VCC
export const createNewVCC = async (data: CreateVCCRequest): Promise<any> => {
  const response = await api.post<any>(`create-new-vcc-details`, data);
  return response.data;
};

// Upload VCC logo
export const uploadVCCLogo = async (vccId: number, file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post<any>(
    `upload_vcc_logo?vcc_id=${vccId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

// Create VCC competition
export const createVCCCompetition = async (data: CreateVCCCompetitionRequest): Promise<any> => {
  const response = await api.post<any>(`create-new-vcc-competition`, data);
  return response.data;
};

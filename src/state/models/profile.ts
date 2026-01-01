export interface ProfileUpdateRequest {
  position: Position;
  qualifications: Qualification[];
  employment_history: EmploymentHistory[];
  public_info: PublicInfo;
  awards: Award[];
}

export interface Award {
  employee_id: number;
  award: string;
  year: number;
  description: string;
}

export interface EmploymentHistory {
  employee_id: number;
  company_name: string;
  position: string;
  start_date: Date;
  end_date: Date;
  achievements: string;
  reason_for_leaving: string;
}

export interface Position {
  employee_id: number;
  overall_position: string;
  position: string;
  start_date: Date;
  end_date: Date;
  is_current: boolean;
}

export interface PublicInfo {
  employee_id: number;
  public_profile: string;
}

export interface Qualification {
  employee_id: number;
  institution: string;
  education_type: string;
  field_of_study: string;
  year_obtained: number;
}

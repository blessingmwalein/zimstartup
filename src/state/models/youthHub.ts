export interface YouthHubMessage {
  message: string[]
}

export interface YouthHubRequest {
  project_name: string
  type_of_request: string
  request_details: string
  request_offer: string
  sector: string
  contact_email: string
  location: string
  region: string
  proposed_launch_date: string
  national_id: string
}

export interface YouthHubResponse {
  project_id: number
  project_name: string
  type_of_request: string
  request_details: string
  request_offer: string
  sector: string
  status: string
  contact_email: string
  location: string
  region: string
  proposed_launch_date: string
  national_id: string
  created_at: string
  updated_at: string
}

export interface YouthHubListResponse {
  data: YouthHubResponse[]
} 
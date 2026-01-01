export interface CustomerDataResponse {
    customer_data:   CustomerData;
    contact_details: ContactDetails;
    work_details:    WorkDetails;
    beneficiary:     BeneficiaryDetails;
    wallet:          Wallet;
}

export interface BeneficiaryDetails {
    next_of_keen_national_id: string;
    status:                   string;
    gender_of_keen:           string;
    title:                    string;
    first_name:               string;
    middle_name:              string;
    last_name:                string;
    national_id:              string;
    marital_status:           string;
    nationality:              string;
    reason_of_selection:      string;
    next_phone_number:        number;
    next_phone_number2:       number;
    next_telephone:           number;
    next_email:               string;
    address:                  string;
    city:                     string;
    country:                  string;
    redeem_time_months:       number;
    last_updated_by:          string;
}

export interface ContactDetails {
    email:       string;
    work_email:  string;
    phone1:      number;
    phone2:      number;
    phone3:      number;
    address1:    string;
    address2:    string;
    town:        string;
    city:        string;
    state:       string;
    postal_code: number;
}

export interface CustomerData {
    created_at:     Date;
    status:         string;
    title:          string;
    first_name:     string;
    middle_name:    string;
    last_name:      string;
    nickname:       string;
    national_id:    string;
    dob:            Date;
    gender:         string;
    marital_status: string;
    nationality:    string;
}

export interface Wallet {
    currency: null;
    status:   null;
    cash:     null;
}

export interface WorkDetails {
    ce_employer_name:   string;
    employer_country:     null;
    status_of_employment: string;
    profession:           string;
    sector:               string;
}

export interface CreateEmployementDetailsRequest {
    national_id:          string;
    employer_name:        string;
    employer_country:     string;
    status_of_employment: string;
    profession:           string;
    sector:               string;
    last_updated_by:      string;
}


export interface CreateNextOfKeenRequest {
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


export interface UpdateContactInfoRequest {
    national_id:     string;
    email:           string;
    work_email:      string;
    phone1:          number;
    phone2:          number;
    phone3:          number;
    address1:        string;
    address2:        string;
    town:            string;
    city:            string;
    state:           string;
    postal_code:     number;
    last_updated_by: string;
}


export interface UpdateBasicInfoRequest {
    dob:             Date;
    gender:          string;
    title:           string;
    first_name:      string;
    middle_name:     string;
    last_name:       string;
    nickname:        string;
    national_id:     string;
    marital_status:  string;
    nationality:     string;
    last_updated_by: string;
}

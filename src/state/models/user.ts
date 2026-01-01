export interface UserResponse {
    username:        string;
    email:           string;
    status:          string;
    national_id:     string;
    disabled:        boolean;
    hashed_password: string;
    role_id:         number;
    dob:             Date;
    gender:          string;
    title:           string;
    first_name:      string;
    last_name:       string;
    marital_status:  string;
    nationality:     string;
}

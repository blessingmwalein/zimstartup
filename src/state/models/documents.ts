export interface CompanyDocumentsResponse {
    documents: CompanyDocument[];
}

export interface CompanyDocument {
    company_id:    number;
    id:            number;
    document_name: string;
    company_doc:   string;
    created_at:    Date;
}

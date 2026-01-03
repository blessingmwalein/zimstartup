export interface Competition {
    vcc_id: number
    competition_name: string
    competition_category: string
    competition_description: string
    start_date: string
    end_date: string
    max_participants: number
    min_participants: number
    // Legacy fields for backward compatibility
    competition_id?: number
    vcc_name?: string
    status?: string | null
    featured_image_url?: string
    name?: string
    short_description?: string
    vcc_logo?: string
    is_active?: boolean
    target_location?: string | null
}

export interface CompetitionQuestion {
    question_id: number
    competition_id: number
    question_description: string
    question_text: string
}

export interface CompetitionAnswer {
    question_id: number
    company_id: number
    answer_text: string
} 
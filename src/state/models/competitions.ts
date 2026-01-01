export interface Competition {
    competition_id: number
    vcc_name: string
    competition_category: string
    status: string
    featured_image_url: string
    name: string
    short_description: string
    start_date: string
    end_date: string
    vcc_logo: string
    is_active: boolean
    target_location: string
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
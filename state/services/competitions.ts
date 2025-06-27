import { createAxiosInstance } from "./axios";


const api = createAxiosInstance();


export const getAllCompetitions = async () => {
    const response = await api.get("/get-all-vcc-competitions-available")
    return response.data
}

export const searchCompetitions = async (params: { query: string; location: string }) => {
    const { query, location } = params;
    let url = "/get-filtered-vcc-competitions?";
    if (location) {
        url += `location=${location}&`;
    }
    if (query) {
        url += `competition_name=${query}`;
    }
    const response = await api.get(url);
    return response.data
}

export const joinCompetition = async (data: { company_id: number; competition_id: number; national_id: string }) => {
    const response = await api.post("/join-competition", data)
    return response.data
}

export const getCompetitionQuestions = async (competitionId: number) => {
    const response = await api.get(`/get-all-vcc-questions?competition_id=${competitionId}`)
    return response.data
}

export const submitCompetitionAnswers = async (answers: any[]) => {
    const response = await api.post("/submit-multiple-vcc-answers", answers)
    return response.data
} 
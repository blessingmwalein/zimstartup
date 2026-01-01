import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllCompetitions, searchCompetitions } from "../services/competitions"
import { Competition } from "../models/competitions"

interface CompetitionsState {
    competitions: Competition[]
    loading: boolean
    error: string | null
}

const initialState: CompetitionsState = {
    competitions: [],
    loading: false,
    error: null,
}

export const fetchCompetitions = createAsyncThunk("competitions/fetchCompetitions", async () => {
    const response = await getAllCompetitions()
    return response.data
})

export const findCompetitions = createAsyncThunk("competitions/findCompetitions", async (params: { query: string, location: string }) => {
    const response = await searchCompetitions(params)
    return response.data
})

const competitionsSlice = createSlice({
    name: "competitions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompetitions.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCompetitions.fulfilled, (state, action) => {
                state.loading = false
                state.competitions = action.payload
            })
            .addCase(fetchCompetitions.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to fetch competitions"
            })
            .addCase(findCompetitions.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(findCompetitions.fulfilled, (state, action) => {
                state.loading = false
                state.competitions = action.payload
            })
            .addCase(findCompetitions.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to search competitions"
            })
    },
})

export default competitionsSlice.reducer 
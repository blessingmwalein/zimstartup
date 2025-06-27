import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../state/store"
import { fetchCompetitions, findCompetitions } from "../../state/slices/competitionSlice"
import { useEffect } from "react"

export const useCompetitions = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { competitions, loading, error } = useSelector((state: RootState) => state.competitions)

    const getCompetitions = () => {
        dispatch(fetchCompetitions())
    }

    const searchForCompetitions = (params: {query: string, location: string}) => {
        if (params.query.trim() !== "" || params.location.trim() !== "") {
            dispatch(findCompetitions(params))
        } else {
            dispatch(fetchCompetitions())
        }
    }

    useEffect(() => {
        // Optionally fetch competitions on mount
        // dispatch(fetchCompetitions())
    }, [dispatch])

    return { competitions, loading, error, getCompetitions, searchForCompetitions }
} 
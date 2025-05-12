import axios from "axios";
import { saveSectors } from "../slices/sectorsSlice";




export const _getSectors = () => {
    return async (dispatch, getState) => {
      try {
        const { data } = await axios.get("/api/sectors");
        if (data.success) {
          dispatch(saveSectors({sectors: data.data}));
        } 
      } catch (error) {
        console.error(error.message);
      }
    };
  };
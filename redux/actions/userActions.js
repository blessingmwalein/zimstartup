import axios from "axios";
import { saveUserCompanies } from "../slices/userSlice";

export const _getUserCompanies = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/api/user/get-companies", { id });
      if (data.success) {
        dispatch(saveUserCompanies(data.companies));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

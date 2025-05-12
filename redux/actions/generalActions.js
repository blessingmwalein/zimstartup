import axios from "axios";
import { saveFilters, saveInvestorTypes} from "../slices/generalSlice";

export const _saveFilters = (filters) => {
  return async (dispatch, getState) => {
    dispatch(saveFilters({ filters }));
  };
};

export const _getInvestorTypes = () => {
  const investor_types = [
    "Own a company, looking for investment",
    "New investor, looking for investment opportunities",
    "Venture capitalist",
    "Product development",
    "Market my company",
    "Other",
  ];
  return async (dispatch, getState) => {
    dispatch(saveInvestorTypes(investor_types));
  };
};





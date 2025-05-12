import { combineReducers } from "redux";
import generalReducer from "./slices/generalSlice";
import userReducer from "./slices/userSlice";
import sectorsReducer from "./slices/sectorsSlice"

const rootReducer = combineReducers({
  user: userReducer,
  general: generalReducer,
  sectors: sectorsReducer,
});

export default rootReducer;

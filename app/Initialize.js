"use client";

import { _getInvestorTypes} from "@/redux/actions/generalActions";
import { _getSectors } from "@/redux/actions/sectorsActions";
import { _getUserCompanies } from "@/redux/actions/userActions";
import { resetAuth, saveUser } from "@/redux/slices/userSlice";
import { signOut } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Initialize = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === "401") {
      dispatch(resetAuth());
      signOut();
    } else if (user?.username) {
      dispatch(saveUser(user));
      dispatch(_getUserCompanies(user.national_id));
      dispatch(_getSectors());
    }

    dispatch(_getInvestorTypes());
 
  }, [user]);

  return (
    <div>
      <ProgressBar
        height="5px"
        color="#DBF226"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </div>
  );
};

export default Initialize;

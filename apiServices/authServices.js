
import offline_userCompanies from "@/utils/offline_userCompanies";
import axios from "axios";

//###########################
// TYPE
//###########################
export const _postInvestorType = async (payload) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const { data, status } = await axios.post(
      process.env.SERVER_URL + "/enter-investor-knowledge-details",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.status = status;
    if (data?.data) {
      response.success = true;
      response.data = data.data;
    } else if (data.error) {
      response.message = data.error;
    }
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message =
      error.response?.data?.detail || "Internal server error. Try again later.";
  }
  return response;
};

//###########################
// BASIC INFO
//###########################
export const _postBasicInfo = async (payload) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const { data, status } = await axios.post(
      process.env.SERVER_URL + "/create-new-investor-account",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.status = status;
    if (data?.data) {
      response.success = true;
      response.data = data.data;
    } else if (data.error) {
      response.message = data.error;
    }
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message =
      error.response?.data?.detail || "Internal server error. Try again later.";
  }
  return response;
};

//###########################
// CONTACT INFO
//###########################
export const _postContactInfo = async (payload) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const { data, status } = await axios.put(
      process.env.SERVER_URL +
        "/investor_contacts/" +
        payload.id +
        "?national_id=" +
        payload.national_id,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.status = status;
    if (data?.data) {
      response.success = true;
      response.data = data.data;
    } else if (data.error) {
      response.message = data.error;
    }
  } catch (error) {
    if (Array.isArray(error.response?.data?.detail)) {
      const errors = {};
      error.response?.data?.detail.forEach((item) => {
        errors[item.loc[1]] = item.msg;
      });

      response.errors = errors;
      response.message = "An error occurred";
    } else {
      response.message =
        error.response?.data?.detail ||
        "Internal server error. Try again later.";
    }
    response.success = false;
  }
  return response;
};

//###########################
// BASIC INFO
//###########################
export const _postCredentials = async (payload) => {
  const response = {
    success: false,
    message: "",
  };

  if (payload.password !== payload.confirm_password) {
    response.message = "passwords did not match";
    return response;
  }

  try {
    const { data, status } = await axios.post(
      process.env.SERVER_URL + "/create-new-user",
      {
        username: payload.email,
        email: payload.email,
        national_id: payload.national_id,
        hashed_password: payload.password,
        status: "ACTIVE",
        disabled: false,
        role_id: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.status = status;

    console.log("CREDENTIALS", data);
    if (data?.error) {
      response.message = data.error;
    } else {
      response.success = true;
      response.message = "Successful";
    }
  } catch (error) {
    console.log(error.response?.data);
    response.success = false;
    response.message =
      error.response?.data?.detail || "Internal server error. Try again later.";
  }
  return response;
};

//###########################
// ACCOUNT VERIFICATIO
//###########################

export const _postAccountVerification = async (data) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const { data, status } = await axios.post(
      process.env.SERVER_URL + "/create-new-investor-account",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.status = status;
    if (data?.data) {
      response.success = true;
      response.data = data.data;
    } else if (data.error) {
      response.message = data.error;
    }
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message =
      error.response?.data?.detail || "Internal server error. Try again later.";
  }
  return response;
};

//###########################
// COMPANY INFO
//###########################

export const _postCompanyInfo = async (payload, session) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const { data, status } = await axios.post(
      process.env.SERVER_URL + "/create-new-company",
      payload,
      {
        headers: {
          Authorization: "Bearer " + session.access_token,
        },
      }
    );

    response.status = status;
    if (data?.data) {
      response.success = true;
      response.data = data.data;
    } else if (data.error) {
      console.log(data);
      response.message = data.error;
    } else {
      response.message = "An error occurred";
    }
  } catch (error) {
    response.success = false;
    response.message =
      error.response?.data?.detail || "Internal server error. Try again later.";
  }
  return response;
};

//###########################
// GET USER
//###########################
export const _getUser = async (session) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const res = await fetch(process.env.SERVER_URL + "/users/me/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.access_token,
      },
    });

    response.success = res.ok;
    response.status = res.status;

    const resData = await res?.json();
    if (res.status === 500) {
      response.message = "Internal server error. Try again later.";
    } else if (res.status === 401) {
      response.data = "401";
    } else if (!res.ok) {
      response.errors = {};
      response.message = resData.detail || "An error occurred.";
    } else {
      response.data = resData;
      response.success = true;
    }
  } catch (error) {
    response.success = false;
    response.message = "Internal server error. Try again later.";
    response.status = 500;
  }
  return response;
};

//###########################
// GET USER COMPANIES
//###########################
export const _getUserCompanies = async (session, id) => {
  const response = {
    success: false,
    message: "",
  };

  if(process.env.NODE_ENV === "development"){
    response.companies = offline_userCompanies;
    response.success = true;
    return response
  }
  
  try {
    const url = process.env.SERVER_URL + "/companies-owned-by-user/" + id;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.access_token,
      },
    });

    response.success = res.ok;
    response.status = res.status;

    const resData = await res?.json();
    if (res.status === 500) {
      response.message = "Internal server error. Try again later.";
    } else if (res.status === 401) {
      response.data = "401";
    } else if (!res.ok) {
      response.errors = {};
      response.message = resData.detail || "An error occurred.";
    } else {
      response.companies = resData;
      response.success = true;
    }
  } catch (error) {
    response.success = false;
    response.message = "Internal server error. Try again later.";
    response.status = 500;
  }
  return response;
};

//###########################
// SEND RESET TOKEN
//###########################
export const _postSendResetToken = async (payload) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const { data, status } = await axios.post(
      process.env.SERVER_URL + "/forgot-password",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.status = status;
    if (data?.data) {
      response.success = true;
      response.data = data.data;
    } else if (data.error) {
      response.message = data.error;
    }
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message =
      error.response?.data?.detail || "Internal server error. Try again later.";
  }
  return response;
};

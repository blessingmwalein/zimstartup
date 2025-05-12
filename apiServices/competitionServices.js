import offline_competitonQuestions from "@/utils/offline_competitionQuestions";
import offline_competitions from "@/utils/offline_competitions";
import axios from "axios";

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

//###########################
// GET COMPETITIONS
//###########################
export const _getCompetitions = async (session) => {
  const response = {
    success: false,
    message: "",
  };
  if (process.env.NODE_ENV === "development") {
    response.data = offline_competitions.data;
    response.success = true;
    return response;
  }

  try {
    const res = await fetch(
      server_url + "/get-all-vcc-competitions-available",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.access_token,
        },
      }
    );

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
      response.data = resData.data;
      response.success = true;
    }
  } catch (error) {
    response.success = false;
    response.message = "Internal server error. Try again later.";
    response.status = 500;
    console.log(error);
  }

  return response;
};

//###########################
// Get COMPETITION QUESTIONS
//###########################
export const _getAllQuestions = async (id, session) => {
  const response = {
    success: false,
    message: "",
  };

    if (process.env.NODE_ENV === "development") {
    response.data = offline_competitonQuestions.data;
    response.success = true;
    return response;
  }

  try {
    const url =
      process.env.SERVER_URL + `/get-all-vcc-questions?competition_id=${id}`;
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
      response.data = resData.data;
      response.success = true;
    }
  } catch (error) {
    response.success = false;
    response.message = "Internal server error. Try again later.";
    response.status = 500;
    console.log(error);
  }
  return response;
};

//###########################
// POST COMPANY COMPETITION
//###########################
export const _postCompanyCompetiton = async (payload, session) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const url = server_url + "/join-company";
    const { data, status } = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.access_token,
      },
    });

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
// POST COMPETITION ANSWERS
//###########################
export const _postCompetitionAnswers = async (payload, session) => {
  console.log("hie");
  const response = {
    success: false,
    message: "",
  };

  try {
    const url = server_url + "/submit-multiple-vcc-answers";
    console.log(url);
    const { data, status } = await axios.post(
      server_url + "/submit-multiple-vcc-answers",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.access_token,
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



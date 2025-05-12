import axios from "axios";

const server_url = process.env.SERVER_URL;
//###########################
// HELP DESK
//###########################
export const _postHelpdesk = async (payload) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const { data, status } = await axios.post(
      server_url + "/tickets",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.status = status;
    if (status === 201) {
      response.success = true;
    } else if (data.error) {
      response.message = data.error;
    }
  } catch (error) {
    console.log(error.response?.data.detail);
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

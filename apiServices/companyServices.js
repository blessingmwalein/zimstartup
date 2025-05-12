import company_details from "@/utils/offline_company_details";
import offline_sector_companies from "@/utils/offline_sector_companies";
import offline_sectors from "@/utils/offline_sectors";

const server_url = process.env.SERVER_URL;

//###########################
// COMPANY INFO
//###########################

export const _getCompanyAvailability = async (payload, session) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const res = await fetch(
      `${server_url}/search-company/${payload.company_name}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    const data = await res.json();

    response.status = res.status;
    if (data?.message.includes("does not exist")) {
      response.success = true;
    } else {
      response.message = data.error || data.message || "An error occurred";
      response.inputError = "Name already registered";
    }
  } catch (error) {
    response.message = "Internal server error. Try again later.";
  }

  return response;
};

//###########################
// DASHBOARD SEARCH COMPANIES
//###########################

export const _onSearchCompanies = async (session, query) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/company-search-query?search_query=${query}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    response.success = res.ok;
    response.status = res.status;

    const resData = await res.json();
    if (!res.ok) {
      response.message =
        res.status === 500
          ? "Internal server error. Try again later."
          : resData.detail || "An error occurred.";
    } else {
      response.data = resData;
      response.success = true;
    }
  } catch (error) {
    response.message = "Internal server error. Try again later.";
    response.status = 500;
  }

  return response;
};

//###########################
// COMPANY SECTORS
//###########################

export const _getAllSectors = async (session) => {
  const response = {
    success: false,
    message: "",
    data: [],
  };
  if (process.env.NODE_ENV === "development") {
    response.data = offline_sectors.data;
    response.success = true;
    return response;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-all-sectors`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    const data = await res.json();
    response.status = res.status;

    if (Array.isArray(data.data) && data.data.length > 0) {
      response.data = data.data;
      response.success = true;
    } else {
      response.message = "No sectors found.";
    }
  } catch (error) {
    response.message = "Internal server error. Try again later.";
  }

  return response;
};

//###########################
// GET COMPANIES BY SECTOR
//###########################

export const _getCompaniesBySector = async (sector, session) => {
  const response = {
    success: false,
    message: "",
    data: { sector: "", total_companies: "", companies: [] },
    status: null,
  };

  if (process.env.NODE_ENV === "development") {
    response.data.companies = offline_sector_companies.companies;
    response.success = true;

    return response;
  }

  try {
    if (!session || !session.access_token) {
      response.message = "Unauthorized access.";
      return response;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-all-sector-companies/${sector}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    response.status = res.status;

    if (res.status === 401) {
      response.message = "Unauthorized access. Please check your token.";
      return response;
    }

    const data = await res.json();

    if (data && Array.isArray(data.companies)) {
      if (data.companies.length > 0) {
        response.data.companies = data.companies;
        response.success = true;
      } else {
        response.message = "No companies found for this sector.";
      }
    } else {
      response.message = "Unexpected data format.";
      console.error("Unexpected data format:", data);
    }
  } catch (error) {
    console.error("Error in API service:", error.message);

    if (
      process.env.NODE_ENV === "development" ||
      error.message === "Server is down"
    ) {
      response.data.companies = offline_sector_companies.companies;
      response.success = true;
    } else {
      response.message = "Internal server error. Try again later.";
    }
  }

  return response;
};
// ###########################
// GET COMPANY BY NAME
// ###########################

export const _getCompanyById = async (company_id, session) => {
  const response = {
    success: false,
    message: "",
    data: {},
    status: null,
  };

  if (process.env.NODE_ENV === "development") {
    response.data = company_details;
    response.success = true;

    return response;
  }

  try {
    if (!session || !session.access_token) {
      response.message = "Unauthorized access.";
      return response;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-company/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    response.status = res.status;

    if (res.status === 401) {
      response.message = "Unauthorized access. Please check your token.";
      return response;
    }

    const data = await res.json();

    if (data) {
      response.data = data[0];
      response.success = true;
    } else {
      response.message = "No data found for this company.";
    }
  } catch (error) {
    if (
      process.env.NODE_ENV === "development" ||
      error.message === "Server is down"
    ) {
      response.message = "Unable to fetch data at this time.";
    } else {
      response.message = "Internal server error. Try again later.";
    }
  }

  return response;
};

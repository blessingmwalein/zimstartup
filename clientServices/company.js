export const _checkCompanyAvailabilitySubmit = async (payload) => {
  try {
    const res = await fetch("/api/company/availability", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
};

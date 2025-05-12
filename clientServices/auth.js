export const _registrationSubmit = async (payload) => {
  try {
    // const payload = {};

    // for (const [key, value] of Object.entries(data)) {
    //   if (value) {
    //     payload[key] = value;
    //   }
    // }

    const res = await fetch("/api/auth/register", {
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

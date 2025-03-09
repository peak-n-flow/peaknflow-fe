const getSession = async () => {
  try {
    const response = await fetch("/api/auth/me");
    console.log(response)
    return response.json();
  } catch (error) {
    throw error as ErrorAPI;
  }
};

export { getSession };

const getSession = async () => {
  try {
    const response = await fetch("/api/auth/me");
    return response.json();
  } catch (error) {
    throw error as ErrorAPI;
  }
};

export { getSession };

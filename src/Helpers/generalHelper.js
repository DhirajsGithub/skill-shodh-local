const getLocalDataForAuthentication = () => {
  const data = localStorage.getItem("skillShodhUserData");
  return data ? JSON.parse(data) : null;
};

const isLocallyAuthenticated = () => {
  const data = getLocalDataForAuthentication();
  return data && data.isAuthenticated;
};

const isLocallyCompletedOnboarding = () => {
  const data = getLocalDataForAuthentication();
  return data && data.user && data.user.step === 4;
};

export {
  getLocalDataForAuthentication,
  isLocallyAuthenticated,
  isLocallyCompletedOnboarding,
};

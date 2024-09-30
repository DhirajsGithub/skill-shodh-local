const isUserDeleted = (email) => {
  return email?.charAt(0) === "@" && email?.charAt(1) !== "@";
};

export { isUserDeleted };

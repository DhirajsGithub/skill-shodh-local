const isValidateString = (str, min, max) => {
  if (!str) {
    return { message: "This field is required", isError: true };
  }
  if ((min && max && str.length < min) || str.length > max) {
    return {
      message: `This field must be between ${min} and ${max} characters`,
      isError: true,
    };
  }
  if (min && str.length < min) {
    return {
      message: `This field must be at least ${min} characters`,
      isError: true,
    };
  }
  if (max && str.length > max) {
    return {
      message: `This field must be at most ${max} characters`,
      isError: true,
    };
  }

  return false;
};

const isvalidateEmail = (email) => {
  if (!email) {
    return { message: "This field is required", isError: true };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: "Invalid email", isError: true };
  }
  return false;
};

const isValidtePassword = (password) => {
  if (!password) {
    return { message: "This field is required", isError: true };
  }
  if (password.length < 8) {
    return { message: "Password must be at least 8 characters", isError: true };
  }
  return false;
};

const isValidateFile = (file) => {
  if (!file.name) {
    return { message: "This field is required", isError: true };
  }
  // if (size && file.size > size) {
  //   return {
  //     message: `File size must be less than ${size / 1000000}MB`,
  //     isError: true,
  //   };
  // }
  // if (type && !type.includes(file.type)) {
  //   return { message: `File type must be ${type.join(", ")}`, isError: true };
  // }
  return false;
};

const isValidateNumber = (num, min, max) => {
  if (!num) {
    return { message: "This field is required", isError: true };
  }
  if (min && num < min) {
    return { message: `This field must be at least ${min}`, isError: true };
  }
  if (max && num > max) {
    return { message: `This field must be at most ${max}`, isError: true };
  }
  return false;
};
const isValidateUrl = (url) => {
  if (!url) {
    return { message: "This field is required", isError: true };
  }
  if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
    return { message: "Invalid URL", isError: true };
  }
  return false;
};

export {
  isValidateString,
  isValidtePassword,
  isvalidateEmail,
  isValidateFile,
  isValidateNumber,
  isValidateUrl,
};

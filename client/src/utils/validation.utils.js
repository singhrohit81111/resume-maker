// src/utils/validationUtils.js

export const validateEmail = (email) => {
    // Simple email validation using regular expression
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    // Validate password length (example)
    return password.length >= 6;
  };
  
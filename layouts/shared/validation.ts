import * as yup from "yup";

export const PasswordValidation = yup
  .string()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters");

import * as yup from "yup";

export const PartialValidate = yup.object().shape({
  userId: yup.string().required("Username is required").label("userId"),
  email: yup.string().email().required("Email is required").label("email"),
});

export const validationSchema = yup
  .object()
  .shape({
    password: yup.string().required("Password is required"),
    otp: yup.string().required("OTP is required"),
  })
  .concat(PartialValidate);

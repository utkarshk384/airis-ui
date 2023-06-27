import * as yup from "yup";

/* Utils */
import { PasswordValidation } from "../shared/validation";

export const PartialValidate = yup.object().shape({
  userId: yup.string().required("Username is required").label("userId"),
  email: yup.string().email().required("Email is required").label("email"),
});

export const validationSchema = yup
  .object()
  .shape({
    password: PasswordValidation.matches(
      /[A-z]+/,
      "Password must contain one upper and lower case letter"
    )
      .matches(/[0-9]/, "Password must contain one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain one special character"
      ),
    otp: yup.string().required("OTP is required"),
  })
  .concat(PartialValidate);

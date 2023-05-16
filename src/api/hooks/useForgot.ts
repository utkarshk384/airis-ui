import { useMutation } from "@tanstack/react-query";

/* API */
import { ForgotPassword, GenerateOtp } from "../handlers/forgot";

export const useForgot = () => {
  const OtpMutation = useMutation(GenerateOtp);

  const ForgotMutation = useMutation({
    mutationFn: ForgotPassword,
  });

  return { OtpMutation, ForgotMutation };
};

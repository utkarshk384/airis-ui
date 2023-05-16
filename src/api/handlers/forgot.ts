import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import type {
  PartialForgotPayload,
  ForgotPayload,
  ForgotPasswordResponse,
  GenerateOTPResponse,
} from "../types/forgot";

const request = {
  method: "POST" as const,
  defaultHeaders: true,
};

export const GenerateOtp = async (data: PartialForgotPayload) => {
  return await AxiosWrapper<GenerateOTPResponse, PartialForgotPayload>({
    ...request,
    body: data,
    url: ENDPOINTS.generateOtp,
  });
};

export const ForgotPassword = async (data: ForgotPayload) => {
  return await AxiosWrapper<ForgotPasswordResponse, ForgotPayload>({
    ...request,
    body: data,
    url: ENDPOINTS.forgot,
  });
};

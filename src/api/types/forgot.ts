import type { Success, Failure } from "./shared";

export interface PartialForgotPayload {
  userId: string;
  email: string;
}

export interface ForgotPayload extends PartialForgotPayload {
  password: string;
  otp: string;
}

export interface GenerateOTPResponse {
  statusCode: number;
  referenceAPI: string;
  success: Success<GenerateOTPResponse>;
  failure: Failure;
}

export interface ForgotPasswordResponse {
  statusCode: number;
  referenceAPI: string;
  success: Success<ForgotPasswordResult>;
  failure: Failure;
}

interface ForgotPasswordResult {
  value: string;
}

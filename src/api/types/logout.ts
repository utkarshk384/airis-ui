import type { Success, Failure } from "./shared";

export type LogoutResponse = {
  statusCode: number;
  referenceAPI: string;
  success: Success<LogoutResult>;
  failure: Failure;
};

export type LogoutResult = {
  value: string;
};

export type LogoutPayload = {
  userId: string;
  token: string;
};

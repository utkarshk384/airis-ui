import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Utils */
import { encodeBase64 } from "@src/utils";

/* Types */
import type { LoginPayload } from "../types";

export const LoginUser = async (data: LoginPayload) => {
  // data.password = encodeBase64(data.password);

  return AxiosWrapper({
    method: "POST",
    body: data,
    url: ENDPOINTS.login,
    defaultHeaders: true,
  });
};

export const getIPAddress = async () => {
  return AxiosWrapper({
    method: "GET",
    url: "https://geolocation-db.com/json/",
    defaultHeaders: true,
  });
};

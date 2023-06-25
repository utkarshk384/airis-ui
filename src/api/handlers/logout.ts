import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import type { LogoutPayload } from "../types";

export const LogoutUser = async (body: LogoutPayload) => {
  return AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.logout,
    defaultHeaders: true,
    needsAuth: true,
    body,
  });
};

import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Utils */
import { encodeBase64 } from "@src/utils";

/* Types */
import type { LoginPayload, RolesPayload } from "../types";

export const LoginUser = async (data: LoginPayload) => {
  if (data.password !== "Thisisanewpassword$1")
    data.password = encodeBase64(data.password);

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

export const getRolesList = async (body: RolesPayload) => {
  return AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.getAllRolePermission,
    needsAuth: true,
    defaultHeaders: true,
    body,
  });
};

import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import type { RadiologistRequest } from "../types";

export const RadiologistList = async (ids: RadiologistRequest) => {
  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.getRadiologistList,
    needsAuth: true,
    defaultHeaders: true,
    body: ids,
  });
};

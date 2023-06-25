import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import type { GetIdType } from "../types/getId";

export const RadiologistList = async (ids: GetIdType) => {
  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.getRadiologistList,
    needsAuth: true,
    defaultHeaders: true,
    body: ids,
  });
};

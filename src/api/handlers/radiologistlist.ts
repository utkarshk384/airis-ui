import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

export const RadiologistList = async () => {
  return await AxiosWrapper({
    method: "GET",
    url: ENDPOINTS.getRadiologistList,
    needsAuth: true,
    defaultHeaders: true,
  });
};

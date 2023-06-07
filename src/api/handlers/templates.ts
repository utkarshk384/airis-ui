import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

export const ListRadiologistTemplate = async () => {
  return await AxiosWrapper({
    url: ENDPOINTS.getRadioloistTemplate,
    method: "GET",
    needsAuth: true,
  });
};

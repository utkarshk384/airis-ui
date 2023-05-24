import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

export const Dashboard = async () => {
  return await AxiosWrapper({
    method: "GET",
    url: ENDPOINTS.forgot,
    defaultHeaders: true,
  });
};

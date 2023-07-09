import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import type { getAllergyRequest, AllergyType } from "../types";

export const getAllergy = async (body: getAllergyRequest) => {
  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.getAllergies,
    body,
    defaultHeaders: true,
    needsAuth: true,
  });
};

export const addUpdateAllergy = async (body: AllergyType) => {
  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.addUpdateAllergy,
    body,
    defaultHeaders: true,
    needsAuth: true,
  });
};

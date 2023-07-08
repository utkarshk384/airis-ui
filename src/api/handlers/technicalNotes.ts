import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import { getTechnicalNotesRequest, TechnicalNotesType } from "../types";

export const getTechnicalNotes = async (body: getTechnicalNotesRequest) => {
  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.getTechnicalNotes,
    body,
    defaultHeaders: true,
    needsAuth: true,
  });
};

export const addUpdateTechnicalNotes = async (body: TechnicalNotesType) => {
  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.addUpdateTechnicalNotes,
    body,
    defaultHeaders: true,
    needsAuth: true,
  });
};

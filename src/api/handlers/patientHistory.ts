import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import { GetIdType } from "../types/getId";

export const PatientHistory = async (ids: GetIdType, patientId: string) => {
  const body = {
    patientId,
    ...ids,
  };

  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.getPatientHistory,
    needsAuth: true,
    defaultHeaders: true,
    body,
  });
};

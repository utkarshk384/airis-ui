import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import type { GetIdType } from "../types/getId";
import type { PatientReportPayload } from "../types";

export const PatientReport = async (body: PatientReportPayload) => {
  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.addUpdatePatientReport,
    needsAuth: true,
    defaultHeaders: true,
    body,
  });
};

export const PatientReportList = async (ids: GetIdType, patientId: string) => {
  const body = {
    patientId,
    ...ids,
  };
  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.getAlPatientReports,
    needsAuth: true,
    defaultHeaders: true,
    body,
  });
};

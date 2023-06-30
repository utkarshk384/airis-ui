import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Utils */
import { FormatDate } from "@utils/dates-fns";

/* Types */
import type {
  PatientListPayload,
  PatientListRequest,
} from "../types/patientList";

export const Dashboard = async (data: PatientListPayload) => {
  const { orgId, branchId, referenceDate } = data;

  const body: PatientListRequest = {
    branchId: typeof branchId === "string" ? parseInt(branchId) : branchId,
    orgId: typeof orgId === "string" ? parseInt(orgId) : orgId,
    referenceDate: FormatDate(referenceDate, "dd-MM-yyyy"),
  };

  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.getPatientList,
    defaultHeaders: true,
    needsAuth: true,
    body,
  });
};

import { useMutation } from "@tanstack/react-query";

/* API */
import { Dashboard } from "../handlers/paitentList";

/* Hooks */
import { useGetId } from "./useGetId";

/* Types */
import type {
  PatientListResponse,
  PatientListPayload,
} from "../types/patientList";

export const usePatientList = () => {
  const { orgId, branchId } = useGetId();

  const PatientListMutation = useMutation<
    PatientListResponse,
    PatientListResponse,
    PatientListPayload
  >(Dashboard as any);

  return { PatientListMutation, orgId, branchId };
};

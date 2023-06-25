import { useQuery } from "@tanstack/react-query";

/* Types */
import { useGetId } from "./useGetId";

/* API */
import { PatientHistory } from "../handlers/patientHistory";

/* Types */
import type { PatientHistoryResponse } from "../types/patientHistory";

export const usePatientHistory = (patientId: string) => {
  const ids = useGetId();

  const getPatientHistory = useQuery<PatientHistoryResponse, unknown>(
    ["patient-history", patientId],
    {
      queryFn: () => PatientHistory(ids, patientId) as any,
    }
  );

  return { getPatientHistory };
};

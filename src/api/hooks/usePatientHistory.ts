import { useQuery } from "@tanstack/react-query";

/* Types */
import { useGetId } from "./useGetId";

/* API */
import { PatientHistory } from "../handlers/patientHistory";

/* Types */
import type { PatientHistoryResponse } from "../types/patienthistory";
import { useState } from "react";

export const usePatientHistory = () => {
  const ids = useGetId();

  const [patientId, setPatientId] = useState<string>("");

  const getPatientHistory = useQuery<PatientHistoryResponse, unknown>(
    ["patient-history", patientId],
    {
      queryFn: () => PatientHistory(ids, patientId) as any,
    }
  );

  return { getPatientHistory, setPatientId };
};

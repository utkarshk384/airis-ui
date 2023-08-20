import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

/* API */
import { Dashboard } from "../handlers/patientList";

/* Hooks */
import { useGetId } from "./useGetId";

/* Types */
import type { PatientListResponse } from "../types/patientList";

export const usePatientList = () => {
  const { orgId, branchId } = useGetId();

  const [referenceDate, setReferenceDate] = useState<Date>(new Date());

  const PatientList = useQuery<PatientListResponse, PatientListResponse>(
    ["get-patient-list", orgId, branchId, referenceDate],
    () =>
      Dashboard({
        orgId,
        branchId,
        referenceDate,
      }) as any
  );

  return { referenceDate, PatientList, setReferenceDate };
};

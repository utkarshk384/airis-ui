import { useQuery, useMutation } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";

/* API */
import { useState } from "react";
import { PatientReport, PatientReportList } from "../handlers/patientReport";

/* Types */
import { PatientReportResponse, PatientReportPayload } from "../types";

export const usePatientReport = () => {
  const ids = useGetId();

  const [patientId, setPatientId] = useState<string>("");

  const ReportMutation = useMutation<
    PatientReportResponse,
    unknown,
    PatientReportPayload
  >({
    mutationFn: (body) => PatientReport({ ...body, ...ids }) as any,
  });

  const getPatientReports = useQuery<PatientReportResponse[], unknown>(
    ["patient-reports", patientId],
    {
      queryFn: () => PatientReportList(ids, patientId) as any,
    }
  );

  return { getPatientReports, ReportMutation, setPatientId };
};

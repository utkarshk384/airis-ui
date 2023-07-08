import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

/* API */
import {
  getTechnicalNotes,
  addUpdateTechnicalNotes,
} from "../handlers/technicalNotes";

/* Hooks */
import { useGetId } from "./useGetId";
import {
  TechnicalNotesResponse,
  TechnicalNotesType,
  TechnicalNotesPayload,
} from "../types";

export const useTechnicalNotes = () => {
  const ids = useGetId();
  const [patientId, setTNPatientId] = useState("");

  const TNQuery = useQuery<TechnicalNotesResponse, unknown>(
    ["technicalNotes", patientId],
    () => getTechnicalNotes({ ...ids, patientId }) as any
  );

  const TNMutation = useMutation<
    TechnicalNotesType,
    unknown,
    TechnicalNotesPayload
  >(
    (data) =>
      addUpdateTechnicalNotes({
        organizationId: ids.orgId,
        branchId: ids.branchId,
        ...data,
      }) as any
  );

  return { TNQuery, setTNPatientId, TNMutation };
};

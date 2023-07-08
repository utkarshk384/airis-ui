import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";

/* API */
import { getAllergy, addUpdateAllergy } from "../handlers/allergy";

/* Types */
import type { AllergyResponse, AllergyType, AllergyPayload } from "../types";

export const useTechnicalNotes = () => {
  const ids = useGetId();
  const [patientId, setTNPatientId] = useState("");

  const TNQuery = useQuery<AllergyResponse, unknown>(
    ["technicalNotes", patientId],
    () => getAllergy({ ...ids, patientId }) as any
  );

  const TNMutation = useMutation<AllergyType, unknown, AllergyPayload>(
    (data) =>
      addUpdateAllergy({
        organizationId: ids.orgId,
        branchId: ids.branchId,
        ...data,
      }) as any
  );

  return { TNQuery, setTNPatientId, TNMutation };
};

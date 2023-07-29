import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";

/* API */
import { getAllergy, addUpdateAllergy } from "../handlers/allergy";

/* Utils */
import { FormatDate } from "@utils/dates-fns";

/* Types */
import type { AllergyResponse, AllergyType, AllergyPayload } from "../types";

export const useAllergies = () => {
  const ids = useGetId();
  const [patientId, setAllergyPatientId] = useState("");

  const allergyQuery = useQuery<AllergyResponse, unknown>(
    ["technicalNotes", patientId],
    () => getAllergy({ ...ids, patientId }) as any
  );

  const allergyMutation = useMutation<AllergyType, unknown, AllergyPayload>(
    (data) =>
      addUpdateAllergy({
        ...data,
        organizationId: ids.orgId,
        branchId: ids.branchId,
        lastUpdatedDate: FormatDate(new Date(), "dd-MM-yyyy HH:mm:ss"),
      }) as any
  );

  return { allergyQuery, setAllergyPatientId, allergyMutation };
};

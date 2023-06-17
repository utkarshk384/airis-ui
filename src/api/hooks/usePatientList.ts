import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";

/* API */
import { Dashboard } from "../handlers/paitentList";

/* Hooks */
import { useLocalStorage } from "@src/hooks";

/* Consts */
import { LOCAL_STORAGE_KEYS } from "@src/consts";

/* Types */
import type {
  PatientListResponse,
  PatientListPayload,
} from "../types/patientList";

export const useGetId = () => {
  const { getStorageValue } = useLocalStorage();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const orgId = useMemo(() => getStorageValue(LOCAL_STORAGE_KEYS.orgId), []);
  const branchId = useMemo(
    () => getStorageValue(LOCAL_STORAGE_KEYS.branchId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { orgId, branchId };
};

export const usePatientList = () => {
  const { orgId, branchId } = useGetId();

  const PatientListMutation = useMutation<
    PatientListResponse,
    PatientListResponse,
    PatientListPayload
  >(Dashboard as any);

  return { PatientListMutation, orgId, branchId };
};

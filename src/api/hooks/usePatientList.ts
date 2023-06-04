import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

/* API */
import { Dashboard } from "../handlers/paitentList";

/* Hooks */
import useLocalStorage from "@src/hooks/useLocalStorage";

/* Consts */
import { LOCAL_STORAGE_KEYS } from "@src/consts";

/* Types */
import type {
  PatientListResponse,
  PatientListPayload,
} from "../types/patientList";

export const useGetId = () => {};

export const usePatientList = () => {
  const { getStorageValue } = useLocalStorage();

  const PatientListMutation = useMutation<
    PatientListResponse,
    PatientListResponse,
    PatientListPayload
  >(Dashboard as any);

  const IdRef = useRef({ orgId: "", branchId: "" });

  useEffect(() => {
    const orgId = getStorageValue(LOCAL_STORAGE_KEYS.orgId);
    const branchId = getStorageValue(LOCAL_STORAGE_KEYS.branchId);

    IdRef.current = { orgId, branchId };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { PatientListMutation, ...IdRef.current };
};

import { useMemo } from "react";

/* Hooks */
import { useLocalStorage } from "@src/hooks";

/* Consts */
import { LOCAL_STORAGE_KEYS } from "@src/consts";

/* Types */
import { GetIdType } from "../types/getId";

export const useGetId = (): GetIdType => {
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

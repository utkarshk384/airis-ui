import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";
import { useCookie } from "@src/hooks";

/* API */
import { RadiologistList } from "../handlers/radiologistList";

import type { RadiologistListResponse } from "../types/radiologistlist";

export const useRadiologistList = () => {
  const ids = useGetId();

  const { COOKIE_KEYS, getCookie } = useCookie();

  const userId = useMemo(() => getCookie(COOKIE_KEYS.id), [])

  const getRadiologistList = useQuery<RadiologistListResponse, unknown>(
    ["radiologist-list"],
    {
      queryFn: () => RadiologistList({...ids, userId}) as any,
    }
  );

  return { getRadiologistList };
};

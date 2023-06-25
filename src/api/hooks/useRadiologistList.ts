import { useQuery } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";

/* API */
import { RadiologistList } from "../handlers/radiologistList";

import type { RadiologistListResponse } from "../types/radiologistlist";

export const useRadiologistList = () => {
  const ids = useGetId();

  const getRadiologistList = useQuery<RadiologistListResponse, unknown>(
    ["radiologist-list"],
    {
      queryFn: () => RadiologistList(ids) as any,
    }
  );

  return { getRadiologistList };
};

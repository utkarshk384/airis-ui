import { useQuery } from "@tanstack/react-query";

/* API */
import { RadiologistList } from "../handlers/radiologistlist";

import type { RadiologistListResponse } from "../types/radiologistlist";

export const useRadiologistList = () => {
  const getRadiologistList = useQuery<RadiologistListResponse, unknown>(
    ["radiologist-list"],
    {
      queryFn: RadiologistList as any,
    }
  );

  return { getRadiologistList };
};

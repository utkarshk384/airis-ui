import { useQuery, useMutation } from "@tanstack/react-query";

/* API */
import { ListRadiologistTemplate } from "../handlers/templates";

import type { ListRadiologistTemplateResponse } from "../types/templates";

export const useTemplates = () => {
  const getRadiologistTemplate = useQuery<
    ListRadiologistTemplateResponse,
    unknown
  >(["radiologist-template"], {
    queryFn: ListRadiologistTemplate as any,
  });

  return { getRadiologistTemplate };
};

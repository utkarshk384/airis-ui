import { useQuery, useMutation } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";

/* API */
import {
  ListRadiologistTemplate,
  AddUpdateTemplate,
} from "../handlers/templates";

import type {
  TemplatePayload,
  AddUpdateTemplateResponse,
  ListRadiologistTemplateResponse,
} from "../types/templates";

export const useTemplates = () => {
  const ids = useGetId();

  const getRadiologistTemplate = useQuery<
    ListRadiologistTemplateResponse,
    unknown
  >(["radiologist-template"], {
    queryFn: ListRadiologistTemplate as any,
  });

  const addUpdateTemplate = useMutation<
    AddUpdateTemplateResponse,
    unknown,
    TemplatePayload
  >((data) => AddUpdateTemplate({ ...data, ...ids }) as any);

  return { getRadiologistTemplate, addUpdateTemplate };
};

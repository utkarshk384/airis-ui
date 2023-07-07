import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";

/* API */
import {
  ListRadiologistTemplate,
  AddUpdateTemplate,
} from "../handlers/templates";

/* Types */
import type {
  TemplatePayload,
  AddUpdateTemplateResponse,
  listRadiologistPayloadType,
  ListRadiologistTemplateResponse,
} from "../types/templates";

export const useTemplates = () => {
  const ids = useGetId();

  const [listRadiologistPayload, setListRadiologistPayload] =
    useState<listRadiologistPayloadType>({
      ...ids,
      bodyPart: null,
      reportTemplateTags: null,
      radiologistMCRID: null,
      procedureMasterId: null,
    });

  const getRadiologistTemplate = useQuery<
    ListRadiologistTemplateResponse,
    unknown
  >(["radiologist-template", listRadiologistPayload], {
    queryFn: () => ListRadiologistTemplate(listRadiologistPayload) as any,
  });

  const addUpdateTemplate = useMutation<
    AddUpdateTemplateResponse,
    unknown,
    TemplatePayload
  >((data) => AddUpdateTemplate({ ...data, ...ids }) as any);

  return {
    getRadiologistTemplate,
    addUpdateTemplate,
    setListRadiologistPayload,
  };
};

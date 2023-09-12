import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";
import { useCookie } from "@src/hooks";

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
  const { COOKIE_KEYS, getCookie } = useCookie();

  const userId = useMemo(() => getCookie(COOKIE_KEYS.id), [])

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
  >((data) => AddUpdateTemplate({ ...data, ...ids, userId }) as any);

  return {
    getRadiologistTemplate,
    addUpdateTemplate,
    setListRadiologistPayload,
  };
};

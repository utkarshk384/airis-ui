import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import type { GetIdType } from "../types/getId";
import type { TemplateBody, TemplatePayload } from "../types";

export const ListRadiologistTemplate = async () => {
  return await AxiosWrapper({
    url: ENDPOINTS.getRadioloistTemplate,
    method: "GET",
    needsAuth: true,
  });
};

export const AddUpdateTemplate = async (data: TemplatePayload & GetIdType) => {
  const body: TemplateBody = {
    reportTemplateId: data.reportTemplateId || 0,
    organizationId: data.orgId ? parseInt(data.orgId) : -1,
    branchId: data.branchId ? parseInt(data.branchId) : -1,
    reportTemplate: data.text,
    reportTemplateTags: data.tags,
    procedureMasterId: data.exam,
    isPrivate: data.visibilty === "private" ? 1 : 0,
    radiologistMCRID: data.radiologist.toString(),
    abnormalityTags: null,
    bodyPart: null,
    enteredBy: null,
    templateLocked: null,
    templateStatus: null,
  };

  return await AxiosWrapper({
    url: ENDPOINTS.addUpdateTemplate,
    method: "POST",
    needsAuth: true,
    body,
  });
};

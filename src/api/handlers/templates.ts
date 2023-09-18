import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import type { GetIdType } from "../types/getId";
import type {
  TemplateBody,
  TemplatePayload,
  listRadiologistPayloadType,
} from "../types";

export const ListRadiologistTemplate = async (
  data: listRadiologistPayloadType
) => {
  const body = {
    ...data,
    orgId: parseInt(data.orgId),
    branchId: parseInt(data.branchId),
  };

  return await AxiosWrapper({
    url: ENDPOINTS.getRadioloistTemplate,
    method: "POST",
    needsAuth: true,
    body,
  });
};

export const AddUpdateTemplate = async (
  data: TemplatePayload & GetIdType & { userId: string }
) => {
  const body: TemplateBody = {
    templateName: data.templateName,
    reportTemplateId: data.reportTemplateId || 0,
    organizationId: data.orgId ? parseInt(data.orgId) : -1,
    branchId: data.branchId ? parseInt(data.branchId) : -1,
    modalityId: data.modality ? parseInt(data.modality) : null,
    reportTemplate: data.text,
    reportTemplateTags: data.tags,
    procedureMasterId: data.exam === 0 ? null : data.exam,
    isPrivate: data.visibilty === "private" ? 1 : 0,
    radiologistMCRID: data.radiologist.toString(),
    abnormalityTags: data.tags || null,
    bodyPart: data.bodyPart || null,
    enteredBy: data.userId as unknown as number,
    templateLocked: 1,
    templateStatus: 1,
  };

  console.log({ data, body });

  return await AxiosWrapper({
    url: ENDPOINTS.addUpdateTemplate,
    method: "POST",
    needsAuth: true,
    body,
  });
};

export const GetTemplates = async (orgId: string | number) => {
  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.getTemplates,
    body: { orgId },
    needsAuth: true,
  });
};

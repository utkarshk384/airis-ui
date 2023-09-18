import type { APIResponse } from "./shared";

export type ListRadiologistTemplateResponse = TemplateType[];

export type GetTemplatesResponse = TemplateType[];

export type FailedTemplateResponse = APIResponse<"", string>;

export type listRadiologistPayloadType = {
  orgId: string;
  branchId: string;
  bodyPart: string | null;
  reportTemplateTags: string | null;
  radiologistMCRID: string | null;
  procedureMasterId: number | null;
};

export type TemplateType = {
  templateName: string;
  enteredByText: string;
  reportTemplateId: number;
  procedureMasterText: string | null;
  modalityText: string | null;
  organizationId: number;
  modalityId: number;
  reportTemplate: string;
  reportTemplateTags: string;
  procedureMasterId: number;
  isPrivate: boolean;
  radiologistMCRID: string;
  abnormalityTags: string;
  bodyPart: string;
  enteredBy: string;
  enteredDateTime: string | null;
  templateLocked: boolean;
  templateStatus: boolean;
};

export type TemplatePayload = {
  reportTemplateId?: number;
  templateName: string;
  radiologist: string;
  modality: string;
  exam: number;
  visibilty: "public" | "private";
  tags: string;
  text: string;
  bodyPart: string;
};

export type TemplateBody = {
  templateName: string;
  reportTemplateId: number;
  organizationId: number;
  branchId: number;
  modalityId: number | null;
  reportTemplate: string;
  reportTemplateTags: string;
  procedureMasterId: number | null;
  isPrivate: number;
  radiologistMCRID: string;
  abnormalityTags: string | null;
  bodyPart: string | null;
  enteredBy: number | null;
  templateLocked: number | null;
  templateStatus: number | null;
};

export type AddUpdateTemplateResponse = {
  reportTemplateId: number;
  organizationId: number;
  modalityId: number | null;
  reportTemplate: string;
  reportTemplateTags: string;
  procedureMasterId: number | null;
  isPrivate: boolean;
  radiologistMCRID: string;
  abnormalityTags: string | null;
  bodyPart: string | null;
  enteredBy: string | null;
  enteredDateTime: string;
  templateLocked: boolean;
  templateStatus: boolean;
};

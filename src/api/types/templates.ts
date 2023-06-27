export type ListRadiologistTemplateResponse = TemplateType[];

export type TemplateType = {
  reportTemplateId: number;
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
  reportTemplateId: number;
  organizationId: number;
  branchId: number;
  reportTemplate: string;
  reportTemplateTags: string;
  procedureMasterId: number;
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

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

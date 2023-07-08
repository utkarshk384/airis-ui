import type { Success, Failure } from "./shared";

export type getTechnicalNotesRequest = {
  patientId: string;
  orgId: string;
  branchId: string;
};

export type TechnicalNotesPayload = Omit<
  TechnicalNotesType,
  "organizationId" | "branchId"
>;

export type TechnicalNotesResponse = TechnicalNotesType[];

export type TechnicalNotesType = {
  patientClinicalNotesId: number;
  organizationId: string;
  branchId: string;
  patientIndexId: number;
  createdBy: number;
  lastUpdatedBy: number;
  notesDate: string;
  createdDate: string;
  lastUpdatedDate: string;
  notesStatus: boolean;
  recStatus: boolean;
  clinicalNotesText: string;
};

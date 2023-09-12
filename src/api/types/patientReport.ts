import type { Success, Failure } from "./shared";

export type PatientReportPayload = {
  patientIndexId: string | number;
  modalityId: string | number;
  visitId: string | number;
  procedureMasterId: string | number;
  enteredBy: string | number;
  enteredDateTime: string;
  reportStatus: string | number;
  resultsPrimarySignedBy: string | number | null;
  resultsPSignedDateTime: string | null;
  resultsSecondarySignedBy: string | number | null;
  resultsSecondaryDateTime: string | null;
  templateContent: string;
  verifiedBy: string | number | null;
  referringDoctor: string | number | null;
  verifiedDateTime: string | number | null;
};

export type PatientReportRequest = {
  organizationId: string | number;
  branchId: string | number;
} & PatientReportPayload;

export type PatientReportResponse = {
  patientReportId: number;
  patientIndexId: string | number;
  organizationId: string | number;
  branchId: string | number;
  modalityId: string | number;
  visitId: string | number;
  procedureMasterId: string | number;
  enteredBy: string | number;
  enteredDateTime: string;
  reportStatus: boolean;
  templateContent: string;
  resultsPrimarySignedBy: string | number;
  resultsPSignedDateTime: string;
  resultsSecondarySignedBy: string | number;
  resultsSecondaryDateTime: string;
  verifiedBy: string | number;
  verifiedDateTime: string;
};

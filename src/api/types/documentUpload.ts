import type { Success, Failure } from "./shared";

export type DocumentUploadRequest = {
  orgId: string;
  branchId: string;
} & DocumentUploadPayload;

export type DocumentUploadPayload = {
  patientVisitIndexId: number;
  patientIndexId: number;
  documentUploadedBy: string;
  documentUploadedDate: string;
  file: File;
};

export type DocumentUploadResponse = {
  patientDocumentId: number;
  patientVisitIndexId: number;
  patientIndexId: number;
  orgId: number;
  branchId: number;
  documentUploadedDate: string;
  documentUploadedBy: number;
};

export type GetDocumentUploadRequest = {
  id: string | number; // Patient Visit index Id
  patientId: string | number;
};

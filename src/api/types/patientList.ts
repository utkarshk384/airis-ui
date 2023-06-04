import type { Success, Failure } from "./shared";

export type PatientListPayload = {
  orgId: string;
  branchId: string;
  referenceDate: Date;
};

export type PatientListRequest = {
  orgId: number;
  branchId: number;
  referenceDate: string;
};

export type PatientListResponse = PatientListType[];

export type PatientListType = {
  patientVisitIndexId: number;
  patientIndexId: number;
  patientName: string;
  accessionNumber: string;
  dateofBirth: string;
  administrativeSex: string;
  administrativeSexText: string;
  phoneNumberHome: string;
  phoneNumberBusiness: string;
  referringDoctor: string;
  procedure: number;
  procedureText: string;
  modalityText: string;
  modality: number;
  reportId: number;
  reportDateTime: string;
  technicianNotesDateTime: string;
  allergy: string;
  reportStatus: number;
  reportStatusText: string;
  orgId: number;
  branchId: number;
  visitDate: string;
};

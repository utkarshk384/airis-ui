export type PatientHistoryResponse = PatientHistory[];

export type PatientHistory = {
  patientVisitIndexId: number;
  patientIndexId: number;
  referringDoctor: string | null;
  procedure: number | null;
  procedureText: string | null;
  modalityText: string | null;
  modality: number | null;
  reportStatus: "In Progress" | "Not Started" | "Completed" | null;
  reportStatusText: "NOT_STARTED" | "DRAFT" | "APPROVED";
  orgId: number;
  branchId: number;
  visitDate: string;
};

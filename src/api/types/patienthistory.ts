export type PatientHistoryResponse = PatientHistory[];

type PatientHistory = {
  patientVisitIndexId: number;
  patientIndexId: number;
  referringDoctor: string | null;
  procedure: number | null;
  procedureText: string | null;
  modalityText: string | null;
  modality: number | null;
  reportStatus: "In Progress" | "Not Started" | "Completed" | null;
  orgId: number;
  branchId: number;
  visitDate: string;
};

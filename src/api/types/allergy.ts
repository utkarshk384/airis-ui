import type { Success, Failure } from "./shared";

export type getAllergyRequest = {
  patientId: string;
  orgId: string;
  branchId: string;
};

export type AllergyType = {
  patientAllergyId: number | null;
  organizationId: string;
  branchId: string;
  patientIndexId: number | null;
  createdBy: number | null;
  lastUpdatedBy: number | null;
  createdDate: string;
  lastUpdatedDate: string;
  recStatus: number | null;
  allergyText: string;
};

export type AllergyPayload = Omit<AllergyType, "organizationId" | "branchId">;

export type AllergyResponse = AllergyType[];

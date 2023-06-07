export type RadiologistListResponse = RadiologistType[];

export type RadiologistType = {
  radiologistId: number;
  organizationId: number;
  qualification1: string | null;
  branchId: number;
  qualification2: string | null;
  radiologistFullName: string;
  radiologistSignatureName: string;
  mcrnumber: string;
};

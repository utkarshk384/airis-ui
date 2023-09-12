import type { Failure, Success } from "./shared";

export interface LoginPayload {
  userName: string;
  password: string;
  ipAddress: string;
}

export interface LoginResponse {
  statusCode: number;
  referenceAPI: string;
  success: Success<LoginResult>;
  failure: Failure;
}

export type LoginResult = {
  id: number;
  userId: string;
  organizationId: number;
  branchId: number;
  loginName: string;
  passCode: string;
  passCodeStatus: boolean;
  recStatus: boolean;
  createdDateTime: string;
  createdBy: number;
  fullName: string;
  gender: number;
  contactNo: string;
  roleId: string | number;
  designationId: number | string;
  mobileNo: string;
  userEMail: string;
  otp: string;
  otpExpiryDatetime: string;
  sourceApp: string;
  token: string;
};

export interface IPAddressResponse {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: string;
  state: string;
}

export type RolesPayload = {
  orgId: number | string | null;
  branchId: number | string | null;
  userId: number | string | null;
  appRoleId: number | string | null;
  designationId: number | string | null;
};

export interface RoleType {
  rolePermissionId: number | null;
  organizationId: number | null;
  branchId: number | null;
  featureId: number | null;
  featureIdentifier: string;
  appRoleId: string;
  permissions: string;
  recActive: boolean;
  createdDateTime: string | null;
  createdBy: number | string | null;
}

export type RoleResponse = RoleType[];

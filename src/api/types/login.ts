export interface LoginPayload {
  userName: string;
  password: string;
  ipAddress: string;
}

export interface LoginResponse {
  statusCode: number;
  referenceAPI: string;
  success: Success;
  failure: Failure;
}

export interface Failure {
  message: string;
}

export interface Success {
  result: Result;
}

export interface Result {
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
  mobileNo: string;
  userEMail: string;
  otp: string;
  otpExpiryDatetime: string;
  sourceApp: string;
  token: string;
}

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

import { use, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

/* API */
import { LoginUser, getIPAddress, getRolesList } from "../handlers/login";

import type {
  ResponseType,
  LoginPayload,
  LoginResponse,
  IPAddressResponse,
  RoleResponse,
  RolesPayload,
} from "../types";

export const useLogin = () => {
  const [rolesPayload, setRolesPayload] = useState<RolesPayload>({
    appRoleId: null,
    branchId: null,
    designationId: null,
    orgId: null,
    userId: null,
  });

  const LoginMutation = useMutation<LoginResponse, any, LoginPayload>(
    LoginUser as any
  );
  const IPQuery = useQuery<IPAddressResponse, ResponseType>(["get-ip"], {
    queryFn: getIPAddress as any,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const getRoles = useQuery<RoleResponse, ResponseType>(
    ["get-roles", rolesPayload],
    {
      queryFn: () => getRolesList(rolesPayload) as any,
      refetchOnMount: false,
    }
  );

  return { LoginMutation, IPQuery, getRoles, setRolesPayload, rolesPayload };
};

import { useMutation, useQuery } from "@tanstack/react-query";

/* API */
import { LoginUser, getIPAddress } from "../handlers/login";

import type {
  ResponseType,
  LoginPayload,
  LoginResponse,
  IPAddressResponse,
} from "../types";

export const useLogin = () => {
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

  return { LoginMutation, IPQuery };
};

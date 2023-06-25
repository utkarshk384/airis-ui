import { useQuery, useMutation } from "@tanstack/react-query";

/* API */
import { LogoutUser } from "../handlers/logout";
import { LogoutPayload, LogoutResponse } from "../types";

export const useLogout = () => {
  const userLogout = useMutation<LogoutResponse, LogoutResponse, LogoutPayload>(
    LogoutUser as any
  );

  return { userLogout };
};

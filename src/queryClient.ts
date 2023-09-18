import { QueryClient } from "@tanstack/react-query";

import Router from "next/router";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      staleTime: 300000,
      retry: 0,
      onError(err: any) {
        const isExpired = err?.data?.includes("INVALID SSO TOKEN");
        if (!isExpired) return;

        Router.push("/login");
      },
    },
  },
});

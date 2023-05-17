import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

/* Utils */
import { getLocalStoragevalue } from "@utils/localStorage";

/* Consts */
import { LOCAL_STORAGE_KEYS, PUBLIC_PATHS } from "@src/consts";

/* Types */

type Props = {
  children?: React.ReactNode;
};

export const RouteGuard: React.FC<Props> = (props) => {
  const { children } = props;

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const authCheck = useCallback(
    (path: string) => {
      if (PUBLIC_PATHS.includes(path)) return true;

      const token = getLocalStoragevalue(LOCAL_STORAGE_KEYS.token);
      const userId = getLocalStoragevalue(LOCAL_STORAGE_KEYS.userId);

      if (token && userId) return true;
      else {
        router.push(`/login?redirect_uri=${path}`);
        return false;
      }
    },
    [router]
  );

  useEffect(() => {
    setAuthorized(authCheck(router.pathname));
  }, [authCheck, router.pathname]);

  return <>{authorized && children}</>;
};

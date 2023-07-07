import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";

/* Components */
import { Preloader } from "./preloader";

/* Utils */
import { getCookie } from "@utils/cookie";
import { parseISO, isBefore } from "@utils/dates-fns";
import { getLocalStoragevalue } from "@utils/localStorage";

/* Consts */
import { COOKIE_KEYS, LOCAL_STORAGE_KEYS, PUBLIC_PATHS } from "@src/consts";

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

      const validity = getLocalStoragevalue(LOCAL_STORAGE_KEYS.tokenValidity);
      const token = getCookie(COOKIE_KEYS.token);
      const userId = getCookie(COOKIE_KEYS.userId);

      let expiry = new Date();
      if (validity) expiry = parseISO(validity);

      if (token && userId && isBefore(new Date(), expiry)) return true;
      else {
        if (!path.includes("/login"))
          router.push(`/login?redirect_uri=${path}`);
        return false;
      }
    },
    [router]
  );

  useEffect(() => {
    let path = router.pathname;
    const isDynamic = path.includes("[") || path.includes("]");

    if (isDynamic) {
      const param = router.asPath.split("/").at(-1);
      if (param) path = path.replace(/\[.*\]/, param);
    }

    setAuthorized(authCheck(path));
  }, [authCheck, router.asPath, router.pathname]);

  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     const path = Router.pathname;
  //     if (PUBLIC_PATHS.includes(path)) return true;

  //     const validity = getLocalStoragevalue(LOCAL_STORAGE_KEYS.tokenValidity);
  //     if (!validity) return;

  //     let expiry = parseISO(validity);
  //     if (isBefore(new Date(), expiry)) setAuthorized(true);
  //     else {
  //       setAuthorized(false);
  //       Router.push(`/login?redirect_uri=${path}`);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return <>{authorized ? children : <Preloader />}</>;
};

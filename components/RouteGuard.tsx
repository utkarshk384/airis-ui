import { useRouter } from "next/router";
import { useIdleTimer } from "react-idle-timer";
import { useState, useEffect, useCallback } from "react";

/* Components */
import { Preloader } from "./preloader";

/* Utils */
import { getCookie } from "@utils/cookie";

/* Consts */
import { COOKIE_KEYS, PUBLIC_PATHS } from "@src/consts";

/* Types */
type Props = {
  children?: React.ReactNode;
};

export const RouteGuard: React.FC<Props> = (props) => {
  const { children } = props;

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const { start, pause } = useIdleTimer({
    debounce: 10000,
    timeout: 1000 * 60 * 15,
    startManually: true,
    onIdle: () => {
      router.push("/login");
    },
  });

  const authCheck = useCallback(
    (path: string) => {
      if (PUBLIC_PATHS.includes(path)) {
        pause();
        return true;
      }

      const token = getCookie(COOKIE_KEYS.token);
      const userId = getCookie(COOKIE_KEYS.userId);

      if (token && userId) {
        start(); // Start activity monitor
        return true;
      } else {
        pause();
        if (!path.includes("/login"))
          router.replace(`/login?redirect_uri=${path}`);
        return false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return <>{authorized ? children : <Preloader />}</>;
};

import Router, { useRouter } from "next/router";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState, useEffect, useCallback } from "react";

/* Animations */
import * as animationData from "@src/animations/preloader.json";

/* Utils */
import { getCookie } from "@utils/cookie";
import { parseISO, isBefore } from "@utils/dates-fns";
import { getLocalStoragevalue } from "@utils/localStorage";

/* Consts */
import { COOKIE_KEYS, LOCAL_STORAGE_KEYS, PUBLIC_PATHS } from "@src/consts";
import { Heading } from "./Typography";

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
    setAuthorized(authCheck(router.pathname));
  }, [authCheck, router.pathname]);

  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     const path = Router.pathname;
  //     if (PUBLIC_PATHS.includes(path)) return true;

  //     const validity = getLocalStoragevalue(LOCAL_STORAGE_KEYS.tokenValidity);
  //     if (!validity) return;

  //     let expiry = parseISO(validity);
  //     console.log({ expiry });
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

const Preloader: React.FC = () => {
  return (
    <div className="h-screen w-screen fixed grid place-items-center">
      <div className="flex flex-col relative items-center gap-4 w-64 h-54">
        <Player autoplay src={animationData} loop />
        <Heading
          className="w-fit absolute top-2/3 translate-y-8 left-0 right-0 mx-auto"
          size="lg"
          weight="600"
        >
          Loading...
        </Heading>
      </div>
    </div>
  );
};

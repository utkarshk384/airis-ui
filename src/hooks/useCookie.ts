import { setCookie, deleteCookie, setCookies, getCookie } from "@utils/cookie";
import { COOKIE_KEYS } from "@src/consts";

export const useCookie = () => {
  return { setCookie, COOKIE_KEYS, getCookie, deleteCookie, setCookies };
};

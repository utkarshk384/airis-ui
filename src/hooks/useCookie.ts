import { setCookie, deleteCookie, setCookies, getCookie } from "@utils/cookie";

export const useCookie = () => {
  return { setCookie, getCookie, deleteCookie, setCookies };
};

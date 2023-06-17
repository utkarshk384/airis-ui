export type CookieType = {
  name: string;
  value: string | number;
} & CookieOpts;

type CookieOpts = {
  days?: number;
  path?: string;
};

export const setCookie = (cookie: CookieType) => {
  if (typeof window === "undefined") return;

  const { name, value, days = 1, path = "/" } = cookie;

  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=" +
    path;
};

export const setCookies = (
  cookies: CookieType[],
  defaultOpts: CookieOpts = { days: 1, path: "/" }
) => {
  cookies.forEach((cookie) => {
    if (!cookie.path) cookie.path = defaultOpts.path;
    if (!cookie.days) cookie.days = defaultOpts.days;

    setCookie(cookie);
  });
};

export const getCookie = (name: string) => {
  if (typeof window !== "undefined") {
    return document.cookie.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
  }

  return "";
};

export const deleteCookie = (name: string, path?: string) => {
  setCookie({ name, value: "", days: -1, path });
};

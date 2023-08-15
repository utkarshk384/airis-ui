export type CookieType = {
  name: string;
  value: string | number;
} & CookieOpts;

type CookieOpts = {
  hours?: number;
  path?: string;
};

export const setCookie = (cookie: CookieType) => {
  if (typeof window === "undefined") return;

  const { name, value, hours = 24, path = "/" } = cookie;

  const maxAge = hours * 60 * 60;
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; max-age=" +
    maxAge +
    "; path=" +
    path;
};

export const setCookies = (cookies: CookieType[], defaultOpts: CookieOpts) => {
  const { hours = 24, path = "/" } = defaultOpts;
  cookies.forEach((cookie) => {
    if (!cookie.path) cookie.path = path;
    if (!cookie.hours) cookie.hours = hours;

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
  setCookie({ name, value: "", hours: 0, path });
};

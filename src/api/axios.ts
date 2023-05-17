import Axios, { AxiosResponse } from "axios";

/* consts */
import { LOCAL_STORAGE_KEYS } from "@src/consts";
import { RequestType } from "./types";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const AxiosWrapper = async <T, K = Record<string, string>>(
  req: RequestType<K>
): Promise<T> => {
  const {
    body,
    defaultHeaders,
    headers,
    method,
    isAuth = false,
    url,
    baseURL,
  } = req;

  return new Promise<T>(async (resolve, reject) => {
    let finalHeaders = headers || {};

    if (defaultHeaders)
      finalHeaders = {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

    if (isAuth)
      finalHeaders["authToken"] =
        localStorage.getItem(LOCAL_STORAGE_KEYS.token) || "";

    const data: void | AxiosResponse<T, K> = await axios({
      method: method.toLowerCase(),
      headers: finalHeaders,
      data: body,
      url,
      baseURL,
    }).catch((err) => {
      reject(err.response);
    });

    if (data) resolve(data.data);
  });
};

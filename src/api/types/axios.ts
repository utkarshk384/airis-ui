export type ResponseType<T = any> = Promise<{
  status: string;
  data: T;
}>;

export type RequestType<T> = {
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  url: string;
  headers?: Record<string, string>;
  body?: T;
  defaultHeaders?: boolean;
  baseURL?: string;
  needsAuth?: boolean;
};

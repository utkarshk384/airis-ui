export const encodeBase64 = (str: unknown) => {
  let converted = "";
  if (typeof str !== "string") converted = JSON.stringify(str);
  else converted = str;
  return Buffer.from(converted).toString("base64");
};

export const decodeBase64 = (str: string) => {
  return Buffer.from(str, "base64").toString("utf-8");
};

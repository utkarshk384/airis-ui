import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import { DocumentUploadRequest, GetDocumentUploadRequest } from "../types";

export const UploadDocument = async (data: DocumentUploadRequest) => {
  const body = new FormData();
  const { file, ...rest } = data;

  const stringifyData = rest as Record<string, unknown>;
  stringifyData["documentName"] = file.name;

  body.append("document", file);
  body.append("docUploadInput", JSON.stringify(stringifyData));

  return await AxiosWrapper({
    method: "POST",
    body,
    url: ENDPOINTS.uploadPatientDocument,
    needsAuth: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const GetUploadedDocument = async (body: GetDocumentUploadRequest) => {
  return await AxiosWrapper({
    method: "POST",
    body,
    url: ENDPOINTS.getUploadedDocument,
    needsAuth: true,
    defaultHeaders: true,
  });
};

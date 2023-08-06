import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";

/* API */
import {
  UploadDocument as UploadDocumentHandler,
  GetUploadedDocument,
} from "../handlers/documentUpload";

/* Types */
import {
  DocumentUploadPayload,
  DocumentUploadResponse,
  GetDocumentUploadRequest,
} from "../types";

export const useDocumentUpload = () => {
  const ids = useGetId();

  const [getUploadBody, setGetUploadBody] = useState<GetDocumentUploadRequest>({
    id: "",
    patientId: "",
  });

  const UploadDocument = useMutation<
    DocumentUploadResponse,
    unknown,
    DocumentUploadPayload
  >((data) => UploadDocumentHandler({ ...data, ...ids }) as any);

  const getUploadDocument = useQuery<string, unknown>(
    ["get-document-upload", getUploadBody],
    () => GetUploadedDocument(getUploadBody) as any
  );

  return {
    UploadDocument,
    getUploadDocument,
    setGetUploadBody,
  };
};

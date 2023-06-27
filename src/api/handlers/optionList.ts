import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

/* Types */
import type { LookupType } from "../types";
import type { GetIdType } from "../types/getId";

export const OptionList = async (ids: GetIdType, lookupName: LookupType) => {
  const body = {
    ...ids,
    lookupName,
  };

  return await AxiosWrapper({
    method: "POST",
    url: ENDPOINTS.optionList,
    needsAuth: true,
    defaultHeaders: true,
    body,
  });
};

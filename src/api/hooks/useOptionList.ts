import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

/* Hooks */
import { useGetId } from "./useGetId";
import { useDropdown } from "@components";

/* API */
import { OptionList } from "../handlers/optionList";

/* Types */
import type { LookupType, OptionListResponse } from "../types/optionList";

export const useOptionList = (lookup: LookupType) => {
  const ids = useGetId();

  const [dropdown, setDropdown] = useDropdown();

  const getOptionList = useQuery<OptionListResponse, unknown>(
    ["option-list", lookup],
    {
      queryFn: () => OptionList(ids, lookup) as any,
    }
  );

  useEffect(() => {
    if (getOptionList.data) {
      setDropdown(getOptionList.data, ["displayText", "id"]);
    }
  }, [getOptionList.data, setDropdown]);

  return { getOptionList, dropdown };
};

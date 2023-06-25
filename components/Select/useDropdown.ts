import { DropdownOption } from "@components/sharedTypes";
import React, { useCallback, useEffect, useState } from "react";

type HandlerType = (
  data: Record<string, unknown>[],
  keys: [string, string]
) => void;

type DispatchAction = React.Dispatch<React.SetStateAction<DropdownOption[]>>;

type UseDropdownType = () => [DropdownOption[], HandlerType, DispatchAction];

export const useDropdown: UseDropdownType = () => {
  const [options, setOptions] = useState<DropdownOption[]>([]);

  const handler: HandlerType = useCallback((data, keys) => {
    const newData = data.map((item: any) => ({
      label: item[keys[0]],
      value: item[keys[1]],
    }));

    setOptions(newData);
  }, []);

  return [options, handler, setOptions];
};

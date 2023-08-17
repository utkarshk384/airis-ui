import { useEffect, useRef, useState } from "react";

/* Types */
import type { AllergyNotesItemType } from "../types";

export const useNewItem = <
  T extends Record<string, unknown> = AllergyNotesItemType
>(
  open: boolean,
  defaultValue: T[] = []
) => {
  const count = useRef<number>(1);

  const [items, setItems] = useState<T[]>(defaultValue);

  useEffect(() => {
    if (!open) setItems(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return { items, count, setItems };
};

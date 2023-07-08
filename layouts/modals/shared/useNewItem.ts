import { useEffect, useRef, useState } from "react";

/* Utils */
import { FormatDate } from "@utils/dates-fns";

/* Types */
import type { AllergyNotesItemType } from "../types";

type AddNewItemType = () => void;

export const useNewItem = (
  open: boolean,
  defaultValue: AllergyNotesItemType[] = []
) => {
  const count = useRef<number>(1);

  const [items, setItems] = useState<AllergyNotesItemType[]>(defaultValue);

  useEffect(() => {
    if (!open) setItems(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const addNewItem: AddNewItemType = () => {
    const newItems = [...items];

    const newItem: AllergyNotesItemType = {
      date: FormatDate(new Date()),
      title: `New Item ${count.current++}`,
      content: "",
    };

    newItems.unshift(newItem);
    setItems(newItems);
  };

  return { items, addNewItem, setItems };
};

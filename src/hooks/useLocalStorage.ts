import { useCallback } from "react";
import { getLocalStoragevalue, setLocalStoragevalue } from "@src/utils";

type SetValueInterface<T> = (key: string, value: T) => boolean;

type Values<T = unknown> = {
  key: string;
  value: T;
};
type setMultipleInterface<T> = (values: Values<T>[]) => void;

export const useLocalStorage = <T = string>() => {
  const getStorageValue = useCallback(getLocalStoragevalue, []);
  const setStorageValue = useCallback<SetValueInterface<T>>(
    setLocalStoragevalue,
    []
  );

  const setMultipleStorageValues = useCallback<setMultipleInterface<T>>(
    (values) => {
      values.forEach((value) => {
        setStorageValue(value.key, value.value);
      });
    },
    [setStorageValue]
  );

  return { getStorageValue, setStorageValue, setMultipleStorageValues };
};

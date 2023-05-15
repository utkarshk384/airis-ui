export const getLocalStoragevalue = (key: string) => {
  const value = localStorage.getItem(key);

  if (value) return JSON.parse(value);

  return null;
};

export const setLocalStoragevalue = <T = string>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Couldn't set local storage value");
    return false;
  }

  return true;
};

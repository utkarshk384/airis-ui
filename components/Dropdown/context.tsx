import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ContextType = {
  isDropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TabProviderProps = {
  children: React.ReactNode;
};

const DropdownContext = createContext<ContextType>({
  isDropdownOpen: false,
  setDropdownOpen: () => {},
});

export const DropdownContextProvider: React.FC<TabProviderProps> = (props) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isDropdownOpen, setDropdownOpen }}>
      {props.children}
    </DropdownContext.Provider>
  );
};

export const useDropdownOpen = () => useContext(DropdownContext);

import { createContext, useContext, useState } from "react";

type ContextType = {
  tab: number;
  setTab: (tab: number) => void;
};

type TabProviderProps = {
  children: React.ReactNode;
};

const TabContext = createContext<ContextType>({
  tab: 0,
  setTab: () => {},
});

export const TabProvider: React.FC<TabProviderProps> = (props) => {
  const [tab, setTab] = useState(0);
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {props.children}
    </TabContext.Provider>
  );
};

export const useTab = () => useContext(TabContext);

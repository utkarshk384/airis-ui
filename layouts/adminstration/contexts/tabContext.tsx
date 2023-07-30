import { createContext, useContext, useEffect, useMemo, useState } from "react";

/* Types */
import type { TitleTexts } from "../types";

type ContextType = {
  tab: number;
  setTab: (tab: number) => void;
  titleText: TitleTexts;
  headings: string[];
};

type TabProviderProps = {
  children: React.ReactNode;
};

const HEADINGS = [
  "Organization and Branch",
  "Users",
  "Roles and Privleges",
  "Business Partners",
  "System Properties",
  "Templates",
];

const TabContext = createContext<ContextType>({
  tab: 0,
  setTab: () => {},
  titleText: "Organization and Branch",
  headings: HEADINGS,
});

export const AdminTabProvider: React.FC<TabProviderProps> = (props) => {
  const [tab, setTab] = useState(0);
  const headings = useMemo(() => HEADINGS, []);

  const [titleText, setTitleText] = useState<TitleTexts>(
    "Organization and Branch"
  );

  useEffect(() => {
    setTitleText(headings[tab] as TitleTexts);
  }, [headings, tab]);

  return (
    <TabContext.Provider value={{ tab, setTab, titleText, headings }}>
      {props.children}
    </TabContext.Provider>
  );
};

export const useAdminstrationTab = () => useContext(TabContext);

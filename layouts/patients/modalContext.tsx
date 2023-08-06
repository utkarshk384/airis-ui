import { createContext, useContext, useReducer, useState } from "react";

type StateType = {
  isTNOpen: boolean;
  isAllergyOpen: boolean;
  patientId: string | number;
};

type ContextType = {
  isModelsOpen: StateType;
  setIsModelOpen: React.Dispatch<ActionInterface>;
};

type TabProviderProps = {
  children: React.ReactNode;
};

const initialValue = {
  isAllergyOpen: false,
  isTNOpen: false,
  patientId: "",
};

type ActionTypes = "OPEN_TN" | "OPEN_ALLERGY" | "CLOSE";

export interface ActionInterface {
  type: ActionTypes;
  payload: string | number;
}

const TabContext = createContext<ContextType>({
  isModelsOpen: initialValue,
  setIsModelOpen: () => {},
});

const reducer = (state: StateType, action: ActionInterface): StateType => {
  switch (action.type) {
    case "CLOSE":
      return { ...state, isAllergyOpen: false, isTNOpen: false };
    case "OPEN_ALLERGY":
      return {
        isAllergyOpen: true,
        isTNOpen: false,
        patientId: action.payload,
      };
    case "OPEN_TN":
      return {
        isAllergyOpen: false,
        isTNOpen: true,
        patientId: action.payload,
      };
    default:
      return state;
  }
};

export const TableModelProvider: React.FC<TabProviderProps> = (props) => {
  const [isModelsOpen, setIsModelOpen] = useReducer(reducer, initialValue);
  return (
    <TabContext.Provider value={{ isModelsOpen, setIsModelOpen }}>
      {props.children}
    </TabContext.Provider>
  );
};

export const useIsModalsOpen = () => useContext(TabContext);

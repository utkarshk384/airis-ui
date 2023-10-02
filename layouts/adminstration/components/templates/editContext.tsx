import { createContext, useContext, useRef, useState } from "react";

/* Types */
import type { TemplateType } from "@src/api/types";

type ContextType = {
  isEditTemplateOpen: boolean;
  setEditTemplateOpen: (val: boolean) => void;
  values: TemplateType;
  setValues: (val: TemplateType) => void;
};

type EditProviderProps = {
  children: React.ReactNode;
};

const EditTemplateCtx = createContext<ContextType>({
  isEditTemplateOpen: false,
  setEditTemplateOpen: () => {},
  values: {} as TemplateType,
  setValues: () => {},
});

export const EditTemplateProvider: React.FC<EditProviderProps> = (props) => {
  const [isEditTemplateOpen, setEditTemplateOpen] = useState(false);
  const [values, setValues] = useState<TemplateType>({} as TemplateType);

  return (
    <EditTemplateCtx.Provider
      value={{ isEditTemplateOpen, setEditTemplateOpen, values, setValues }}
    >
      {props.children}
    </EditTemplateCtx.Provider>
  );
};

export const useEditTemplate = () => useContext(EditTemplateCtx);

export const withEditTemplateProvider = (Component: React.FC) => {
  const Provider: React.FC = (props) => {
    return (
      <EditTemplateProvider>
        <Component {...props} />
      </EditTemplateProvider>
    );
  };

  return Provider;
};

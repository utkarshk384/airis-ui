import type { FontSizes } from "@components/types";
import type { PatientHistory } from "@src/api/types";

export type ListItemProps = {
  title: string;
  value: string;
  color?: "white" | "black";
  headingSize?: FontSizes;
  children?: React.ReactNode;
};

export type HeaderProps = {
  data: {
    name: string;
    id: string;
    gender: string;
    age: string; // Format: "YY/MM"
  };
  children?: React.ReactNode;
};

export type TabProps = {
  date: string;
  index: number;
  status: PatientHistory["reportStatusText"];
  modality: string | null;
};

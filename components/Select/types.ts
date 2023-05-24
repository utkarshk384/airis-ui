import SelectComponent from "react-select";

/* Types */
import { DropdownOption } from "@components/types";
type SelectProps = React.ComponentProps<typeof SelectComponent>;

export type SelectSharedProps = {
  children?: React.ReactNode;
  placeholder?: string;
  width?: string;
  label?: string;
  name: string;
  containerClassName?: string;
  menuPlacement?: SelectProps["menuPlacement"];
  maxMenuHeight?: SelectProps["maxMenuHeight"];
  options: DropdownOption[];
};

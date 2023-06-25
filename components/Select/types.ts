/* Types */
import { DropdownOption } from "@components/types";

export type SelectSharedProps = {
  placeholder?: string;
  isSearchable?: boolean;
  label?: string;
  name: string;
  width?: string | number;
  containerClassName?: string;
  labelClassName?: string;
  menuPlacement?: "top" | "bottom" | "center";
  maxMenuHeight?: number | string;
  options: DropdownOption[];
  createOptions?: boolean;
};

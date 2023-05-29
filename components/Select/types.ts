/* Types */
import { DropdownOption } from "@components/types";

export type SelectSharedProps = {
  placeholder?: string;
  label?: string;
  name: string;
  isSearchable?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  menuPlacement?: "top" | "bottom";
  maxMenuHeight?: number | string;
  options: DropdownOption[];
};

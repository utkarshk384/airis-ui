/* Types */
import { DropdownOption } from "@components/types";

export type SelectSharedProps = {
  placeholder?: string;
  label?: string;
  name: string;
  containerClassName?: string;
  labelClassName?: string;
  menuPlacement?: "top" | "bottom";
  maxMenuHeight?: number | string;
  options: DropdownOption[];
};

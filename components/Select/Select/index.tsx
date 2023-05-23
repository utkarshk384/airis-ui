import React from "react";
import SelectComponent from "react-select";

/* Components */
import { ComponentCSS } from "../styled";

/* Types */
import type { ActionMeta } from "react-select";
import type { DropdownOption } from "@components/sharedTypes";

type SelectProps = React.ComponentProps<typeof SelectComponent>;

type Props = {
  children?: React.ReactNode;
  placeholder?: string;
  width?: string;
  containerClassName?: string;
  onChange?: (
    value: DropdownOption,
    action: ActionMeta<DropdownOption>
  ) => void;
  defaultValue?: SelectProps["defaultValue"];
  menuPlacement?: SelectProps["menuPlacement"];
  maxMenuHeight?: SelectProps["maxMenuHeight"];
  options: DropdownOption[];
};

export const Select: React.FC<Props> = (props) => {
  const { containerClassName, width, ...rest } = DefaultProps(props);

  if (!rest.options) throw new Error("Options is required");

  return (
    <SelectComponent
      {...rest}
      onChange={(value, action) => {
        rest?.onChange?.(
          value as DropdownOption,
          action as ActionMeta<DropdownOption>
        );
      }}
      className={`${ComponentCSS({ css: { width } })} ${containerClassName}`}
      classNamePrefix="react-select"
      unstyled
      styles={{
        indicatorsContainer(_, props) {
          return {
            color: props.hasValue ? "black" : "var(--grey-color)",
          };
        },
      }}
    />
  );
};

const DefaultProps = (props: Props) => {
  const defaultProps = {
    ...props,
    placeholder: props.placeholder || "",
    width: props.width || "100%",
    containerClassName: props.containerClassName || "",
    menuPlacement: props.menuPlacement || "auto",
  };

  return defaultProps;
};

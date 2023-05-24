import React from "react";
import SelectComponent from "react-select";

/* Components */
import { ComponentCSS } from "../styled";

/* Types */
import type { ActionMeta } from "react-select";
import type { DropdownOption } from "@components/sharedTypes";
import type { SelectSharedProps } from "../types";
import { Label } from "@components/shared";

type SelectProps = React.ComponentProps<typeof SelectComponent>;

type Props = {
  onChange?: (
    value: DropdownOption,
    action: ActionMeta<DropdownOption>
  ) => void;
  defaultValue?: SelectProps["defaultValue"];
} & SelectSharedProps;

export const Select: React.FC<Props> = (props) => {
  const { containerClassName, width, label, ...rest } = DefaultProps(props);

  if (!rest.options) throw new Error("Options is required");

  return (
    <fieldset
      className={`fieldset-grid ${
        label ? "fieldset-label" : "fieldset-no-label"
      }`}
    >
      {label && <Label htmlFor={rest.name} label={label} />}
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
    </fieldset>
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

import React, { useMemo } from "react";
import SelectComponent from "react-select";

/* Components */
import { ComponentCSS } from "../styled";
import { Label } from "@components/shared";

/* Types */
import type { ActionMeta, MultiValue } from "react-select";
import type { DropdownOption } from "@components/sharedTypes";

type SelectProps = React.ComponentProps<typeof SelectComponent>;

type Props = {
  children?: React.ReactNode;
  placeholder?: string;
  width?: string;
  label?: string;
  name: string;
  containerClassName?: string;
  onChange?: (
    value: MultiValue<DropdownOption>,
    action: ActionMeta<DropdownOption>
  ) => void;
  defaultValue?: DropdownOption[];
  menuPlacement?: SelectProps["menuPlacement"];
  maxMenuHeight?: SelectProps["maxMenuHeight"];
  options: DropdownOption[];
};

export const MultiSelect: React.FC<Props> = (props) => {
  const { containerClassName, label, width, ...rest } = DefaultProps(props);

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
            value as MultiValue<DropdownOption>,
            action as ActionMeta<DropdownOption>
          );
        }}
        className={`${ComponentCSS({ css: { width } })} ${containerClassName}`}
        classNamePrefix="react-select"
        unstyled
        isMulti
        closeMenuOnSelect={false}
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

import React, { useCallback, useState } from "react";
import SelectComponent from "react-select";

/* Components */
import { ComponentCSS } from "./styled";
import { Label } from "@components/shared";

/* Types */
import type { ActionMeta } from "react-select";
import type { DropdownOption } from "@components/sharedTypes";
import type { SelectSharedProps } from "./types";

type SelectProps = React.ComponentProps<typeof SelectComponent>;

type Props = {
  onChange?: (
    value: DropdownOption<any>,
    action: ActionMeta<DropdownOption>
  ) => void;
  defaultValue?: DropdownOption<any>;
  labelClassName?: string;
} & SelectSharedProps;

export const SearhableDropdown: React.FC<Props> = (props) => {
  const { containerClassName, width, label, labelClassName, ...rest } =
    DefaultProps(props);

  const [value, setValue] = useState<DropdownOption<any>>(
    rest.defaultValue || { label: "", value: "" }
  );

  const handleChange = useCallback((value: DropdownOption<any>) => {
    setValue(value);
  }, []);

  if (!rest.options) throw new Error("Options is required");

  return (
    <fieldset
      className={`fieldset-grid ${
        label ? "fieldset-label" : "fieldset-no-label"
      }`}
    >
      {label && (
        <Label
          htmlFor={rest.name}
          label={label}
          labelClassName={labelClassName}
        />
      )}
      <SelectComponent
        {...rest}
        value={value}
        onChange={(_value, action) => {
          const val = _value as DropdownOption<any>;
          rest?.onChange?.(val, action as ActionMeta<DropdownOption>);
          handleChange(val.value);
        }}
        components={{
          Input: (props) => (
            <input
              {...props}
              autoComplete="off"
              {...props}
              value={value.label}
              onChange={(e) => handleChange(e.target.value)}
            />
          ),
          ValueContainer: (props) => <></>,
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
    labelClassName: props.labelClassName || "",
    placeholder: props.placeholder || "",
    width: props.width || "100%",
    containerClassName: props.containerClassName || "",
    menuPlacement: props.menuPlacement || "auto",
  };

  return defaultProps;
};

import React, { useEffect, useState } from "react";

/* Styled */
import { StyledSwitch, StyledThumb } from "./styled";

/* Components */
import { Label } from "@components/shared";

type Props = {
  children?: React.ReactNode;
  disabled?: boolean;
  name: string;
  defaultChecked?: boolean;
  label?: string;
  onChange: (checked: boolean) => void;
  wrapperClassName?: string;
};

export const Switch: React.FC<Props> = (props) => {
  const { name, disabled, label, onChange, wrapperClassName, defaultChecked } =
    DefaultProps(props);

  return (
    <fieldset
      className={`fieldset-grid ${
        label ? "fieldset-label" : "fieldset-no-label"
      } ${wrapperClassName}`}
    >
      <Label label={label} htmlFor={name} />
      <StyledSwitch
        className="bg-gray-200"
        name={name}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
        disabled={disabled}
      >
        <StyledThumb />
      </StyledSwitch>
    </fieldset>
  );
};

const DefaultProps = (props: Props): Props => {
  return {
    ...props,
    defaultChecked: props.defaultChecked || false,
    disabled: props.disabled || false,
    wrapperClassName: props.wrapperClassName || "",
  };
};

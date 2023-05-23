import { useField } from "formik";
import React, { ChangeEventHandler, useMemo } from "react";

/* Components */
import { Label } from "@components/shared";
import { Text } from "@components/Typography";

/* Styled */
import { StyledInput } from "./styled";

type Props = {
  children?: React.ReactNode;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  variant?: "underlined" | "filled";
  errorBeforeTouch?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

type RawInputProps = {
  value: string | number;
} & Props;

export const Input: React.FC<Props> = (props) => {
  const {
    label,
    variant,
    errorBeforeTouch = false,
    wrapperClassName,
    ...rest
  } = DefaultProps(props);

  const [field, meta] = useField(rest);
  const error = useMemo(() => meta.error || "", [meta.error]);

  return (
    <fieldset
      className={`fieldset-grid ${
        label ? "fieldset-label" : "fieldset-no-label"
      } ${wrapperClassName}`}
    >
      <Label label={label} htmlFor={field.name} />
      <div className="flex flex-col gap-2">
        <StyledInput variant={variant} {...field} {...rest} />

        <Text className="!text-red-500">
          {errorBeforeTouch ? error : meta.touched && error}
        </Text>
      </div>
    </fieldset>
  );
};

export const RawInput: React.FC<RawInputProps> = (props) => {
  const { label, variant, ...rest } = DefaultProps(props);

  return (
    <fieldset className="flex gap-2">
      {label && (
        <label htmlFor={rest.name}>
          <Text>{label}</Text>
        </label>
      )}
      <div className="flex flex-col gap-2 w-full">
        <StyledInput variant={variant} {...rest} />
      </div>
    </fieldset>
  );
};

const DefaultProps = (props: Props) => {
  const defaultProps: Props = {
    ...props,
    wrapperClassName: props.wrapperClassName || "",
    className: props.className || "",
    type: props.type || "text",
  };

  return defaultProps;
};

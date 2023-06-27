import { useField } from "formik";
import React, { ChangeEventHandler, useMemo, useState } from "react";

/* Components */
import { Label } from "@components/shared";
import { Text } from "@components/Typography";

/* Styled */
import { StyledInput } from "./styled";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

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
  const [type, setType] = useState(rest.type);
  const error = useMemo(() => meta.error || "", [meta.error]);
  return (
    <fieldset
      className={`fieldset-grid ${
        label ? "fieldset-label" : "fieldset-no-label"
      } ${wrapperClassName}`}
    >
      <Label label={label} htmlFor={field.name} />
      <div className="flex flex-col gap-2">
        <span className="relative">
          <StyledInput variant={variant} {...field} {...rest} type={type} />
          {rest.type === "password" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setType((prev) => (prev === "password" ? "text" : "password"));
              }}
            >
              {type === "password" ? (
                <EyeIcon className="w-4 h-4 absolute my-auto inset-0 left-auto" />
              ) : (
                <EyeSlashIcon className="w-4 h-4 absolute my-auto inset-0 left-auto" />
              )}
            </button>
          )}
        </span>

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

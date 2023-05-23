import React, { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

/* Components */
import { StyledContainer } from "./styled";

/* Types */
import type { RadioItemFlow, RadioItemType } from "./types";
import { RadioButton } from "./components";
import { Label } from "@components/shared";

type Props = {
  name: string;
  label: string;
  items: RadioItemType[];
  variant: "button" | "circle";
  orientation?: RadioItemFlow;
  onChange?: (value: string) => void;
  defaultChecked?: string;
  disabled?: boolean;
};

type Event = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export const RadioGroup: React.FC<Props> = (props) => {
  const { fieldProps, mainProps } = DefaultProps(props);

  /* States */
  const [checked, setChecked] = useState(mainProps.defaultChecked || "");

  /* Memos */
  const uniqueId = useMemo(() => uuid(), []);

  /* Handlers */
  const handleClick = (e: Event) => {
    const value = e.currentTarget.dataset.value as string;
    setChecked(value);
    mainProps.onChange?.(value);
  };

  return (
    <div
      className={`fieldset-grid ${
        mainProps.label ? "fieldset-label" : "fieldset-no-label"
      }`}
    >
      {mainProps.label && <Label label={mainProps.label} />}
      <StyledContainer itemFlow={mainProps.orientation}>
        {mainProps.variant === "button" &&
          mainProps.items.map((item, i) => (
            <RadioButton
              key={uniqueId + i}
              item={item}
              checked={checked}
              handleClick={handleClick}
              {...fieldProps}
            />
          ))}
      </StyledContainer>
    </div>
  );
};

const DefaultProps = (props: Props) => {
  const newItems = props.items.map((item) => {
    if (!item.id) item.id = uuid();
    return item;
  });

  const defaultProps = {
    mainProps: {
      defaultChecked: props.defaultChecked || "",
      items: newItems,
      orientation: props.orientation || "horizontal",
      label: props.label,
      variant: props.variant || "button",
      onChange: props.onChange,
    },
    fieldProps: {
      disabled: props.disabled || false,
      name: props.name,
    },
  };

  return defaultProps as Required<typeof defaultProps>;
};

import React from "react";

/* Components */
import { Button } from "@components/Button";

/* Types */
import type { RadioItemType } from "../types";

type Props = {
  name: string;
  disabled: boolean;
  checked: string;
  item: RadioItemType;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const RadioButton: React.FC<Props> = (props) => {
  const { item, name, checked, disabled, handleClick } = props;
  return (
    <div className="relative">
      <input
        type="radio"
        value={item.value}
        id={item.id}
        name={name}
        disabled={disabled}
        checked={checked === item.value}
        className="absolute invisible"
      />
      <label htmlFor={item.id}>
        <Button
          data-value={item.value}
          onClick={handleClick}
          variant={checked === item.value ? "solid" : "outline"}
        >
          {item.label}
        </Button>
      </label>
    </div>
  );
};

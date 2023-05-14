import { Button } from "./button";
import { Dropdown } from "@components/Dropdown";

import type { Props } from "./types";
import type { DropdownMenuType } from "@components/Dropdown";

type DropdownProps = React.ComponentProps<typeof Dropdown>;

type DropdownBtnProps = Props & {
  DropdownContent: DropdownMenuType;
  dropdownContentProps?: DropdownProps["dropdownContentProps"];
};

export const DropdownButton: React.FC<DropdownBtnProps> = (props) => {
  const { DropdownContent, dropdownContentProps, ...rest } =
    DefaultProps(props);

  return (
    <Dropdown
      dropdownContentProps={dropdownContentProps}
      TriggerComponent={() => <Button {...rest} as="a" />}
    >
      {DropdownContent}
    </Dropdown>
  );
};

const DefaultProps = (props: DropdownBtnProps) => {
  const defaultProps: DropdownBtnProps = {
    ...props,
    iconButton: props.iconButton || false,
    color: props.color || "accent",
    size: props.size || "base",
    variant: props.variant || "solid",
    as: props.as || "button",
    noPadding: props.noPadding || false,
  };

  return defaultProps;
};

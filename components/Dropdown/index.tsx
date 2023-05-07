import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

/* Styled */
import {
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
  DropdownItem,
  DropdownItemGroup,
} from "./styled";

export type DropdownMenuType = (Dropdown: typeof Menu) => React.ReactNode;

type SharedProps = {
  children: DropdownMenuType;
};

type Props = {
  TriggerComponent: React.FC;
  portal?: boolean;
} & SharedProps;

export const Dropdown: React.FC<Props> = (props) => {
  const { portal, children, TriggerComponent } = props;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="focus-visible:outline-none">
        <TriggerComponent />
      </DropdownMenu.Trigger>
      {portal ? (
        <DropdownMenu.Portal>
          <ContentWrapper>{children}</ContentWrapper>
        </DropdownMenu.Portal>
      ) : (
        <ContentWrapper>{children}</ContentWrapper>
      )}
    </DropdownMenu.Root>
  );
};

const ContentWrapper: React.FC<SharedProps> = (props) => {
  const { children } = props;

  return (
    <DropdownContent avoidCollisions sideOffset={5}>
      {children instanceof Function ? children(Menu) : children}
    </DropdownContent>
  );
};

const Menu = () => {
  return <></>;
};

Menu.Item = DropdownItem;
Menu.Group = DropdownItemGroup;
Menu.Label = DropdownLabel;
Menu.Separator = DropdownSeparator;

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

/* Components */
import { Checkbox } from "@components/Checkbox";
import {
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
  DropdownItem,
  CheckboxItem as StyledCheckboxItem,
  DropdownItemGroup,
} from "./styled";
import { DropdownContextProvider, useDropdownOpen } from "./context";

/* Types */

export type MenuType = typeof Menu;
export type DropdownMenuType = (Dropdown: MenuType) => React.ReactNode;

type DropdownContentType = React.ComponentProps<typeof DropdownContent>;

type SharedProps = {
  children: DropdownMenuType;
  dropdownContentProps?: DropdownContentType;
  contentMaxHeight?: string | number;
};

type TriggerComponentProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

type Props = {
  TriggerComponent: React.FC<TriggerComponentProps>;
  portal?: boolean;
} & SharedProps;

type CheckboxItemProps = {
  children: React.ReactNode;
} & React.RefAttributes<HTMLInputElement>;

const CustomDropdown: React.FC<Props> = (props) => {
  const {
    portal,
    children,
    TriggerComponent,
    contentMaxHeight,
    dropdownContentProps = {},
  } = props;

  const { isDropdownOpen, setDropdownOpen } = useDropdownOpen();

  return (
    <DropdownMenu.Root modal={false} open={isDropdownOpen}>
      <DropdownMenu.Trigger className="focus-visible:outline-none">
        <TriggerComponent open={isDropdownOpen} setOpen={setDropdownOpen} />
      </DropdownMenu.Trigger>
      {portal ? (
        <DropdownMenu.Portal>
          <ContentWrapper dropdownContentProps={dropdownContentProps}>
            {children}
          </ContentWrapper>
        </DropdownMenu.Portal>
      ) : (
        <ContentWrapper
          contentMaxHeight={contentMaxHeight}
          dropdownContentProps={dropdownContentProps}
        >
          {children}
        </ContentWrapper>
      )}
    </DropdownMenu.Root>
  );
};

const ContentWrapper: React.FC<SharedProps> = (props) => {
  const { children, dropdownContentProps, contentMaxHeight } = props;

  return (
    <DropdownContent
      css={{
        maxHeight: contentMaxHeight || "auto",
        overflowY: contentMaxHeight ? "scroll" : "initial",
      }}
      avoidCollisions
      sideOffset={5}
      {...dropdownContentProps}
    >
      {children instanceof Function ? children(Menu) : children}
    </DropdownContent>
  );
};

const Menu = () => {
  return <></>;
};

export const CheckboxItem: React.FC<CheckboxItemProps> = (props) => {
  return (
    <StyledCheckboxItem>
      <Checkbox wrapperClassName="px-2 py-3" variant="borderless" {...props} />
    </StyledCheckboxItem>
  );
};

CheckboxItem.displayName = "CheckboxItem";

Menu.Item = DropdownItem;
Menu.Group = DropdownItemGroup;
Menu.Label = DropdownLabel;
Menu.Separator = DropdownSeparator;
Menu.CheckboxItem = CheckboxItem;
Menu.Context = useDropdownOpen;

const withDropdownContext = (Component: React.FC<Props>) => {
  return function withDropdown(props: Props) {
    return (
      <DropdownContextProvider>
        <Component {...props} />
      </DropdownContextProvider>
    );
  };
};

export const Dropdown = withDropdownContext(CustomDropdown);

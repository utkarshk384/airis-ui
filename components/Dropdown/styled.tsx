import { styled } from "@/styles/stitches";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const DropdownContent = styled(DropdownMenu.Content, {
  minWidth: "12.5rem",
  zIndex: 100,
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  height: "fit-content",
  boxShadow: "$dropdown",
  border: "1px solid $grey",
  "--content-padding": "1rem",
});

export const DropdownLabel = styled(DropdownMenu.Label, {
  fontSize: "$base",
  fontWeight: "$400",
  color: "#475569",
  marginLeft: "-0.5rem",
  padding: "0rem var(--content-padding)",
});

export const DropdownSeparator = styled(DropdownMenu.Separator, {
  height: "2px",
  backgroundColor: "#E2E8F0",
  margin: "0.5rem var(--content-padding)",
  borderRadius: "9999px",
});

const MenuItemStyles = {
  fontSize: "$base",
  fontWeight: "$400",
  transition: "background-color 0.25s ease-in-out, color 0.25s ease-in-out",
  color: "$black",
  border: "none",
  padding: "0.65rem var(--content-padding)",
  cursor: "pointer",
  userSelect: "none",
  "&:hover": {
    background: "rgb(0 0 0 / 10%)",
    outline: "none",
  },
};

export const DropdownItem = styled(DropdownMenu.Item, MenuItemStyles);
export const CheckboxItem = styled("div", {
  ...MenuItemStyles,
  padding: 0,
  borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
});

export const DropdownItemGroup = styled(DropdownMenu.Group, {
  paddingBlock: "0.75rem",
});

export const ItemIndicator = styled(DropdownMenu.ItemIndicator, {});

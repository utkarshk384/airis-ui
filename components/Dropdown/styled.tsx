import { styled } from "@/styles/stitches";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const DropdownContent = styled(DropdownMenu.Content, {
  minWidth: "12.5rem",
  zIndex: 100,
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  height: "fit-content",
  boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  paddingBlock: "1.25rem",
  "--content-padding": "1rem",
});

export const DropdownLabel = styled(DropdownMenu.Label, {
  fontSize: "$base",
  fontWeight: "$400",
  color: "#475569",
  padding: "0rem var(--content-padding)",
});

export const DropdownSeparator = styled(DropdownMenu.Separator, {
  height: "2px",
  backgroundColor: "#E2E8F0",
  margin: "0.5rem var(--content-padding)",
  borderRadius: "9999px",
});

const MenuItemStyles = {
  fontSize: "$sm",
  fontWeight: "$400",
  transition: "background-color 0.25s ease-in-out, color 0.25s ease-in-out",
  color: "$black",
  border: "none",
  padding: "0.65rem var(--content-padding)",
  borderRadius: "4px",
  cursor: "pointer",
  userSelect: "none",
  "&:hover": {
    backgroundColor: "rgba($rgbAccent, 0.25)",
    outline: "none",
  },
};

export const DropdownItem = styled(DropdownMenu.Item, MenuItemStyles);
export const CheckboxItem = styled("div", {
  ...MenuItemStyles,
  padding: 0,
});

export const DropdownItemGroup = styled(DropdownMenu.Group, {
  paddingBlock: "0.75rem",
});

export const ItemIndicator = styled(DropdownMenu.ItemIndicator, {});

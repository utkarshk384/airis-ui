export type DrawerSizes = keyof typeof DRAWER_SIZES;

export const DRAWER_SIZES = {
  large: {
    width: "60vw",
    "--drawer-width": "60vw",
  },
  small: {
    width: "40vw",
    "--drawer-width": "40vw",
  },
};

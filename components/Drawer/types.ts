import { DrawerSizes } from "./consts";

export type DrawerHeaderProps = {
  title: string;
  className?: string;
};

export type DrawerFooterProps = {
  children?: React.ReactNode;
  className?: string;
};

export type * from "./consts";

export type SharedDrawerProps = {
  open: boolean;
  size?: DrawerSizes;
  children: (DrawerItem: DrawerItemType) => React.ReactNode;
};

export type DrawerItemType = React.FC & {
  Header: React.FC<DrawerHeaderProps>;
  Footer: React.FC<DrawerFooterProps>;
};

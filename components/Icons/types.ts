export type BaseIconProps = {
  children?: React.ReactNode;
} & React.SVGProps<SVGSVGElement>;

export type IconWithBgProps = {
  bgColor?: string;
  iconFill?: string;
} & BaseIconProps;

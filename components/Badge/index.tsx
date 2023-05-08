import React from "react";

/* Components */
import { StyledBadge } from "./styled";

/* Types */
import type { BadgeColors, BadgeSize } from "./types";

type BaseProps = {
  color?: BadgeColors;
  size?: BadgeSize;
  as?: "span" | "div" | "p";
} & Omit<React.HTMLAttributes<HTMLElement>, "color">;

type Props = (
  | {
      text: string;
      children?: never;
    }
  | {
      children: React.ReactNode;
      text?: never;
    }
) &
  BaseProps;

export const Badge: React.FC<Props> = (props) => {
  const { children, text, ...rest } = DefaultProps(props);

  return <StyledBadge {...rest}>{text || children}</StyledBadge>;
};

const DefaultProps = (props: Props) => {
  const defaultProps: Props = {
    ...props,
    color: props.color || "green",
    size: props.size || "base",
    as: props.as || "span",
  };

  return defaultProps;
};

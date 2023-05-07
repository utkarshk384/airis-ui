import React from "react";
import Image from "next/image";

/* Types */
import type { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src">;

export const Logo: React.FC<Props> = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image src="/images/logo.png" {...props} />
  );
};

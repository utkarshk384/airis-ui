import React from "react";

/* Types */
import type { IconWithBgProps, BaseIconProps as BaseProps } from "./types";

export const UserIcon: React.FC<IconWithBgProps> = (props) => {
  const { bgColor, iconFill, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      fill="none"
      {...rest}
    >
      <circle cx={24} cy={24} r={24} fill={bgColor || "#6B7280"} />
      <path
        fill={iconFill || "#fff"}
        d="M24.458 8.136c-4.258 0-7.72 3.323-7.72 7.41 0 4.01 3.267 7.255 7.525 7.395.13-.016.26-.016.357 0h.114c4.16-.14 7.427-3.386 7.443-7.395 0-4.087-3.462-7.41-7.72-7.41ZM32.713 27.09c-4.534-2.901-11.928-2.901-16.495 0-2.063 1.327-3.201 3.12-3.201 5.04 0 1.919 1.138 3.697 3.185 5.008 2.275 1.466 5.265 2.2 8.256 2.2 2.99 0 5.98-.734 8.255-2.2 2.048-1.326 3.185-3.105 3.185-5.04-.016-1.918-1.137-3.697-3.185-5.007Z"
      />
    </svg>
  );
};

export const KeyIcon: React.FC<BaseProps> = (props) => {
  const { fill, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      {...rest}
      fill="none"
    >
      <path
        fill={fill || "#17234D"}
        fillRule="evenodd"
        d="M6 4.999a5 5 0 1 1 3.61 4.804l-1.903 1.903a1 1 0 0 1-.707.293H6v1a1 1 0 0 1-1 1H4v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707l5.903-5.903A5.002 5.002 0 0 1 6 4.999Zm5-3a.75.75 0 1 0 0 1.5 1.5 1.5 0 0 1 1.5 1.5.75.75 0 1 0 1.5 0 3 3 0 0 0-3-3Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const LogoutIcon: React.FC<BaseProps> = (props) => {
  const { stroke, ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={18}
      {...rest}
      fill="none"
    >
      <path
        stroke={stroke || "#17234D"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 13 4-4m0 0-4-4m4 4H5m6 4v1a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
      />
    </svg>
  );
};

export const AllergyIcon: React.FC<BaseProps> = (props) => {
  const { fill, ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={20}
      {...rest}
      fill="none"
    >
      <path
        fill={fill || "#9CA3AF"}
        d="M17.08 3.33a1.25 1.25 0 0 0-1.25 1.25v4.59H15V2.08a1.25 1.25 0 0 0-2.5 0v7.09h-.84V1.25a1.25 1.25 0 0 0-2.5 0v7.92h-.83V3.33a1.25 1.25 0 0 0-2.5 0v9.93l-3.59-2a1 1 0 0 0-.5-.14 1 1 0 0 0-.66.25l-1.08 1L6.54 19a3.29 3.29 0 0 0 2.37 1H15a3.33 3.33 0 0 0 3.33-3.33V4.58a1.25 1.25 0 0 0-1.25-1.25ZM8.33 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-1 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-2-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
      />
    </svg>
  );
};

export const WritingIcon: React.FC<BaseProps> = (props) => {
  const { fill, ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={19}
      {...rest}
      fill="none"
    >
      <path
        fill={fill || "#9CA3AF"}
        d="M18 7V6l-6-6H2C.89 0 0 .89 0 2v14a2 2 0 0 0 2 2h6v-1.87l8.39-8.39c.44-.44 1-.68 1.61-.74Zm-7-5.5L16.5 7H11V1.5Zm8.85 9.69-.98.98-2.04-2.04.98-.98c.19-.2.52-.2.72 0l1.32 1.32c.2.2.2.53 0 .72Zm-3.72-.36 2.04 2.04L12.04 19H10v-2.04l6.13-6.13Z"
      />
    </svg>
  );
};

export const UploadIcon: React.FC<BaseProps> = (props) => {
  const { stroke, ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      {...rest}
    >
      <path
        stroke={stroke || "#9CA3AF"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1 13v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8L9 1m0 0L5 5m4-4v12"
      />
    </svg>
  );
};

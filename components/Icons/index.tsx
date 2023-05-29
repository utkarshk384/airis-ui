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

export const GenderMaleIcon: React.FC<BaseProps> = (props) => {
  const { stroke, ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...rest}
    >
      <rect
        width={6.704}
        height={2.833}
        x={14.469}
        y={1}
        fill="#60A5FA"
        rx={1.416}
      />
      <rect
        width={7.613}
        height={2.494}
        fill="#60A5FA"
        rx={1.247}
        transform="rotate(-89.546 13.68 -5.107) skewX(-.132)"
      />
      <path
        fill="#60A5FA"
        d="M15.605 14.52c0 4.268-3.045 7.727-6.802 7.727C5.046 22.247 2 18.787 2 14.52c0-4.267 3.046-7.726 6.803-7.726s6.802 3.459 6.802 7.726Zm-11.035 0c0 2.655 1.895 4.808 4.233 4.808 2.337 0 4.232-2.152 4.232-4.807 0-2.655-1.895-4.807-4.232-4.807-2.338 0-4.233 2.152-4.233 4.807Z"
      />
      <path
        fill="#60A5FA"
        d="m12.146 8.924 6.116-6.52L19.97 4.47l-6.116 6.52z"
      />
    </svg>
  );
};

export const GenderFemaleIcon: React.FC<BaseProps> = (props) => {
  const { stroke, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...rest}
    >
      <path
        fill="#9F0CC4"
        d="M19.03 8.346c0-4.032-3.351-7.296-7.416-7.144-3.69.154-6.7 3.13-6.87 6.821-.17 3.623 2.381 6.684 5.782 7.346v2.183H7.568a.682.682 0 0 0-.681.68v1.362c0 .375.306.68.68.68h2.96v2.41c0 .375.305.68.68.68h1.361c.375 0 .68-.305.68-.68v-2.41h2.96c.375 0 .68-.305.68-.68v-1.361a.682.682 0 0 0-.68-.681h-2.961v-2.2a7.12 7.12 0 0 0 5.782-7.006ZM7.55 8.269c.036-3.004 2.395-4.249 4.337-4.21 2.395.05 4.33 1.739 4.287 4.287-.041 2.364-1.922 4.286-4.287 4.286-2.364 0-4.368-1.71-4.336-4.363Z"
      />
      <path
        fill="#C71FFF"
        d="M19.031 7.733c0-4.032-3.35-7.296-7.415-7.144-3.69.154-6.702 3.131-6.87 6.821-.171 3.623 2.379 6.31 5.782 6.973v2.558H7.57a.682.682 0 0 0-.68.68v1.174c0 .375.32.59.694.59h2.958l-.013 2.5c0 .375.306.68.68.68h1.362c.375 0 .68-.305.68-.68l.014-2.5h2.959c.375 0 .667-.217.667-.59v-1.174a.682.682 0 0 0-.68-.68h-2.961v-2.577c3.3-.628 5.782-3.144 5.782-6.631Zm-11.48-.077c-.002-2.796 1.875-4.482 4.316-4.482 2.762 0 4.376 2.17 4.325 4.682-.044 2.365-1.94 4.163-4.305 4.163-2.364 0-4.334-1.71-4.336-4.363Z"
      />
      <path
        fill="#fff"
        d="M6.936 3.439c.755-.919 2.14-1.943 3.667-2.12.377-.05.752-.048 1.069.087.234.098.426.345.277.593-.112.199-.588.322-.811.38-.786.16-1.435.359-1.958.657-.696.397-1.374 1.142-1.686 1.635-.592.935-.967 1.618-1.39 1.27-.413-.31.06-1.565.832-2.502Zm2.133 13.963c0-.139-.084-.186-.586-.154-.419.015-.906.077-1.032.233-.125.17-.153.51-.167.91 0 .295 0 .558.14.558.194 0 .194-.478.335-.74.28-.498 1.31-.622 1.31-.807Zm1.926 3.082c-.154 0-.204.087-.17.61.016.435.05.797.22.928.188.131.597.152 1.038.167.322 0 .472.007.472-.137 0-.203-.283-.049-.793-.458-.508-.407-.58-1.11-.767-1.11Z"
        opacity={0.3}
      />
    </svg>
  );
};

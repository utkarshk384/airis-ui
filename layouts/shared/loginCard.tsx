import React, { useCallback } from "react";
import Image from "next/image";

/* Styled */
import { CardContainer, Banner } from "./styled";

/* Components */
import { Text } from "@components";

type Props = {
  children?: React.ReactNode;
  Component: React.FC;
  titleText: string;
  className?: string;
  subTitleText?: string;
};

export const LoginLayoutCard: React.FC<Props> = (props) => {
  const { Component, titleText, subTitleText, className = "" } = props;

  return (
    <CardContainer className={className}>
      <div className="flex p-8 items-center justify-center w-full bg-accent">
        <Image
          src="/images/login-card.png"
          width={351}
          height={227}
          alt="A man using a large machine"
        />
      </div>
      <div className="flex flex-col gap-6 py-4 pr-4 bg-white">
        <Banner>
          <Text size="lg" weight="700" color="white">
            {titleText}
          </Text>
        </Banner>
        <div className="flex flex-col items-center justify-center h-5/6 gap-4">
          <Text size="base" weight="500">
            {subTitleText}
          </Text>
          <Component />
        </div>
      </div>
    </CardContainer>
  );
};

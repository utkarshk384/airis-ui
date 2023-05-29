import React, { useCallback, useState } from "react";

/* Components */
import { Text } from "@components";

/* Contexts */
import { useTab } from "../context/tabs";

/* Types */
import { TabProps } from "../types";
import { StyledIndicator } from "./styled";

type Props = {
  children?: React.ReactNode;
};

export const Tabbar: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <div className="w-full overflow-x-scroll custom-scroll-bar flex">
      {new Array(15).fill(0).map((_, i) => (
        <Tab
          index={i}
          date="20/11/2023"
          modality="CT Scan"
          status="active"
          key={i}
        />
      ))}
    </div>
  );
};

const Tab: React.FC<TabProps> = (props) => {
  const { index } = props;

  const { tab, setTab } = useTab();

  const handleClick = useCallback(() => {
    setTab(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col px-4 transition-colors duration-200 ease-in-out ${
        tab === index ? "bg-accent rounded-lg" : "bg-transparent"
      }`}
    >
      <div className="flex gap-2 items-center">
        <Text size="sm" color={tab === index ? "white" : "black"} weight="600">
          {props.date}
        </Text>
        <StyledIndicator color={props.status} />
      </div>
      <Text color={tab === index ? "white" : "black"} size="sm">
        {props.modality}
      </Text>
    </button>
  );
};

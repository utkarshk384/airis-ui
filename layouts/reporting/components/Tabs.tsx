import React, { useCallback, useEffect, useMemo, useState } from "react";

/* Components */
import { Text, Preloader } from "@components";

/* Contexts */
import { useTab } from "../context/tabs";

/* Types */
import { TabProps } from "../types";
import { StyledIndicator } from "./styled";
import { usePatientHistory } from "@src/api";
import { useRouter } from "next/router";
import { FormatDate, parseISO } from "@utils/dates-fns";

type Props = {
  children?: React.ReactNode;
};

export const Tabbar: React.FC<Props> = (props) => {
  const {} = props;

  /* Hooks */
  const router = useRouter();

  /* APIs */
  const { getPatientHistory, setPatientId } = usePatientHistory();

  /* Effects */
  useEffect(() => {
    const patientId = router.query.report;
    setPatientId(patientId as string);
  }, [router.query.report, setPatientId]);

  if (getPatientHistory.isLoading) return <Preloader />;

  return (
    <div className="w-full overflow-x-scroll custom-scroll-bar flex">
      {getPatientHistory.data?.map((history, i) => (
        <Tab
          index={i}
          date={history.visitDate}
          modality={history.modalityText}
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

  const date = useMemo(() => {
    const d = parseISO(props.date);
    return FormatDate(d, "dd/MM/yyyy");
  }, [props.date]);

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col px-4 transition-colors duration-200 ease-in-out ${
        tab === index ? "bg-accent rounded-lg" : "bg-transparent"
      }`}
    >
      <div className="flex gap-2 items-center">
        <Text size="sm" color={tab === index ? "white" : "black"} weight="600">
          {date}
        </Text>
        <StyledIndicator color={props.status} />
      </div>
      <Text color={tab === index ? "white" : "black"} size="sm">
        {props.modality || "No Modality"}
      </Text>
    </button>
  );
};

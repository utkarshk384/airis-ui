import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo } from "react";

/* Components */
import { Text, Preloader, UnstyledButton } from "@components";

/* Contexts */
import { useTab } from "../context/tabs";

/* Styled */
import { StyledIndicator } from "./styled";

/* Utils */
import { SnakeCaseToTitleCase } from "@utils/text";
import { FormatDate, parseISO } from "@utils/dates-fns";

/* APIs */
import { usePatientHistory } from "@src/api";

/* Types */
import { TabProps } from "../types";

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
    <div className="flex w-full overflow-x-scroll custom-scroll-bar">
      {getPatientHistory.data?.map((history, i) => (
        <Tab
          index={i}
          date={history.visitDate}
          modality={history.modalityText}
          status={history.reportStatusText}
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

  const tooltip = useMemo(() => {
    switch (props.status) {
      case "DRAFT":
        return "Draft";
      case "NOT_STARTED":
        return "New";
      case "APPROVED":
        return "Approved";
    }
  }, [props.status]);

  return (
    <UnstyledButton
      tooltip={tooltip}
      onClick={handleClick}
      className={`flex flex-col px-4 min-h-[3rem] transition-colors duration-200 ease-in-out ${
        tab === index ? "bg-accent rounded-lg" : "bg-transparent"
      }`}
    >
      <div className="flex items-center h-full gap-2">
        <Text size="sm" color={tab === index ? "white" : "black"} weight="600">
          {date}
        </Text>
        <StyledIndicator color={props.status} />
      </div>
      <Text color={tab === index ? "white" : "black"} size="sm">
        {props.modality}
      </Text>
    </UnstyledButton>
  );
};

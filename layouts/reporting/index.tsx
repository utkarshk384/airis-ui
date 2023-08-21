import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

/* Components */
import { Tabbar } from "./components/Tabs";
import { RichTextEditor } from "@components";
import { Footer } from "./components/footer";
import { ReportingHeader } from "./components/header";
import { BorderedContainer } from "./components/styled";

/* Hooks */
import { useCookie } from "@src/hooks";

/* APIs */
import { usePatientList, usePatientReport } from "@src/api";

/* Utils */
import { exportHtmlStr2PDF } from "@utils/export-pdf";
import { FormatDate, GetAge, ParseStringDate } from "@utils/dates-fns";

/* Contexts */
import { TabProvider } from "./context/tabs";
import { TabContent } from "./components/tabContent";

/* Types */
import type { PatientListType } from "@src/api/types";

type Props = {
  children?: React.ReactNode;
};

type PatientType = PatientListType & {
  age: string;
};

export const ReportingComponent: React.FC<Props> = (props) => {
  const {} = props;

  /* Hooks */
  const router = useRouter();
  const { COOKIE_KEYS, getCookie } = useCookie();

  /* APIs */
  const { PatientList, setReferenceDate } = usePatientList();
  const { ReportMutation } = usePatientReport();

  /* States */
  const [patient, setPatient] = useState<PatientType | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const id = router.query.report as string;
    setReferenceDate(ParseStringDate(router.query.ref as string, "dd-MM-yyyy"));

    const item = PatientList.data?.filter(
      (item) => item.patientIndexId.toString() === id
    );

    if (item && item?.length > 0) {
      const Patient = item[0] as PatientType;
      const parsedDate = ParseStringDate(Patient.dateofBirth, "dd-MM-yyyy");
      Patient.age = `${GetAge(parsedDate).toString()}/${
        parsedDate.getMonth() + 1
      }`;
      setPatient(Patient);
    }
  }, [PatientList.data, router.query, router.query.report, setReferenceDate]);

  const onSubmit = useCallback(
    (isSignOff: boolean, isPrint: boolean) => {
      const now = FormatDate(new Date(), "dd-MM-yyyy HH:mm:ss");

      if (patient) {
        const baseBody = {
          patientIndexId: patient.patientIndexId,
          enteredBy: getCookie(COOKIE_KEYS.id),
          enteredDateTime: now,
          modalityId: patient.modality,
          procedureMasterId: patient.procedure,
          reportStatus: 1,
          resultsPrimarySignedBy: null,
          resultsPSignedDateTime: now,
          resultsSecondarySignedBy: null,
          resultsSecondaryDateTime: now,
          templateContent: text,
          visitId: patient.patientVisitIndexId,
          verifiedBy: getCookie(COOKIE_KEYS.id),
          verifiedDateTime: new Date().toISOString(),
        };
        if (isSignOff) {
          ReportMutation.mutate({
            ...baseBody,
            resultsPrimarySignedBy: getCookie(COOKIE_KEYS.id),
          });

          if (isPrint) exportHtmlStr2PDF(text);
        } else ReportMutation.mutate(baseBody);
      }
    },
    [COOKIE_KEYS.id, ReportMutation, getCookie, patient, text]
  );

  return (
    <div className="container gap-y-5 grid grid-rows-[1fr_2fr_3fr_1fr]">
      <ReportingHeader
        data={{
          age: patient?.age || "",
          gender: patient?.administrativeSexText || "",
          name: patient?.patientName || "",
          id: patient?.patientIndexId.toString() || "",
        }}
      />
      <TabProvider>
        <BorderedContainer className="overflow-hidden">
          <Tabbar />
          <div className="my-2" />
          <TabContent setEditorText={setText} patient={patient} />
        </BorderedContainer>
        <BorderedContainer>
          <RichTextEditor
            value={text}
            onChange={(newText) => {
              setText(newText);
            }}
            height="20rem"
          />
        </BorderedContainer>
      </TabProvider>
      <Footer
        onDraft={() => onSubmit(false, false)}
        onSignOff={() => onSubmit(true, false)}
        onSignOffPrint={() => onSubmit(true, true)}
      />
    </div>
  );
};

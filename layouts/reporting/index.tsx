import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

/* Components */
import { Tabbar } from "./components/Tabs";
import { RichTextEditor } from "@components";
import { Footer } from "./components/footer";
import { ReportingHeader } from "./components/header";
import { BorderedContainer } from "./components/styled";

/* APIs */
import { usePatientList } from "@src/api";

/* Utils */
import { ParseStringDate } from "@utils/dates-fns";

/* Contexts */
import { TabProvider } from "./context/tabs";
import { TabContent } from "./components/tabContent";

/* Types */
import { PatientListType } from "@src/api/types";

type Props = {
  children?: React.ReactNode;
};

export const ReportingComponent: React.FC<Props> = (props) => {
  const {} = props;

  const router = useRouter();

  const { PatientList, setReferenceDate } = usePatientList();

  const [patient, setPatient] = useState<PatientListType | null>(null);

  useEffect(() => {
    const id = router.query.report as string;
    setReferenceDate(ParseStringDate(router.query.ref as string, "dd-MM-yyyy"));

    const item = PatientList.data?.filter(
      (item) => item.patientIndexId.toString() === id
    );

    if (item && item?.length > 0) setPatient(item[0]);
  }, [PatientList.data, router.query, router.query.report, setReferenceDate]);

  console.log({ patient });

  return (
    <div className="container gap-y-5 grid grid-rows-[1fr_2fr_3fr_1fr]">
      <ReportingHeader
        data={{
          age: "20/11",
          gender: "Male",
          name: "John Doe",
          id: "S767676767D",
        }}
      />
      <TabProvider>
        <BorderedContainer className="overflow-hidden">
          <Tabbar />
          <div className="my-2" />
          <TabContent />
        </BorderedContainer>
        <BorderedContainer>
          <RichTextEditor height="20rem" />
        </BorderedContainer>
      </TabProvider>
      <Footer />
    </div>
  );
};

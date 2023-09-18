import { PlusIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useMemo, useState } from "react";

/* Components */
import { COLUMNS } from "./cols";
import { DropdownContent } from "./filters";
import { Button, Table } from "@components";
import {
  AddTemplate,
  AllergyDrawer,
  TechnicalNotesDrawer,
} from "@layouts/modals";

import MOCK_DATA from "./MOCK_DATA.json";

/* APIs */
import { usePatientList } from "@src/api";

/* Types */
import type { Patient } from "./types";
import type { PatientListResponse } from "@src/api/types";

/* Types */
type Props = {
  children?: React.ReactNode;
};

const TransformToTableRows = (data: PatientListResponse): Patient[] => {
  return data.map((item) => ({
    acc_no: item.accessionNumber,
    age: 2,
    examination: item.procedureText,
    modality: item.modalityText,
    patient_id: item.patientIndexId,
    patient_visit_id: item.patientVisitIndexId,
    patient_name: item.patientName,
    referral_doctor: item.referringDoctor,
    gender: item.administrativeSexText,
    status: item.reportStatusText,
    visit_date: item.visitDate,
  }));
};

export const PatientsTab: React.FC<Props> = (props) => {
  const {} = props;

  const cols = useMemo(() => COLUMNS, []);

  const [data, setData] = useState<Patient[]>([]);
  const { PatientList, setReferenceDate, referenceDate } = usePatientList();

  useEffect(() => {
    if (PatientList.status === "success") {
      const formattedData = TransformToTableRows(PatientList.data);
      setData(formattedData);
    }
  }, [PatientList.data, PatientList.status]);

  return (
    <>
      <AllergyDrawer />
      <TechnicalNotesDrawer />
      <div className="container !bg-white rounded-lg p-4 !mb-16">
        <Table
          searchPlaceholder="Search patient id, name, acc no, referral doctor..."
          cols={cols}
          errorHeading="No new radiology orders for the selected date"
          errorText="Try selecting a different date or reset filters."
          searchClassName="w-7/12"
          rows={data}
          title="Patients"
        >
          {(table) => (
            <DropdownContent
              referenceDate={referenceDate}
              setReferenceDate={setReferenceDate}
              table={table}
            />
          )}
        </Table>
      </div>
    </>
  );
};

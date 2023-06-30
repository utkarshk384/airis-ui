import { PlusIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useMemo, useState } from "react";

/* Components */
import { COLUMNS } from "./cols";
import { DropdownContent } from "./filters";
import { Button, Table } from "@components";
import { AddTemplate } from "@layouts/modals";

import MOCK_DATA from "./MOCK_DATA.json";

/* APIs */
import { usePatientList } from "@src/api";

/* Types */
import { PatientListResponse } from "@src/api/types";
import { Patient } from "./types";

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
    patient_name: item.patientName,
    referral_doctor: item.referringDoctor,
    gender: item.administrativeSexText,
    status: item.reportStatusText,
    visit_date: item.visitDate,
  }));
};

export const PatientsTab: React.FC<Props> = (props) => {
  const {} = props;

  const rows = useMemo(() => MOCK_DATA, []);
  const cols = useMemo(() => COLUMNS, []);
  const [open, setOpen] = React.useState(false);

  const [data, setData] = useState<Patient[]>([]);
  const { PatientList } = usePatientList();

  useEffect(() => {
    if (PatientList.isSuccess) {
      const formattedData = TransformToTableRows(PatientList.data);
      setData(formattedData);
    }
  }, [PatientList.data, PatientList.isSuccess]);

  return (
    <div className="container !bg-white rounded-lg p-4 !mb-16">
      <Button
        variant="solid"
        rightIcon={() => <PlusIcon width={24} height={24} />}
        onClick={() => setOpen(true)}
      >
        Add Template
      </Button>
      <AddTemplate open={open} setOpen={setOpen} />
      <Table
        searchPlaceholder="Search patient id, name, acc no, referral doctor..."
        cols={cols}
        searchClassName="w-7/12"
        rows={data}
        defaultFilters={[{ id: "visit_time", value: new Date() }]}
        title="Patients"
      >
        {(table) => <DropdownContent table={table} />}
      </Table>
    </div>
  );
};

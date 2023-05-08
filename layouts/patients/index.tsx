import React, { useMemo } from "react";

/* Components */
import { Table } from "@components/Table";
import { COLUMNS } from "./cols";

import MOCK_DATA from "./MOCK_DATA.json";

/* Types */
type Props = {
  children?: React.ReactNode;
};

export const PatientsTab: React.FC<Props> = (props) => {
  const {} = props;

  const rows = useMemo(() => MOCK_DATA.data, []);
  const cols = useMemo(() => COLUMNS, []);

  return (
    <div className="container !bg-white rounded-lg p-4">
      <Table
        searchPlaceholder="Search patient id, name, Acc no"
        cols={cols}
        rows={rows}
        title="Patients"
      />
    </div>
  );
};

import React, { useMemo } from "react";

/* Components */
import { COLUMNS } from "./cols";
import { Table } from "@components";
import { DropdownContent } from "./filters";

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
        FilterComponent={DropdownContent}
        searchPlaceholder="Search patient id, name, acc no, referral doctor..."
        cols={cols}
        searchClassName="w-7/12"
        rows={rows}
        title="Patients"
      />
    </div>
  );
};

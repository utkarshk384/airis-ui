import React, { useMemo } from "react";

/* Components */
import { COLUMNS } from "./cols";
import { DropdownContent } from "./filters";
import { Table, RichTextEditor } from "@components";

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
      <div className="my-64"></div>
      <RichTextEditor />
      <div className="my-64"></div>
    </div>
  );
};
